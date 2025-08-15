import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { Message, User } from '../types';
import AccountRing from '../components/UI/AccountRing';

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  // Mock conversations
  const conversations = [
    {
      id: '1',
      user: {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        accountType: 'dealer' as const,
        verified: true,
        rating: 4.9,
        location: 'Nebraska, USA',
        createdAt: '2024-01-15T10:00:00Z'
      },
      lastMessage: 'The tractor is still available. Would you like to schedule a viewing?',
      lastMessageTime: '2024-01-20T15:30:00Z',
      unread: 2
    },
    {
      id: '2',
      user: {
        id: '3',
        name: 'Mike Thompson',
        email: 'mike@example.com',
        accountType: 'farmer' as const,
        verified: true,
        rating: 4.7,
        location: 'Iowa, USA',
        createdAt: '2024-01-10T08:00:00Z'
      },
      lastMessage: 'Thanks for the advice on soil management!',
      lastMessageTime: '2024-01-20T12:15:00Z',
      unread: 0
    }
  ];

  // Mock messages for selected chat
  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Hi! I saw your inquiry about the John Deere tractor. Are you still interested?',
      type: 'text',
      createdAt: '2024-01-20T14:00:00Z',
      read: true
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '2',
      content: 'Yes, I am! Can you tell me more about its condition and maintenance history?',
      type: 'text',
      createdAt: '2024-01-20T14:15:00Z',
      read: true
    },
    {
      id: '3',
      senderId: '2',
      receiverId: '1',
      content: 'It has only 1,200 hours and has been serviced regularly. All maintenance records are available. The tractor is in excellent condition.',
      type: 'text',
      createdAt: '2024-01-20T14:30:00Z',
      read: true
    },
    {
      id: '4',
      senderId: '2',
      receiverId: '1',
      content: 'The tractor is still available. Would you like to schedule a viewing?',
      type: 'text',
      createdAt: '2024-01-20T15:30:00Z',
      read: false
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diffInHours < 168) return date.toLocaleDateString([], { weekday: 'short' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grain-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === conversation.id ? 'bg-grain-50 border-grain-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <AccountRing accountType={conversation.user.accountType} size="lg" />
                    </div>
                    {conversation.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.user.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <AccountRing accountType={selectedConversation.user.accountType} size="lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedConversation.user.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {selectedConversation.user.accountType} • {selectedConversation.user.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-grain-600 hover:bg-gray-100 rounded-full">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-grain-600 hover:bg-gray-100 rounded-full">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-grain-600 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => {
                  const isOwn = message.senderId === '1'; // Assuming current user ID is '1'
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwn
                            ? 'bg-grain-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          isOwn ? 'text-grain-200' : 'text-gray-500'
                        }`}>
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-grain-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-grain-600 text-white rounded-full hover:bg-grain-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;