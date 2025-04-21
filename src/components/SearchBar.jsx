import React from 'react';
import { Input } from '@/components/ui/input';

const SearchBar = ({title, value, onChange }) => {
  return (
    <div className="w-full bg-white p-4 shadow-md rounded-xl">
      <Input
        placeholder={title}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;
