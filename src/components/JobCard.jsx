import { useNavigate } from 'react-router-dom';
import { useJobContext } from '../context/JobContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';

const JobCard = ({ job }) => {
  const { setSelectedJob } = useJobContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedJob(job);
    navigate(`/job/${encodeURIComponent(job.job_id)}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        onClick={handleClick}
        className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/30 border border-gray-100 rounded-xl overflow-hidden group"
      >
        <div className="relative">
          {/* Company header with subtle gradient */}
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {job.job_title}
                </CardTitle>
                <CardDescription className="text-sm font-medium text-indigo-600">
                  {job.company_name}
                </CardDescription>
              </div>
              {job.job_max_salary && (
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  ${job.job_max_salary.toLocaleString()}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-3 pb-4">
            <div className="flex flex-col gap-2">
              {/* Location */}
              <div className="flex items-center text-sm text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-gray-400" size={12} />
                {job.job_city}, {job.job_country}
              </div>

              {/* Employment type */}
              {job.job_employment_type && (
                <div className="flex items-center text-sm text-gray-600">
                  <FaBriefcase className="mr-2 text-gray-400" size={12} />
                  {job.job_employment_type}
                </div>
              )}

              {/* Salary range (if available) */}
              {(job.job_min_salary || job.job_max_salary) && (
                <div className="flex items-center text-sm text-gray-600">
                  <FaMoneyBillWave className="mr-2 text-gray-400" size={12} />
                  {job.job_min_salary && `$${job.job_min_salary.toLocaleString()}`}
                  {job.job_min_salary && job.job_max_salary && ' - '}
                  {job.job_max_salary && `$${job.job_max_salary.toLocaleString()}`}
                </div>
              )}

              {/* Skills/tags (example) */}
              {job.job_required_skills && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.job_required_skills.split(',').slice(0, 3).map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCard;