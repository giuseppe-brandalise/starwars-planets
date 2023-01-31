import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        setPlanets([...data.results]);
        setFilteredPlanets([...data.results]);
      })
      .then(setLoading(false));
  }, []);

  return (
    <PlanetContext.Provider
      value={
        { planets,
          loading,
          filteredPlanets,
          setFilteredPlanets }
      }
    >
      <div>
        { children }
      </div>
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
