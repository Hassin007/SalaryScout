import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { searchJobs } from '../apis/jobsApi';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const JobSearch = () => {
  const {
    query,
    setQuery,
    setJobs,
    jobs,
    currentPage,
    setCurrentPage,
    totalJobs,
    setTotalJobs,
    searchFilters,
    setSearchFilters,
    isLoading,
    setIsLoading,
  } = useJobContext();

  const [searchValue, setSearchValue] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasMoreJobs, setHasMoreJobs] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchJobs = async (q = query, page = currentPage, isNewSearch = false) => {
    if (!q && page === 1) return;
    
    try {
      setIsLoading(true);
      const data = await searchJobs(
        q,
        searchFilters.country,
        searchFilters.date_posted,
        page
      );

      if (isNewSearch || page === 1) {
        setJobs(data);
      } else {
        setJobs((prev) => [...prev, ...data]);
      }

      setHasMoreJobs(data.length > 0);

      if (data.length) {
      setTotalJobs(prev => data.length > 0 ? prev + data.length : prev);
      }
    } catch (err) {
      toast.error("Failed to fetch jobs. Please try again.");
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (currentPage >= 1) {
      fetchJobs(query, currentPage, currentPage === 1);
    }
  }, [currentPage]);

  const handleFilterChange = (key, value) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchFilters({ country: 'us', date_posted: 'all' });
    toast.success('Filters Reset');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setQuery(searchValue);
    setCurrentPage(1);
    await fetchJobs(searchValue, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-8 space-y-6 relative"
    >
      <h1 className="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800xt Job bg-clip-text text-transparent">
        Find Your Next Job
      </h1>
  
      <motion.form
        layout
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg p-6 rounded-lg"
      >
        <SearchBar value={searchValue} onChange={setSearchValue} title="e.g: Software Engineer jobs in Chicago" />
        <Filter
          filterData={{
            filterOptions: [
              {
                key: 'country',
                label: 'Country',
                type: 'select',
                options: [
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'gb', label: 'United Kingdom' },
                  { value: 'de', label: 'Germany' },
                  { value: 'fr', label: 'France' },
                  { value: 'in', label: 'India' },
                  { value: 'pk', label: 'Pakistan' },
                  { value: 'bd', label: 'Bangladesh' },
                  { value: 'np', label: 'Nepal' },
                  { value: 'lk', label: 'Sri Lanka' },
                  { value: 'bt', label: 'Bhutan' },
                  { value: 'mv', label: 'Maldives' },
                  { value: 'af', label: 'Afghanistan' },
                  { value: 'ae', label: 'United Arab Emirates' },
                  { value: 'sa', label: 'Saudi Arabia' },
                  { value: 'qa', label: 'Qatar' },
                  { value: 'kw', label: 'Kuwait' },
                  { value: 'om', label: 'Oman' },
                  { value: 'bh', label: 'Bahrain' },
                  { value: 'iq', label: 'Iraq' },
                  { value: 'ir', label: 'Iran' },
                  { value: 'jo', label: 'Jordan' },
                  { value: 'lb', label: 'Lebanon' },
                  { value: 'ps', label: 'Palestine' },
                  { value: 'sy', label: 'Syria' },
                  { value: 'ye', label: 'Yemen' },
                  { value: 'tr', label: 'Turkey' },
                  { value: 'au', label: 'Australia' },
                  { value: 'jp', label: 'Japan' },
                  { value: 'cn', label: 'China' },
                  { value: 'br', label: 'Brazil' },
                  { value: 'za', label: 'South Africa' },
                  { value: 'other', label: 'Other' }
                ],
              },
              {
                key: 'date_posted',
                label: 'Date Posted',
                type: 'select',
                options: [
                  { value: 'all', label: 'All' },
                  { value: 'today', label: 'Today' },
                  { value: '3days', label: 'Last 3 Days' },
                  { value: 'week', label: 'Last Week' },
                  { value: 'month', label: 'Last Month' },
                ],
              },
            ],
            filterValues: searchFilters,
          }}
          onFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
        <Button 
          type="submit" 
          className="w-full shadow hover:scale-105 transition-transform 
          bg-gradient-to-r from-blue-600 to-indigo-800
          text-white hover:from-blue-700 hover:to-indigo-700"
        >
          {isLoading ? 'Searching...' : `Search Jobs for "${searchValue || '...'}"`}
        </Button>
      </motion.form>
  
      {isLoading && jobs.length === 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-400 text-lg font-medium mt-8">
          No jobs found. Try another search.
        </p>
      ) : (
        <>
          <motion.div layout className="grid sm:grid-cols-2 gap-4">
            {jobs.map((job, index) => (
              <motion.div
                key={`${job.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
  
          {hasMoreJobs && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="shadow hover:scale-105 transition-transform 
                bg-gradient-to-r from-blue-600 to-indigo-800
                text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-4"
              >
                {isLoading ? 'Loading...' : 'Load More Jobs'}
              </Button>
            </div>
          )}
        </>
      )}
  
      {isLoading && jobs.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonCard key={`loading-${i}`} />
          ))}
        </div>
      )}
  
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full p-2 shadow-md bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-700 text-white transition"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </Button>
      )}
    </motion.div>
  );
};

export default JobSearch;
