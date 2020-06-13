import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Loader from '../components/Utils/Loader';
import '../styles/Dashboard/Dashboard.css';
import PieChart from '../components/Dashboard/PieChart';
import ColumnChart from '../components/Dashboard/ColumnChart';
import Filters from '../components/Dashboard/Filters';
import Count from '../components/Dashboard/Count';
import BarChart from '../components/Dashboard/BarChart';

const Dashboard = (props) => {
  const [paintings, setPaintings] = useState(null);
  const [soldPaintingsCount, setSoldPaintingsCount] = useState(null);
  const [papers, setPapers] = useState(null);
  const [soldPapersCount, setSoldPapersCount] = useState(null);

  const [filter, setFilter] = useState('oeuvres');
  const [isLoading, setIsLoading] = useState(true);
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);

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

  const getEarnings = () => {
    let paintingsEarnings = 0;
    let unknownPricePaintings = 0;
    let freePaintings = 0;
    let papersEarnings = 0;
    let unknownPricePapers = 0;
    let freePapers = 0;

    paintings.forEach((painting) => {
      if (painting.isSold) {
        if (painting.sellPrice === null) {
          unknownPricePaintings += 1;
        } else if (painting.sellPrice === 0) {
          freePaintings += 1;
        } else paintingsEarnings += painting.sellPrice;
      }
    });

    papers.forEach((paper) => {
      if (paper.isSold) {
        if (paper.sellPrice === null) {
          unknownPricePapers += 1;
        } else if (paper.sellPrice === 0) {
          freePapers += 1;
        } else papersEarnings += paper.sellPrice;
      }
    });

    return {
      paintings: paintingsEarnings,
      unknownPricePaintings,
      freePaintings,
      papers: papersEarnings,
      unknownPricePapers,
      freePapers,
    };
  };

  const getArtsByYear = () => {
    let paintingsYearCount = {};
    let papersYearCount = {};
    let yearsArr = [];
    let resultArr = [['Année', 'Peinture', 'Travail sur papier']];

    paintings.forEach((painting) => {
      if (painting.creationYear in paintingsYearCount) {
        paintingsYearCount[painting.creationYear] += 1;
      } else {
        paintingsYearCount[painting.creationYear] = 1;
        if (!yearsArr.includes(painting.creationYear))
          yearsArr.push(painting.creationYear);
      }
    });

    papers.forEach((paper) => {
      if (paper.creationYear in papersYearCount) {
        papersYearCount[paper.creationYear] += 1;
      } else {
        papersYearCount[paper.creationYear] = 1;
        if (!yearsArr.includes(paper.creationYear))
          yearsArr.push(paper.creationYear);
      }
    });

    yearsArr.sort((a, b) => b - a);

    yearsArr.forEach((year) => {
      let paintingsThisYear = 0;
      let papersThisYear = 0;

      if (year in paintingsYearCount)
        paintingsThisYear = paintingsYearCount[year];
      if (year in papersYearCount) papersThisYear = papersYearCount[year];

      resultArr.push([year.toString(), paintingsThisYear, papersThisYear]);
    });

    return resultArr;
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
      setTimeout(() => setIsReadyToDisplay(true), 100);
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
        <div className='squares-container d-flex space-between'>
          <div className='vertical-square d-flex flex-column space-between align-center'>
            <div className='square-label'>Nombre d'oeuvres</div>
            <Filters filter={filter} setFilter={setFilter} />
            <Count
              number={getArtsCount().available + getArtsCount().sold}
              label={filter}
            />
            <div
              className='chart-container d-flex flex-column align-center justify-center'
              style={{ height: '50%' }}
            >
              <PieChart
                available={getArtsCount().available}
                sold={getArtsCount().sold}
              />
            </div>
          </div>
          <div className='vertical-square d-flex flex-column space-between align-center'>
            <div className='square-label'>Revenus générés</div>
            <Count
              number={getEarnings().paintings + getEarnings().papers}
              unit='€'
              label="d'oeuvres vendues"
            />
            <div className='chart-container d-flex flex-column align-center justify-center'>
              <ColumnChart
                paintingsEarnings={getEarnings().paintings}
                papersEarnings={getEarnings().papers}
              />
            </div>
            <div className='d-flex flex-column align-center'>
              <div className='second-title'>Oeuvres gratuites</div>
              <div className='free-arts'>
                <span className='free-paintings'>
                  <b>Peinture</b> {getEarnings().freePaintings}
                </span>
                <span className='free-papers'>
                  <b>Travail sur papier</b> {getEarnings().freePapers}
                </span>
              </div>
              <div className='second-title'>Prix de vente inconnu</div>
              <div>
                <span className='unknown-price-paintings'>
                  <b>Peinture</b> {getEarnings().unknownPricePaintings}
                </span>
                <span className='unknown-price-papers'>
                  <b>Travail sur papier</b> {getEarnings().unknownPricePapers}
                </span>
              </div>
            </div>
          </div>
          <div className='vertical-square d-flex flex-column space-between align-center'>
            <div className='square-label'>Production par année</div>
            <div className='chart-container-full d-flex flex-column align-center justify-center'>
              <BarChart data={getArtsByYear()} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <style>
        {`
        .vertical-square {
          opacity: ${isReadyToDisplay ? 1 : 0};
          transition: opacity 0.5s;
        }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
