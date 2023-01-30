import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import useFormFilter from '../hooks/useFormFilter';

function Table() {
  const { planets, loading } = useContext(PlanetContext);
  const [filterName, setName] = useState('');

  const column = useFormFilter('population');
  const comparison = useFormFilter('maior que');
  const value = useFormFilter(0);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => {
          setName(target.value);
        } }
      />
      <br />
      <select
        value="population"
        data-testid="column-filter"
        onChange={ column.onChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value="maior que"
        data-testid="comparison-filter"
        onChange={ comparison.onChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value="0"
        type="number"
        data-testid="value-filter"
        onChange={ value.onChange }
      />
      <button
        type="button"
        data-testid="button-filter"
      >
        FILTRAR
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { loading ? null
            : planets.filter(({ name }) => name.includes(filterName))
              // .filter((planet) => ())
              .map((planet) => (
                <tr key={ planet.name }>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.films }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
