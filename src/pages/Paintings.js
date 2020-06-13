import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Loader from '../components/Utils/Loader';
import Table from '../components/Utils/Table';

const Paintings = (props) => {
  const [paintings, setPaintings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);

  const fetchPaintings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/paintings`
      );
      setPaintings(response.data);
      setIsLoading(false);
      setIsReadyToDisplay(true);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  return (
    <div className='page-container'>
      {!isLoading ? (
        <Table
          data={paintings}
          isReadyToDisplay={isReadyToDisplay}
          artType='paintings'
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Paintings;
