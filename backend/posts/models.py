from django.db import models
from django.conf import settings

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='posts'
    )
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']  # Show newest posts first
    
    def __str__(self):
        return f"{self.author.full_name}: {self.content[:50]}..."
    
    @property
    def author_name(self):
        return self.author.full_name
