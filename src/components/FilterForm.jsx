import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import useFormFilter from '../hooks/useFormFilter';

function FilterForm() {
  const {
    planets,
    setFilteredPlanets,
    filteredPlanets,
  } = useContext(PlanetContext);
  const [fullUsedFilters, setFullUsedFilters] = useState([]);
  const [usedFilters, setUsedFilters] = useState([]);
  const nameFilter = useFormFilter('');
  const columnFilter = useFormFilter('population');
  const comparisonFilter = useFormFilter('maior que');
  const valueFilter = useFormFilter('0');

  const filters = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const nonUsedFilters = filters.filter((filter) => !usedFilters.includes(filter));

  useEffect(() => {
    if (fullUsedFilters.length === 0) {
      setFilteredPlanets([...planets]);
    }
    if (fullUsedFilters.length === 1) {
      switch (fullUsedFilters[0].comparison) {
      case 'maior que':
        setFilteredPlanets(planets
          .filter((planet) => planet[fullUsedFilters[0]
            .column] > +(fullUsedFilters[0].qtd)));
        break;
      case 'menor que':
        setFilteredPlanets(planets
          .filter((planet) => planet[fullUsedFilters[0]
            .column] < +(fullUsedFilters[0].qtd)));
        break;
      case 'igual a':
        setFilteredPlanets(planets
          .filter((planet) => +(planet[fullUsedFilters[0]
            .column]) === +(fullUsedFilters[0].qtd)));
        break;
      default:
        break;
      }
    }
  }, [fullUsedFilters, planets, setFilteredPlanets]);

  useEffect(() => {
    setUsedFilters((fullUsedFilters.map((e) => e.column)));
  }, [fullUsedFilters]);

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
        { nonUsedFilters
          .map((filter) => <option key={ filter } value={ filter }>{ filter }</option>) }
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
          setUsedFilters([...usedFilters, columnFilter.value]);
          setFullUsedFilters([...fullUsedFilters,
            {
              column: columnFilter.value,
              comparison: comparisonFilter.value,
              qtd: valueFilter.value,
            }]);
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
          columnFilter.onChange(nonUsedFilters[0]);
        } }
      >
        FILTRAR
      </button>
      <br />
      {fullUsedFilters.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          {`${filter.column}
           ${filter.comparison}
           ${filter.qtd}`}
          <button
            type="button"
            onClick={ () => {
              setFullUsedFilters(fullUsedFilters
                .filter((e) => e.column !== filter.column));
            //   setFilteredPlanets(planets.filter((planet) => reFilter(planet)));
            } }
          >
            Delete
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => {
          setFullUsedFilters([]);
          setUsedFilters([]);
          setFilteredPlanets([...planets]);
        } }
      >
        Delete All
      </button>
    </div>
  );
}

export default FilterForm;
