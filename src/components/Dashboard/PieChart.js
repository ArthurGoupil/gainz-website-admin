import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import Loader from '../Utils/Loader';

const PieChart = ({ available, sold }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{ width: '100%' }}
      className='d-flex justify-center align-center'
    >
      <div className='pie-chart-container'>
        <Chart
          width='100%'
          height='300px'
          chartType='PieChart'
          loader={<div>Chargement du graphique...</div>}
          data={[
            ['Availabilty', 'Boolean'],
            ['Disponibles', available],
            ['Vendues', sold],
          ]}
          options={{
            legend: 'bottom',
            pieSliceText: 'value',
            pieSliceTextStyle: {
              fontName: 'Quicksand',
              fontSize: 18,
              bold: true,
            },
            legendTextStyle: {
              fontName: 'Quicksand',
              fontSize: 12,
            },
            chartArea: {
              left: 0,
              top: 0,
              width: '100%',
              height: '80%',
            },
            slices: {
              0: { color: '#5bc0be' },
              1: { color: '#0b132b' },
            },
            tooltip: {
              textStyle: {
                fontName: 'Quicksand',
                fontSize: 12,
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
          .pie-chart-container {
            opacity: ${!isLoading ? 1 : 0};
            transition: opacity 0.5s;
          }
       `}
      </style>
    </div>
  );
};

export default PieChart;
