'use client';

import { useQueryState, parseAsString } from 'nuqs';
import type { Status, Gender } from '@/hooks/useCharacters';

const statusOptions: { value: Status | ''; label: string }[] = [
  { value: '', label: 'All Status' },
  { value: 'ALIVE', label: 'Alive' },
  { value: 'DEAD', label: 'Dead' },
  { value: 'UNKNOWN', label: 'Unknown' },
];

const genderOptions: { value: Gender | ''; label: string }[] = [
  { value: '', label: 'All Genders' },
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'UNKNOWN', label: 'Unknown' },
];

interface FilterBarProps {
  onFilterChange?: () => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [status, setStatus] = useQueryState('status', parseAsString.withDefault(''));
  const [gender, setGender] = useQueryState('gender', parseAsString.withDefault(''));
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

  const handleStatusChange = (value: string) => {
    setStatus(value || null);
    onFilterChange?.();
  };

  const handleGenderChange = (value: string) => {
    setGender(value || null);
    onFilterChange?.();
  };

  const handleSearchChange = (value: string) => {
    setSearch(value || null);
    onFilterChange?.();
  };

  const handleClearFilters = () => {
    setStatus(null);
    setGender(null);
    setSearch(null);
    onFilterChange?.();
  };

  const hasActiveFilters = status || gender || search;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => handleGenderChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
