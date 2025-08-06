import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays}d`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m`;
    } else {
      return 'now';
    }
  };

  // Add safety checks for author data
  if (!post || !post.author) {
    return (
      <div className="professional-card mb-3" style={{ padding: '20px' }}>
        <p style={{ color: '#666666', textAlign: 'center' }}>Error loading post data</p>
      </div>
    );
  }

  const author = post.author;
  const authorName = author.full_name || `${author.first_name || ''} ${author.last_name || ''}`.trim() || author.username || 'Unknown User';
  const authorInitial = authorName.charAt(0).toUpperCase() || '?';

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    // TODO: Add API call to backend
  };

  return (
    <div className="professional-card mb-3" style={{ 
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}>
      <div style={{ padding: '20px' }}>
        {/* Post Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <div 
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #0a66c2 0%, #378fe9 100%)',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '600',
                marginRight: '12px',
                boxShadow: '0 2px 8px rgba(10, 102, 194, 0.3)'
              }}
            >
              {authorInitial}
            </div>
            <div>
              <h6 style={{ 
                margin: '0', 
                fontWeight: '600', 
                fontSize: '15px',
                color: '#1d1d1d'
              }}>
                <Link 
                  to={`/profile/${author.id}`} 
                  style={{ 
                    color: '#1d1d1d',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#0a66c2'}
                  onMouseOut={(e) => e.target.style.color = '#1d1d1d'}
                >
                  {authorName}
                </Link>
              </h6>
              <div style={{ fontSize: '13px', color: '#666666' }}>
                @{author.username || 'unknown'}
              </div>
            </div>
          </div>
          <div style={{ 
            fontSize: '13px', 
            color: '#666666',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
        
        {/* Post Content */}
        <div style={{ 
          marginBottom: '16px',
          lineHeight: '1.6',
          color: '#1d1d1d',
          fontSize: '14px'
        }}>
          {post.content}
        </div>
        
        {/* Action Buttons */}
        <div style={{ 
          borderTop: '1px solid #e0e0e0',
          paddingTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="d-flex gap-2">
            <button 
              onClick={handleLikeClick}
              style={{
                border: 'none',
                background: 'none',
                color: isLiked ? '#0a66c2' : '#666666',
                fontSize: '13px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f3f2ef';
                if (!isLiked) e.target.style.color = '#0a66c2';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = isLiked ? '#0a66c2' : '#666666';
              }}
            >
              <span style={{ fontSize: '16px' }}>
                {isLiked ? '👍' : '👍'}
              </span>
              Like {likeCount > 0 && `(${likeCount})`}
            </button>
            
            <button 
              style={{
                border: 'none',
                background: 'none',
                color: '#666666',
                fontSize: '13px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f3f2ef';
                e.target.style.color = '#0a66c2';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#666666';
              }}
            >
              <span style={{ fontSize: '16px' }}>💬</span>
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
