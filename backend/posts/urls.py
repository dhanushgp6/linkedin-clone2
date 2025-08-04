from django.urls import path
from . import views

urlpatterns = [
    # Posts CRUD
    path('posts/', views.PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    
    # User-specific posts
    path('users/<int:user_id>/posts/', views.UserPostsView.as_view(), name='user-posts'),
    
    # Stats
    path('stats/', views.posts_stats, name='posts-stats'),
]
