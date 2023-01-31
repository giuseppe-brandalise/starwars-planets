import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
import useFormFilter from '../hooks/useFormFilter';

function FilterForm() {
  const { planets, setFilteredPlanets, filteredPlanets } = useContext(PlanetContext);
  const nameFilter = useFormFilter('');
  const columnFilter = useFormFilter('population');
  const comparisonFilter = useFormFilter('maior que');
  const valueFilter = useFormFilter('0');

  useEffect(() => {
    setFilteredPlanets(planets
      .filter(({ name }) => name.includes(nameFilter.value)));
  }, [nameFilter.value, planets, setFilteredPlanets]);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => {
          nameFilter.onChange(target.value);
        } }
      />
      <br />
      <select
        value={ columnFilter.value }
        data-testid="column-filter"
        onChange={ ({ target }) => columnFilter.onChange(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ comparisonFilter.value }
        data-testid="comparison-filter"
        onChange={ ({ target }) => comparisonFilter.onChange(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ valueFilter.value }
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => valueFilter.onChange(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          switch (comparisonFilter.value) {
          case 'maior que':
            setFilteredPlanets(filteredPlanets
              .filter((planet) => planet[columnFilter.value] > +(valueFilter.value)));
            break;
          case 'menor que':
            setFilteredPlanets(filteredPlanets
              .filter((planet) => planet[columnFilter.value] < +(valueFilter.value)));
            break;
          case 'igual a':
            setFilteredPlanets(filteredPlanets
              .filter((planet) => planet[columnFilter.value] === valueFilter.value));
            break;
          default:
            break;
          }
        } }
      >
        FILTRAR
      </button>
    </div>
  );
}

export default FilterForm;
