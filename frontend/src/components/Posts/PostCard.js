import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  // Add safety checks for author data
  if (!post || !post.author) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <p>Error loading post data</p>
        </div>
      </div>
    );
  }

  const author = post.author;
  const authorName = author.full_name || `${author.first_name || ''} ${author.last_name || ''}`.trim() || author.username || 'Unknown User';
  const authorInitial = authorName.charAt(0).toUpperCase() || '?';

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center mb-2">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                 style={{width: '40px', height: '40px'}}>
              {authorInitial}
            </div>
            <div>
              <h6 className="mb-0">
                <Link to={`/profile/${author.id}`} className="text-decoration-none">
                  {authorName}
                </Link>
              </h6>
              <small className="text-muted">@{author.username || 'unknown'}</small>
            </div>
          </div>
          <small className="text-muted">{formatDate(post.created_at)}</small>
        </div>
        
        <p className="card-text">{post.content}</p>
        
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-primary btn-sm">
              👍 Like
            </button>
            <button type="button" className="btn btn-outline-secondary btn-sm">
              💬 Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
