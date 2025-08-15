import React, { useState } from 'react';
import { Search, Filter, Grid, List, MapPin, Star } from 'lucide-react';
import { MarketplaceItem } from '../types';
import AccountRing from '../components/UI/AccountRing';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'products', label: 'Products' },
    { value: 'services', label: 'Services' }
  ];

  // Mock marketplace items
  const mockItems: MarketplaceItem[] = [
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
      title: 'John Deere 6120M Tractor',
      description: 'Excellent condition John Deere tractor with only 1,200 hours. Perfect for medium-sized farms. Includes GPS guidance system and premium cab.',
      price: 85000,
      category: 'equipment',
      images: ['https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg'],
      location: 'Nebraska, USA',
      condition: 'used',
      availability: true,
      createdAt: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      userId: '3',
      user: {
        id: '3',
        name: 'Green Valley Farm',
        email: 'contact@greenvalley.com',
        accountType: 'farmer',
        verified: true,
        rating: 4.8,
        location: 'Iowa, USA',
        createdAt: '2024-01-10T08:00:00Z'
      },
      title: 'Organic Corn Seeds - Premium Quality',
      description: 'High-yield organic corn seeds, perfect for sustainable farming. Non-GMO, certified organic. Excellent germination rate.',
      price: 45,
      category: 'products',
      images: ['https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg'],
      location: 'Iowa, USA',
      condition: 'new',
      availability: true,
      createdAt: '2024-01-19T10:15:00Z'
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
      title: 'Soil Analysis & Consultation',
      description: 'Professional soil testing and analysis service. Get detailed reports on soil composition, pH levels, and nutrient recommendations.',
      price: 150,
      category: 'services',
      images: ['https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg'],
      location: 'California, USA',
      availability: true,
      createdAt: '2024-01-18T16:20:00Z'
    }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ItemCard: React.FC<{ item: MarketplaceItem }> = ({ item }) => (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative mb-4">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        {item.condition && (
          <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
            item.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-grain-600">
            ${item.price.toLocaleString()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            item.category === 'equipment' ? 'bg-blue-100 text-blue-800' :
            item.category === 'products' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {item.category}
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <AccountRing accountType={item.user.accountType} size="sm" />
            <span className="text-sm text-gray-600">{item.user.name}</span>
            {item.user.verified && (
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-3 w-3 mr-1" />
            {item.location}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
        <p className="text-gray-600">Buy and sell agricultural products, equipment, and services</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, equipment, services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grain-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grain-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-grain-100 text-grain-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-grain-100 text-grain-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
        </p>
      </div>

      {/* Items Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;