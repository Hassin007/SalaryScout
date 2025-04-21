// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import JobSearch from './pages/JobSearch';
import JobSalary from './pages/JobSalary';
import CompanySalary from './pages/CompanySalary';
import JobDetails from './pages/JobDetails';
import About from './pages/About';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<JobSearch />} />
        <Route path="salary" element={<JobSalary />} />
        <Route path="company-salary" element={<CompanySalary />} />
        <Route path="job/:id" element={<JobDetails />} />
        <Route path="about" element={<About/>} />
      </Route>
    </Routes>
  );
};

export default App;
