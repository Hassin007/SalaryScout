import { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { getJobSalary } from '../apis/jobsApi';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const JobSalary = () => {
  const {
    setQuery,
    salaryFilters,
    setSalaryFilters,
    salaryInfo,
    setSalaryInfo,
  } = useJobContext();

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleFilterChange = (key, value) => {
    setSalaryFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSalaryFilters({
      location: '',
      location_type: 'ANY',
      years_of_experience: 'ALL',
    });
    setSearchValue('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      toast.warning('Please enter a job title');
      return;
    }

    if (!salaryFilters.location) {
      toast.warning('Please enter a location');
      return;
    }

    setQuery(searchValue);

    const queryPayload = {
      job_title: searchValue,
      location: salaryFilters.location,
      location_type: salaryFilters.location_type,
      years_of_experience: salaryFilters.years_of_experience,
    };

    console.log('Sending to API:', queryPayload);

    setLoading(true);
    const data = await getJobSalary(
      queryPayload.job_title,
      queryPayload.location,
      queryPayload.location_type,
      queryPayload.years_of_experience
    );
    setSalaryInfo(data);
    setLoading(false);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-8 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800xt Job bg-clip-text text-transparent">Estimate Job Salary</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          title="Enter Job Title..."
        />

        <Filter
          filterData={{
            filterValues: salaryFilters || {},
            filterOptions: [
              { key: 'location', label: 'Location', type: 'input' },
              {
                key: 'location_type',
                label: 'Location Type',
                type: 'select',
                options: [
                  { value: 'ANY', label: 'Any' },
                  { value: 'CITY', label: 'City' },
                  { value: 'STATE', label: 'State' },
                  { value: 'COUNTRY', label: 'Country' },
                ],
              },
              {
                key: 'years_of_experience',
                label: 'Years of Experience',
                type: 'select',
                options: [
                  { value: 'ALL', label: 'All' },
                  { value: 'LESS_THAN_ONE', label: 'Less than 1 year' },
                  { value: 'ONE_TO_THREE', label: '1 - 3 years' },
                  { value: 'FOUR_TO_SIX', label: '4 - 6 years' },
                  { value: 'SEVEN_TO_NINE', label: '7 - 9 years' },
                  { value: 'TEN_TO_FOURTEEN', label: '10 - 14 years' },
                  { value: 'ABOVE_FIFTEEN', label: '15+ years' },
                ],
              },
            ],
          }}
          onFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />

      <Button 
            type="submit" 
            className="w-full shadow hover:scale-105 transition-transform 
            bg-gradient-to-r from-blue-600 to-indigo-800
            text-white hover:from-blue-600 hover:to-indigo-700"
      >
        {loading ? 'Searching...' : `Search Jobs for "${searchValue || '...'}"`}
      </Button>
      </form>

      {salaryInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Title:</strong> {salaryInfo.job_title}</p>
              <p><strong>Median:</strong> ${Math.round(salaryInfo.median_salary)}</p>
              <p><strong>Range:</strong> ${Math.round(salaryInfo.min_salary)} - ${Math.round(salaryInfo.max_salary)}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobSalary;
