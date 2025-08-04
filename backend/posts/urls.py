# posts/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Posts endpoints
    path('', views.PostListCreateView.as_view(), name='post-list-create'),
    path('<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    
    # User posts endpoint
    path('users/<int:user_id>/posts/', views.UserPostsView.as_view(), name='user-posts'),
    
    # Stats endpoint
    path('stats/', views.posts_stats, name='posts-stats'),
]