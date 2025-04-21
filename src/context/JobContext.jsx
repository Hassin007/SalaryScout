// src/context/JobContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  // 🔄 General shared state
  const [query, setQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 🔍 Job Search
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchFilters, setSearchFilters] = useState({
    country: 'us',
    date_posted: 'all',
  });

  // 💰 Job Salary Estimate
  const [salaryFilters, setSalaryFilters] = useState({
    job_title: '',
    location: '',
    location_type: 'ANY',
    years_of_experience: 'ALL',
  });
  const [salaryInfo, setSalaryInfo] = useState(null);

  // 🏢 Company Salary Estimate
  const [companyFilters, setCompanyFilters] = useState({
    company: '',
    job_title: '',
    location_type: 'ANY',
    years_of_experience: 'ALL',
  });
  const [companySalaryInfo, setCompanySalaryInfo] = useState(null);

  return (
    <JobContext.Provider
      value={{
        // 🔁 General
        query,
        setQuery,
        selectedJob,
        setSelectedJob,
        currentPage,
        setCurrentPage,
        isLoading,
        setIsLoading,

        // 🔍 Search Jobs
        jobs,
        setJobs,
        totalJobs,
        setTotalJobs,
        searchFilters,
        setSearchFilters,

        // 💰 Salary Estimate
        salaryFilters,
        setSalaryFilters,
        salaryInfo,
        setSalaryInfo,

        // 🏢 Company Salary
        companyFilters,
        setCompanyFilters,
        companySalaryInfo,
        setCompanySalaryInfo,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  return useContext(JobContext);
};
