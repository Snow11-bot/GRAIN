import React from 'react';
import { AccountType } from '../../types';

interface AccountRingProps {
  accountType: AccountType;
  size?: 'sm' | 'md' | 'lg';
}

const AccountRing: React.FC<AccountRingProps> = ({ accountType, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  const colorClasses = {
    general: 'bg-red-500',
    professional: 'bg-orange-500',
    contractor: 'bg-yellow-500',
    dealer: 'bg-green-500',
    trader: 'bg-blue-500',
    farmer: 'bg-white border-2 border-gray-400'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${colorClasses[accountType]} rounded-full flex-shrink-0`}
      title={`${accountType.charAt(0).toUpperCase() + accountType.slice(1)} Account`}
    />
  );
};

export default AccountRing;