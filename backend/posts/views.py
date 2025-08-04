from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer
from accounts.models import User

class PostListCreateView(generics.ListCreateAPIView):
    """
    GET: List all posts (public feed)
    POST: Create a new post (authenticated users only)
    """
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PostCreateSerializer
        return PostSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a specific post
    PUT/PATCH: Update a post (only by author)
    DELETE: Delete a post (only by author)
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated(), IsOwnerOrReadOnly()]
        return [IsAuthenticatedOrReadOnly()]

class UserPostsView(generics.ListAPIView):
    """
    GET: List all posts by a specific user
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(User, id=user_id)
        return Post.objects.filter(author=user)

@api_view(['GET'])
def posts_stats(request):
    """
    GET: Get basic stats about posts
    """
    total_posts = Post.objects.count()
    total_users = User.objects.count()
    
    if request.user.is_authenticated:
        user_posts = Post.objects.filter(author=request.user).count()
        return Response({
            'total_posts': total_posts,
            'total_users': total_users,
            'your_posts': user_posts
        })
    
    return Response({
        'total_posts': total_posts,
        'total_users': total_users
    })

# Custom permission class
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner of the post.
        return obj.author == request.user
