import { Fragment } from 'react';
import Job from '../api/Job';
import Link from 'next/link';

export default function Home() {
  return (
    <Fragment>
      <button onClick={Job.getJobs}>
        API TEST GET JOB BUTTON
      </button>
      <Link href="/user/register">
        회원가입
      </Link>
      /
      <Link href="/user/info">
        유저정보
      </Link>
    </Fragment>
  )
}
