import { Fragment } from 'react';
import callApi from '../helpers/callApi';

export default function Home() {
  
  const apiTest = async () => {
    const response = await callApi({
      url: '/jobs.json',
      method: 'get',
    });
    console.log(response);
  }

  return (
    <Fragment>
      <button onClick={apiTest}>
        API TEST BUTTON
      </button>
    </Fragment>
  )
}
