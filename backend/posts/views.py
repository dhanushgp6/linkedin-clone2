from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django.shortcuts import get_object_or_404
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer
from accounts.models import User

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    permission_classes = [AllowAny]  # Allow anyone for testing
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PostCreateSerializer
        return PostSerializer
    
    def perform_create(self, serializer):
        # Get the authenticated user or fallback to first user for testing
        if self.request.user.is_authenticated:
            author = self.request.user
            print(f"Using authenticated user: {author}")
        else:
            # For testing - use the first user in database
            author = User.objects.first()
            print(f"Using fallback user: {author}")
        
        if author:
            serializer.save(author=author)
        else:
            raise serializers.ValidationError("No user available to create post")

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

class UserPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(User, id=user_id)
        return Post.objects.filter(author=user)

@api_view(['GET'])
@permission_classes([AllowAny])
def posts_stats(request):
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

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user
