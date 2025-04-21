import axios from 'axios';

const API_HOST = 'jsearch.p.rapidapi.com';

const API_HEADERS = {
  'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': API_HOST,
}

export const searchJobs = async (query, country = 'us', date_posted = 'all', page = 1) => {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/search`,
      params: {
        query,
        page: page.toString(),
        num_pages: '1',
        country,
        // date_posted,
      },
      headers: API_HEADERS,
    };
  
    const response = await axios.request(options);
    // console.log('API Response:', response.data.data);console.log(import.meta.env.VITE_RAPID_API_KEY)
    return response.data.data;
  };

export const getJobDetails = async (jobId,country = 'us') => {
  const options = {
    method: 'GET',
    url: `https://${API_HOST}/job-details`,
    params: { 
        job_id: jobId,
        country,
     },
    headers: API_HEADERS,
  };

  const response = await axios.request(options);
  return response.data.data[0];
}

export const getJobSalary = async (job_title,location,location_type='ANY',years_of_experience='ALL') => {
    const options = {
        method: 'GET',
        url: `https://${API_HOST}/estimated-salary`,
        params: { 
            job_title,
            location,
            location_type,
            years_of_experience,
         },
        headers: API_HEADERS,
    };
    console.log('API Response:', options);
    const response = await axios.request(options);
    return response.data.data[0];
}

export const getCompanyJobSalary = async (company,job_title,location_type='ANY',years_of_experience='ALL') => {
    const options = {
        method: 'GET',
        url: `https://${API_HOST}/company-job-salary`,
        params: { 
            company,
            job_title,
            location_type,
            years_of_experience,
         },
        headers: API_HEADERS,
    };
    
    const response = await axios.request(options);
    return response.data.data[0];
}