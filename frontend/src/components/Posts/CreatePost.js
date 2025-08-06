import React, { useState } from 'react';
import { postsAPI } from '../../services/api';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await postsAPI.createPost({ content });
      setContent('');
      setFocused(false);
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="professional-card">
      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={focused ? "4" : "3"}
              placeholder="Share an update, ask a question, or start a discussion..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setFocused(true)}
              maxLength="1000"
              style={{
                border: focused ? '2px solid #0a66c2' : '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                lineHeight: '1.5',
                resize: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: focused ? '#fafbfc' : 'white'
              }}
            />
            <div className="d-flex justify-content-between align-items-center mt-2">
              <small style={{ 
                color: content.length > 900 ? '#e74c3c' : '#666666',
                fontSize: '12px'
              }}>
                {content.length}/1000 characters
              </small>
              {content.length > 0 && (
                <small style={{ color: '#666666', fontSize: '12px' }}>
                  💡 Tip: Add hashtags to increase visibility
                </small>
              )}
            </div>
          </div>
          
          {(focused || content.trim()) && (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setContent('');
                    setFocused(false);
                  }}
                  style={{
                    background: 'none',
                    border: '1px solid #e0e0e0',
                    color: '#666666',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f3f2ef';
                    e.target.style.borderColor = '#ccc';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#e0e0e0';
                  }}
                >
                  Cancel
                </button>
              </div>
              
              <button 
                type="submit" 
                disabled={loading || !content.trim()}
                style={{
                  background: loading || !content.trim() 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #0a66c2 0%, #378fe9 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: loading || !content.trim() 
                    ? 'none' 
                    : '0 2px 8px rgba(10, 102, 194, 0.3)',
                  transform: loading ? 'none' : 'translateY(0)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  if (!loading && content.trim()) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading && content.trim()) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.3)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div 
                      style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    ></div>
                    Posting...
                  </>
                ) : (
                  <>
                    📤 Post
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
