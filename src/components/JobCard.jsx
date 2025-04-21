import { useNavigate } from 'react-router-dom';
import { useJobContext } from '../context/JobContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaArrowRight, FaBuilding } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';

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
        className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 border border-gray-200 rounded-xl overflow-hidden group h-full flex flex-col"
      >
        <div className="relative flex-1 flex flex-col">
          {/* Company Header */}
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex items-start gap-3">
              {/* Company Logo Placeholder */}
              <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FaBuilding className="text-gray-400 dark:text-gray-500" size={20} />
              </div>
              
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                  {job.job_title}
                </CardTitle>
                
                <div className="flex items-center gap-2 mt-1">
                  <CardDescription className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                    {job.employer_name || job.company_name}
                  </CardDescription>
                </div>
              </div>
              
              {job.job_max_salary && (
                <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-100 px-3 py-1 rounded-full text-xs font-semibold shadow-none whitespace-nowrap">
                  ${job.job_max_salary.toLocaleString()}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-3 pb-4 flex-1 flex flex-col">
            <div className="flex flex-col gap-3">
              {/* Location */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="mr-2 text-gray-500 dark:text-gray-400" size={12} />
                <span className="line-clamp-1">
                  {job.job_city}, {job.job_country}
                  {job.job_is_remote && (
                    <Badge variant="outline" className="ml-2 text-xs border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
                      Remote
                    </Badge>
                  )}
                </span>
              </div>

              {/* Employment Type */}
              {job.job_employment_type && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FaBriefcase className="mr-2 text-gray-500 dark:text-gray-400" size={12} />
                  {job.job_employment_type}
                </div>
              )}

              {/* Salary Range */}
              {(job.job_min_salary || job.job_max_salary) && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FaMoneyBillWave className="mr-2 text-gray-500 dark:text-gray-400" size={12} />
                  {job.job_min_salary && `$${job.job_min_salary.toLocaleString()}`}
                  {job.job_min_salary && job.job_max_salary && ' - '}
                  {job.job_max_salary && `$${job.job_max_salary.toLocaleString()}`}
                </div>
              )}

              {/* Skills */}
              {job.job_required_skills && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {job.job_required_skills.split(',').slice(0, 3).map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-2 py-1 rounded-full border-blue-200 dark:border-blue-800"
                      >
                        {skill.trim()}
                      </Badge>
                    ))}
                    {job.job_required_skills.split(',').length > 3 && (
                      <Badge variant="outline" className="text-xs text-gray-500">
                        +{job.job_required_skills.split(',').length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* View Details Button */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <motion.div
                whileHover={{ x: 2 }}
                className="flex items-center text-sm font-medium text-primary"
              >
                View details
                <FaArrowRight className="ml-1" size={12} />
              </motion.div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCard;