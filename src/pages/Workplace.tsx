import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Users, Briefcase } from 'lucide-react';
import { WorkplaceJob } from '../types';
import AccountRing from '../components/UI/AccountRing';

const Workplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Jobs' },
    { value: 'farming', label: 'Farming' },
    { value: 'equipment', label: 'Equipment Operation' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'harvesting', label: 'Harvesting' }
  ];

  // Mock workplace jobs
  const mockJobs: WorkplaceJob[] = [
    {
      id: '1',
      userId: '2',
      user: {
        id: '2',
        name: 'Sunrise Farms',
        email: 'contact@sunrisefarms.com',
        accountType: 'farmer',
        verified: true,
        rating: 4.9,
        location: 'Nebraska, USA',
        createdAt: '2024-01-15T10:00:00Z'
      },
      title: 'Experienced Tractor Operator Needed',
      description: 'We are looking for an experienced tractor operator for our 2000-acre corn and soybean operation. Must have experience with GPS-guided equipment and be available for seasonal work from March to November.',
      category: 'equipment',
      location: 'Nebraska, USA',
      budget: 25,
      duration: '8 months',
      requirements: [
        'Minimum 3 years tractor operation experience',
        'Valid driver\'s license',
        'Experience with GPS guidance systems',
        'Ability to work long hours during planting and harvest'
      ],
      applications: 12,
      createdAt: '2024-01-20T14:30:00Z',
      deadline: '2024-02-15T23:59:59Z'
    },
    {
      id: '2',
      userId: '3',
      user: {
        id: '3',
        name: 'AgriConsult Pro',
        email: 'jobs@agriconsult.com',
        accountType: 'professional',
        verified: true,
        rating: 4.8,
        location: 'Iowa, USA',
        createdAt: '2024-01-10T08:00:00Z'
      },
      title: 'Soil Analysis Specialist',
      description: 'Join our team as a soil analysis specialist. You will be responsible for conducting field soil tests, analyzing samples, and providing recommendations to farmers for optimal crop production.',
      category: 'consulting',
      location: 'Iowa, USA',
      budget: 35,
      duration: 'Full-time',
      requirements: [
        'Degree in Agronomy or Soil Science',
        'Experience with soil testing equipment',
        'Strong analytical and communication skills',
        'Valid driver\'s license and willingness to travel'
      ],
      applications: 8,
      createdAt: '2024-01-19T10:15:00Z',
      deadline: '2024-02-28T23:59:59Z'
    },
    {
      id: '3',
      userId: '4',
      user: {
        id: '4',
        name: 'Harvest Solutions LLC',
        email: 'hr@harvestsolutions.com',
        accountType: 'contractor',
        verified: true,
        rating: 4.7,
        location: 'Kansas, USA',
        createdAt: '2024-01-05T09:00:00Z'
      },
      title: 'Seasonal Harvest Crew Members',
      description: 'We are hiring seasonal harvest crew members for our custom harvesting operation. Travel across multiple states during harvest season. Housing and meals provided.',
      category: 'harvesting',
      location: 'Kansas, USA',
      budget: 20,
      duration: '4 months',
      requirements: [
        'Physical fitness and ability to work long hours',
        'Willingness to travel and live in temporary housing',
        'Previous harvest experience preferred but not required',
        'Team player with strong work ethic'
      ],
      applications: 25,
      createdAt: '2024-01-18T16:20:00Z',
      deadline: '2024-03-01T23:59:59Z'
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const JobCard: React.FC<{ job: WorkplaceJob }> = ({ job }) => {
    const formatDeadline = (deadline?: string) => {
      if (!deadline) return null;
      const date = new Date(deadline);
      const now = new Date();
      const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysLeft < 0) return 'Expired';
      if (daysLeft === 0) return 'Today';
      if (daysLeft === 1) return '1 day left';
      return `${daysLeft} days left`;
    };

    return (
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{job.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <AccountRing accountType={job.user.accountType} size="sm" />
                  <span>{job.user.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              {job.budget && (
                <div className="text-lg font-semibold text-grain-600">
                  ${job.budget}/hr
                </div>
              )}
              {job.deadline && (
                <div className="text-sm text-gray-500">
                  {formatDeadline(job.deadline)}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 line-clamp-3">{job.description}</p>

          {/* Requirements */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {job.requirements.slice(0, 2).map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-grain-600 mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
              {job.requirements.length > 2 && (
                <li className="text-grain-600 text-sm">
                  +{job.requirements.length - 2} more requirements
                </li>
              )}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{job.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{job.applications} applications</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                job.category === 'farming' ? 'bg-green-100 text-green-800' :
                job.category === 'equipment' ? 'bg-blue-100 text-blue-800' :
                job.category === 'consulting' ? 'bg-purple-100 text-purple-800' :
                job.category === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {job.category}
              </span>
              <button className="btn-primary text-sm px-3 py-1">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workplace</h1>
        <p className="text-gray-600">Find agricultural jobs and services opportunities</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, services, opportunities..."
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
          
          <button className="btn-primary flex items-center space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>Post Job</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} found
        </p>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Briefcase className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Workplace;