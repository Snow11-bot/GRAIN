import React, { useState } from 'react';
import { Plus, Image, Video, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/Feed/PostCard';
import { Post } from '../types';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Mock posts data
  const mockPosts: Post[] = [
    {
      id: '1',
      userId: '2',
      user: {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        accountType: 'dealer',
        verified: true,
        rating: 4.9,
        location: 'Nebraska, USA',
        createdAt: '2024-01-15T10:00:00Z'
      },
      content: 'Just received a shipment of premium John Deere tractors! Perfect for medium to large farms. These machines are built to last and will significantly improve your productivity. Contact me for pricing and availability.',
      images: [
        'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg',
        'https://images.pexels.com/photos/2132251/pexels-photo-2132251.jpeg'
      ],
      type: 'marketplace',
      category: 'Equipment',
      price: 85000,
      location: 'Nebraska, USA',
      createdAt: '2024-01-20T14:30:00Z',
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      userId: '3',
      user: {
        id: '3',
        name: 'Mike Thompson',
        email: 'mike@example.com',
        accountType: 'farmer',
        verified: true,
        rating: 4.7,
        location: 'Iowa, USA',
        createdAt: '2024-01-10T08:00:00Z'
      },
      content: 'Harvest season is looking great this year! Our corn yield is up 15% compared to last year. The new irrigation system we installed really made a difference. Grateful for all the support from the community.',
      images: [
        'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg'
      ],
      type: 'general',
      location: 'Iowa, USA',
      createdAt: '2024-01-20T12:15:00Z',
      likes: 42,
      comments: 15
    },
    {
      id: '3',
      userId: '4',
      user: {
        id: '4',
        name: 'AgriTech Solutions',
        email: 'contact@agritech.com',
        accountType: 'professional',
        verified: true,
        rating: 4.8,
        location: 'California, USA',
        createdAt: '2024-01-05T09:00:00Z'
      },
      content: 'Looking for experienced agricultural engineers for our upcoming precision farming project. We need specialists in GPS-guided equipment and soil analysis. Competitive salary and benefits package available.',
      type: 'workplace',
      category: 'Engineering',
      location: 'California, USA',
      createdAt: '2024-01-20T09:45:00Z',
      likes: 18,
      comments: 6
    }
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // In a real app, this would send the post to your backend
      console.log('Creating post:', newPost);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Create Post */}
      <div className="card mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex-1 text-left px-4 py-3 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            What's happening in your farm today?
          </button>
        </div>
        
        {showCreatePost && (
          <div className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts, updates, or ask questions..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-grain-500 focus:border-transparent"
              rows={4}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-grain-600">
                  <Image className="h-5 w-5" />
                  <span className="text-sm">Photo</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-grain-600">
                  <Video className="h-5 w-5" />
                  <span className="text-sm">Video</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-grain-600">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">Location</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="btn-primary disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;