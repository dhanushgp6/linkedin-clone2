from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Post
from accounts.serializers import UserSerializer

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('content',)
    
    def validate_content(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError("Post content cannot be empty")
        return value
    
    def create(self, validated_data):
        # Remove the line that automatically assigns the user
        # The view will handle author assignment
        return super().create(validated_data)

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField()
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'content', 'author', 'author_name', 'created_at', 'updated_at')
        read_only_fields = ('id', 'author', 'created_at', 'updated_at')
