import { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { getCompanyJobSalary } from '../apis/jobsApi';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CompanySalary = () => {
  const {
    setQuery,
    companyFilters,
    setCompanyFilters,
    companySalaryInfo,
    setCompanySalaryInfo,
  } = useJobContext();

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleFilterChange = (key, value) => {
    setCompanyFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setCompanyFilters((prev) => ({
      ...prev,
      location_type: 'ANY',
      job_title: '',
      years_of_experience: 'ALL',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    setQuery(searchValue);
    setCompanyFilters((prev) => ({
      ...prev,
      company_name: searchValue,
    }));

    console.log('Sending to API:', {
      company_name: searchValue,
      location_type: companyFilters.location_type,
      job_title: companyFilters.job_title,
      years_of_experience: companyFilters.years_of_experience,
    });

    setLoading(true);
    const data = await getCompanyJobSalary(
      searchValue,
      companyFilters.job_title,
      companyFilters.location_type,
      companyFilters.years_of_experience
    );
    setCompanySalaryInfo(data);
    setLoading(false);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-8 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800xt Job bg-clip-text text-transparent">Estimate Company Salary</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <SearchBar value={searchValue} onChange={setSearchValue} title="Enter Company Name.." />

        <Filter
          filterData={{
            filterValues: companyFilters || {},
            filterOptions: [
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
                key: 'job_title',
                label: 'Job Title',
                type: 'input',
              },
              {
                key: 'years_of_experience',
                label: 'Years of Experience',
                type: 'select',
                options: [
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
            bg-gradient-to-r from-blue-700 to-indigo-800
            text-white hover:from-blue-600 hover:to-indigo-700"
      >
        {loading ? 'Searching...' : `Search Jobs for "${searchValue || '...'}"`}
      </Button>
      </form>

      {companySalaryInfo && (
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
              <p><strong>Company:</strong> {companySalaryInfo.company}</p>
              <p><strong>Title:</strong> {companySalaryInfo.job_title}</p>
              <p><strong>Median:</strong> ${Math.round(companySalaryInfo.median_salary)}</p>
              <p><strong>Range:</strong> ${Math.round(companySalaryInfo.min_salary)} - ${Math.round(companySalaryInfo.max_salary)}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompanySalary;
