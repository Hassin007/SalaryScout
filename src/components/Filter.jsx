import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Filter = ({ filterData, onFilterChange, resetFilters }) => {
  const { filterOptions, filterValues } = filterData;

  const handleChange = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Filters</h2>

      {filterOptions.map((filter) => (
        <div key={filter.key} className="space-y-1">
          <Label htmlFor={filter.key}>{filter.label}</Label>

          {filter.type === 'select' ? (
            <Select
              value={filterValues[filter.key]}
              onValueChange={(value) => handleChange(filter.key, value)}
              id={filter.key}
            >
              <SelectTrigger>
              <span>
  {
    filter.options.find((option) => option.value === filterValues[filter.key])?.label || 'Select'
  }
</span>

              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : filter.type === 'input' ? (
            <Input
              id={filter.key}
              type="text"
              placeholder={`Enter ${filter.label.toLowerCase()}`}
              value={filterValues[filter.key]}
              onChange={(e) => handleChange(filter.key, e.target.value)}
            />
          ) : null}
        </div>
      ))}

      <Button variant="outline" className="w-full mt-4" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
};

export default Filter;
