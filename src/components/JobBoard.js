import { useJobs } from '../graphql/hooks';
import JobList from './JobList';

function JobBoard() {
  const { jobs, loading, error } = useJobs();

  if (error) return <div>{`Error: ${error}`}</div>;
  if (loading) return <div>loading...</div>;
  
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs}/>
    </div>
  );
}

export default JobBoard;
