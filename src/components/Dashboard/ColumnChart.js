import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import Loader from '../Utils/Loader';

const ColumnChart = ({ paintingsEarnings, papersEarnings }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{ height: '100%' }}
      className='d-flex justify-center align-center'
    >
      <div className='column-chart-container'>
        <Chart
          width={'95%'}
          height={'250px'}
          chartType='ColumnChart'
          loader={<div>Chargement du graphique...</div>}
          data={[
            [
              'Element',
              { label: 'Gains ' },
              { role: 'style' },
              { role: 'tooltip' },
            ],
            [
              'Peinture',
              paintingsEarnings,
              '#0b132b',
              `${paintingsEarnings} €`,
            ],
            [
              'Travail sur papier',
              papersEarnings,
              '#5bc0be',
              `${papersEarnings} €`,
            ],
          ]}
          options={{
            legend: { position: 'none' },
            hAxis: {
              textStyle: { fontName: 'Quicksand' },
            },
            chartArea: {
              width: '60%',
              height: '85%',
            },
            vAxis: {
              format: '# €',
              minValue: 0,
              textStyle: { fontName: 'Quicksand' },
            },
            tooltip: {
              textStyle: {
                fontName: 'Quicksand',
                fontSize: 14,
                bold: true,
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
          .column-chart-container {
            opacity: ${!isLoading ? 1 : 0};
            transition: opacity 0.5s;
          }
       `}
      </style>
    </div>
  );
};

export default ColumnChart;
