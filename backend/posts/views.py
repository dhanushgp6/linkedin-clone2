from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer
from accounts.models import User
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        return PostCreateSerializer if self.request.method == 'POST' else PostSerializer
    
    def perform_create(self, serializer):
        # Debug information
        print(f"DEBUG - User authenticated: {self.request.user.is_authenticated}")
        print(f"DEBUG - User: {self.request.user}")
        print(f"DEBUG - Session key: {self.request.session.session_key}")
        print(f"DEBUG - Session items: {dict(self.request.session.items())}")
        
        if not self.request.user.is_authenticated:
            raise serializers.ValidationError("You must be logged in to create a post.")
        
        serializer.save(author=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class UserPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(User, id=user_id)
        return Post.objects.filter(author=user).order_by('-created_at')

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
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
