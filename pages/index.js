import { Fragment } from 'react';
import Job from '../api/Job';

export default function Home() {
  return (
    <Fragment>
      <button onClick={Job.getJobs}>
        API TEST GET JOB BUTTON
      </button>
    </Fragment>
  )
}
