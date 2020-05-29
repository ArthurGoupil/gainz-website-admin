import React from 'react';
import { Chart } from 'react-google-charts';

const PieChart = ({ available, sold }) => {
  return (
    <Chart
      width='100%'
      height='300px'
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      data={[
        ['Availabilty', 'Boolean'],
        ['Disponibles', available],
        ['Vendues', sold],
      ]}
      options={{
        legend: 'bottom',
        hAxis: {
          textStyle: { color: 'red' },
        },
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
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default PieChart;
