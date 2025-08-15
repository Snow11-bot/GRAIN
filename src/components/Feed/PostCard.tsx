import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock } from 'lucide-react';
import { Post } from '../../types';
import AccountRing from '../UI/AccountRing';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <AccountRing accountType={post.user.accountType} size="lg" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="capitalize">{post.user.accountType}</span>
              {post.user.verified && (
                <span className="text-grain-600">✓</span>
              )}
              <Clock className="h-3 w-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {post.location && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {post.location}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        
        {post.price && (
          <div className="mt-2 inline-block bg-grain-100 text-grain-800 px-3 py-1 rounded-full text-sm font-semibold">
            ${post.price.toLocaleString()}
          </div>
        )}
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            {post.images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {index === 3 && post.images!.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">
                      +{post.images!.length - 4} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 text-sm transition-colors ${
              liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-grain-600 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-grain-600 transition-colors">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
        
        {post.category && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostCard;