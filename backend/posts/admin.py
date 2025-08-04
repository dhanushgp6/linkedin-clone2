from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'content_preview', 'created_at')
    list_filter = ('created_at', 'author')
    search_fields = ('content', 'author__email', 'author__first_name', 'author__last_name')
    readonly_fields = ('created_at', 'updated_at')
    raw_id_fields = ('author',)
    
    def content_preview(self, obj):
        return obj.content[:100] + "..." if len(obj.content) > 100 else obj.content
    content_preview.short_description = 'Content Preview'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('author')
