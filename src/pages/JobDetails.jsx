import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useJobContext } from '../context/JobContext';
import { getJobDetails } from '../apis/jobsApi';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const JobDetails = () => {
  const { id } = useParams();
  const { selectedJob, setSelectedJob, isLoading, setIsLoading } = useJobContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const job = await getJobDetails(id);
        setSelectedJob(job);
      } catch {
        setError('Unable to fetch job details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!selectedJob || selectedJob.job_id !== id) {
      fetchJob();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-5 w-1/3 mb-4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!selectedJob) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <Card className="shadow-lg border">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-4">
            {selectedJob.employer_logo ? (
              <img
                src={selectedJob.employer_logo}
                alt={`${selectedJob.employer_name} Logo`}
                className="h-14 w-14 rounded-md object-contain border"
              />
            ) : (
              <div className="h-14 w-14 rounded-md bg-muted flex items-center justify-center text-sm text-muted-foreground border">
               N/A
              </div>
            )}
            <div>
              <CardTitle className="text-2xl">{selectedJob.job_title}</CardTitle>
              <CardDescription>
                {selectedJob.employer_name} • {selectedJob.job_city}, {selectedJob.job_country}
              </CardDescription>
            </div>
          </div>
          {selectedJob.job_employment_type && (
            <Badge className="w-fit mt-2" variant="outline">
              {selectedJob.job_employment_type_text || selectedJob.job_employment_type}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Job Description</h3>
            <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
              {selectedJob.job_description || 'No description provided.'}
            </p>
          </div>

          {selectedJob.employer_website && (
            <p className="text-sm">
              <span className="font-semibold">Website:</span>{' '}
              <a
                href={selectedJob.employer_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {selectedJob.employer_website}
              </a>
            </p>
          )}

          {selectedJob.job_publisher && (
            <p className="text-sm">
              <span className="font-semibold">Published by:</span> {selectedJob.job_publisher}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Job ID: <span className="text-xs">{selectedJob.job_id}</span>
          </p>
          <Button asChild>
            <a
              href={selectedJob.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobDetails;
