import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { Chart } from 'react-google-charts';
import CountUp from 'react-countup';

import Loader from '../../components/Utils/Loader';
import '../../styles/Dashboard.css';
import PieChart from './PieChart';

const Dashboard = ({ user }) => {
  const history = useHistory();
  const [paintings, setPaintings] = useState(null);
  const [soldPaintingsCount, setSoldPaintingsCount] = useState(null);
  const [papers, setPapers] = useState(null);
  const [soldPapersCount, setSoldPapersCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('oeuvres');

  const getArtsCount = () => {
    let result;
    if (filter === 'oeuvres') {
      result = {
        available:
          paintings.length +
          papers.length -
          (soldPaintingsCount + soldPapersCount),
        sold: soldPaintingsCount + soldPapersCount,
      };
    } else if (filter === 'peintures') {
      result = {
        available: paintings.length - soldPaintingsCount,
        sold: soldPaintingsCount,
      };
    } else {
      result = {
        available: papers.length - soldPapersCount,
        sold: soldPapersCount,
      };
    }
    return result;
  };

  const fetchPaintings = async () => {
    try {
      const paintingsResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/paintings`
      );
      setPaintings(paintingsResponse.data);
      setSoldPaintingsCount(
        paintingsResponse.data.filter((painting) => {
          return painting.isSold;
        }).length
      );

      const papersResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/papers`
      );
      setPapers(papersResponse.data);
      setSoldPapersCount(
        papersResponse.data.filter((paper) => {
          return paper.isSold;
        }).length
      );

      setIsLoading(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
  }, [user, history]);

  return (
    <div className='page-container'>
      {!isLoading ? (
        <div className='squares-container d-flex space-between'>
          <div className='vertical-square d-flex flex-column space-between align-center'>
            <div className='filter-elements-container'>
              <span
                className={`filter-element ${
                  filter === 'oeuvres' && 'filter-selected'
                }`}
                onClick={() => setFilter('oeuvres')}
              >
                Tout
              </span>
              <span
                className={`filter-element ${
                  filter === 'peintures' && 'filter-selected'
                }`}
                onClick={() => setFilter('peintures')}
              >
                Peinture
              </span>
              <span
                className={`filter-element ${
                  filter === 'travaux sur papier' && 'filter-selected'
                }`}
                onClick={() => setFilter('travaux sur papier')}
              >
                Travail sur papier
              </span>
            </div>
            <div className='art-count-container d-flex flex-column space-around align-center'>
              <div className='art-count-wrapper d-flex flex-column align-center justify-center'>
                <span className='art-count d-flex align-center'>
                  <CountUp
                    end={getArtsCount().available + getArtsCount().sold}
                    duration={1}
                  />
                </span>
                <span>{filter}</span>
              </div>
              <div className='chart-container d-flex flex-column align-center justify-center'>
                <PieChart
                  available={getArtsCount().available}
                  sold={getArtsCount().sold}
                />
              </div>
            </div>
          </div>
          <div className='vertical-square'>
            <div className='pie-chart-container d-flex flex-column align-center justify-center'>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType='BarChart'
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    'Element',
                    'Gains',
                    { role: 'style' },
                    {
                      sourceColumn: 0,
                      role: 'annotation',
                      type: 'string',
                      calc: 'stringify',
                    },
                  ],
                  ['Peinture', 3458, '#0b132b', null],
                  ['Travail sur papier', 9083, '#5bc0be', null],
                ]}
                options={{
                  legend: { position: 'none' },
                  hAxis: {
                    textStyle: { fontName: 'Quicksand' },
                  },
                  vAxis: {
                    minValue: 0,
                    textStyle: { fontName: 'Quicksand' },
                  },
                  tooltipTextStyle: {
                    fontName: 'Quicksand',
                    fontSize: 12,
                  },
                }}
                rootProps={{ 'data-testid': '2' }}
              />
            </div>
          </div>
          <div className='vertical-square d-flex flex-column space-between align-center'>
            <div className='filter-elements-container'>
              <span
                className={`filter-element ${
                  filter === 'oeuvres' && 'filter-selected'
                }`}
                onClick={() => setFilter('oeuvres')}
              >
                Tout
              </span>
              <span
                className={`filter-element ${
                  filter === 'peintures' && 'filter-selected'
                }`}
                onClick={() => setFilter('peintures')}
              >
                Peinture
              </span>
              <span
                className={`filter-element ${
                  filter === 'travaux sur papier' && 'filter-selected'
                }`}
                onClick={() => setFilter('travaux sur papier')}
              >
                Travail sur papier
              </span>
            </div>
            <div className='art-count-container d-flex flex-column space-around align-center'>
              <div className='art-count-wrapper d-flex flex-column align-center justify-center'>
                <span className='art-count d-flex align-center'>
                  {getArtsCount().available + getArtsCount().sold}
                </span>
                <span>{filter}</span>
              </div>
              <div className='pie-chart-container d-flex flex-column align-center justify-center'>
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType='Bar'
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Year', 'Sales', 'Expenses', 'Profit'],
                    ['2014', 1000, 400, 200],
                    ['2015', 1170, 460, 250],
                    ['2016', 660, 1120, 300],
                    ['2017', 1030, 540, 350],
                  ]}
                  options={{
                    // Material design options
                    chart: {
                      title: 'Company Performance',
                      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    },
                  }}
                  // For tests
                  rootProps={{ 'data-testid': '2' }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Dashboard;
