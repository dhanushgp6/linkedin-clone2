import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authAPI, postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/Posts/PostCard';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getUser(userId);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await postsAPI.getUserPosts(userId);
      setPosts(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">User not found</div>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser.id === parseInt(userId);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4>{user.full_name}</h4>
              <p className="text-muted">@{user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {user.bio && (
                <div>
                  <strong>Bio:</strong>
                  <p>{user.bio}</p>
                </div>
              )}
              <p className="text-muted">
                <small>Joined {new Date(user.created_at).toLocaleDateString()}</small>
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <h4>
            {isOwnProfile ? 'Your Posts' : `${user.full_name}'s Posts`} 
            <span className="badge bg-secondary ms-2">{posts.length}</span>
          </h4>
          
          {posts.length === 0 ? (
            <div className="card">
              <div className="card-body text-center">
                <p>
                  {isOwnProfile 
                    ? "You haven't posted anything yet." 
                    : "This user hasn't posted anything yet."
                  }
                </p>
              </div>
            </div>
          ) : (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
