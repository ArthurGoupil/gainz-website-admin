import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Loader from '../components/Utils/Loader';
import Table from '../components/Utils/Table';

const Papers = (props) => {
  const [papers, setPapers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);

  const fetchPapers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/papers`
      );
      setPapers(response.data);
      setIsLoading(false);
      setIsReadyToDisplay(true);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className='page-container'>
      {!isLoading ? (
        <Table
          data={papers}
          isReadyToDisplay={isReadyToDisplay}
          artType='papers'
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Papers;
