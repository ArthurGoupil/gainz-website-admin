import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import Loader from '../Utils/Loader';

const BarChart = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{ height: '100%' }}
      className='d-flex justify-center align-center'
    >
      <div className='bar-chart-container'>
        <Chart
          width={'100%'}
          height={'100%'}
          chartType='BarChart'
          loader={<div>Chargement du graphique...</div>}
          data={data}
          options={{
            legend: {
              position: 'bottom',
              textStyle: { fontName: 'Quicksand' },
            },
            tooltip: {
              textStyle: { fontName: 'Quicksand' },
            },
            vAxis: {
              textStyle: { fontName: 'Quicksand' },
            },
            hAxis: {
              textStyle: { fontName: 'Quicksand' },
            },
            series: {
              0: {
                color: '#0b132b',
              },
              1: {
                color: '#5bc0be',
              },
            },
          }}
          chartEvents={[
            {
              eventName: 'ready',
              callback() {
                setIsLoading(false);
              },
            },
          ]}
        />
      </div>
      {isLoading && (
        <div
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          className='d-flex justify-center align-center'
        >
          <Loader width='50px' height='50px' />
        </div>
      )}
      <style>
        {`
          .bar-chart-container {
            height: 100%;
            width: 100%;
            opacity: ${!isLoading ? 1 : 0};
            transition: opacity 0.5s;
          }
       `}
      </style>
    </div>
  );
};

export default BarChart;
