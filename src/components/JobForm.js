import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateCompany } from '../graphql/hooks';

function JobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { createJob, result } = useCreateCompany();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const job = await createJob({ title, description });
    navigate(`/jobs/${job.id}`)
  };

  // if (error) return <div>{`Error: ${error}`}</div>;
  if (result?.loading) {
    console.log('Loading!');
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
