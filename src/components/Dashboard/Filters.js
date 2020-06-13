import React from 'react';
import '../../styles/Dashboard/Filters.css';

const Filters = ({ filter, setFilter }) => {
  return (
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
  );
};

export default Filters;
