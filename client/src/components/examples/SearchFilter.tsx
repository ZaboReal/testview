import SearchFilter from '../SearchFilter';
import { useState } from 'react';

export default function SearchFilterExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(['all']);

  const handleStatusFilterChange = (status: string) => {
    console.log('Status filter changed:', status);
    if (status === 'all') {
      setStatusFilter(['all']);
    } else {
      setStatusFilter(prev => 
        prev.includes(status) 
          ? prev.filter(s => s !== status)
          : [...prev.filter(s => s !== 'all'), status]
      );
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
      />
    </div>
  );
}
