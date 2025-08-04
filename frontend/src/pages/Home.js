import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import CreatePost from '../components/Posts/CreatePost';
import PostCard from '../components/Posts/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAllPosts();
      setPosts(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await postsAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    fetchStats(); // Refresh stats
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

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <CreatePost onPostCreated={handlePostCreated} />
          
          <div className="mt-4">
            <h4>Recent Posts</h4>
            {posts.length === 0 ? (
              <div className="card">
                <div className="card-body text-center">
                  <p>No posts yet. Be the first to share something!</p>
                </div>
              </div>
            ) : (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Platform Stats</h5>
            </div>
            <div className="card-body">
              <p><strong>Total Posts:</strong> {stats.total_posts || 0}</p>
              <p><strong>Total Users:</strong> {stats.total_users || 0}</p>
              {stats.your_posts !== undefined && (
                <p><strong>Your Posts:</strong> {stats.your_posts}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
