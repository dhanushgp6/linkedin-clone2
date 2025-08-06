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
      <div className="loading-container">
        <div className="professional-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f3f2ef', minHeight: '100vh', paddingTop: '20px' }}>
      <div className="container">
        <div className="row justify-content-center">
          {/* Main Content */}
          <div className="col-12 col-lg-8 mb-4">
            <CreatePost onPostCreated={handlePostCreated} />
            
            <div className="mt-4">
              <div className="d-flex align-items-center mb-3">
                <div style={{
                  width: '3px',
                  height: '24px',
                  backgroundColor: '#0a66c2',
                  marginRight: '12px',
                  borderRadius: '2px'
                }}></div>
                <h4 className="mb-0" style={{ 
                  color: '#1d1d1d', 
                  fontWeight: '600',
                  fontSize: '20px'
                }}>
                  Recent Posts
                </h4>
              </div>
              
              {posts.length === 0 ? (
                <div className="professional-card" style={{ padding: '40px', textAlign: 'center' }}>
                  <div style={{ marginBottom: '16px', fontSize: '48px' }}>📝</div>
                  <h5 style={{ color: '#666666', marginBottom: '8px' }}>No posts yet</h5>
                  <p style={{ color: '#666666', margin: '0' }}>
                    Be the first to share something with the community!
                  </p>
                </div>
              ) : (
                <div className="posts-container">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="professional-card" style={{ position: 'sticky', top: '20px' }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e0e0e0',
                background: 'linear-gradient(135deg, #0a66c2 0%, #084d93 100%)',
                borderRadius: '8px 8px 0 0'
              }}>
                <h5 style={{ 
                  color: 'white', 
                  margin: '0',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  📊 Platform Insights
                </h5>
              </div>
              <div style={{ padding: '20px' }}>
                <div className="stats-grid">
                  <div className="stat-item" style={{
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#0a66c2', marginBottom: '4px' }}>
                      {stats.total_posts || 0}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666666', fontWeight: '500' }}>
                      Total Posts
                    </div>
                  </div>
                  
                  <div className="stat-item" style={{
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#0a66c2', marginBottom: '4px' }}>
                      {stats.total_users || 0}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666666', fontWeight: '500' }}>
                      Active Users
                    </div>
                  </div>
                  
                  {stats.your_posts !== undefined && (
                    <div className="stat-item" style={{
                      padding: '16px',
                      backgroundColor: '#f0f7ff',
                      borderRadius: '6px',
                      border: '1px solid #0a66c2'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#0a66c2', marginBottom: '4px' }}>
                        {stats.your_posts}
                      </div>
                      <div style={{ fontSize: '14px', color: '#084d93', fontWeight: '600' }}>
                        Your Contributions
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
