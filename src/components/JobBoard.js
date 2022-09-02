import JobList from './JobList';

import { getJobs } from '../graphql/queries.js';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJobs().then(setJobs).catch(e => {
      console.log(e);
      setError(true)
    });
  }, []);

  if (error) return <div>Error</div>;
  
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
