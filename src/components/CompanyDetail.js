import { useParams } from 'react-router';
import { useCompany } from '../graphql/hooks';
import JobList from './JobList';


function CompanyDetail() {
  const { companyId } = useParams();

  const { company, loading, error } = useCompany(companyId);

  if (!!error) return <div>{`Error: ${error}`}</div>;
  if (loading) return <div>loading...</div>;

  if (!company) return <></>
  
  return (
    <div>
      <h1 className="title">
        {company?.name}
      </h1>
      <div className="box">
        {company?.description}
      </div>
      <h5 className='tittle is-5'>
        Jobs at {company?.name}
      </h5>
      <JobList jobs={company?.jobs}/>
    </div>
  );
}

export default CompanyDetail;
