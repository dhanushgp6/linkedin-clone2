import React, { useState } from 'react';
import { postsAPI } from '../../services/api';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Please enter some content');
      return;
    }

    setLoading(true);
    try {
      const response = await postsAPI.createPost({ content });
      setContent('');
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Create a Post</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength="1000"
            />
            <small className="text-muted">
              {content.length}/1000 characters
            </small>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !content.trim()}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
