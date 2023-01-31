import React from 'react';
import { render, screen } from '@testing-library/react';
import planets from './mock/mockPlanets';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa App', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(planets)
    });
  })
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the filters and their values', async () => {
    await act(() => render(<App />))

    const nameFilter = await screen.getByRole('textbox')
    const columnFilter = await screen.getByTestId('column-filter')
    const compFilter = await screen.getByTestId('comparison-filter')
    const valueFilter = await screen.getByTestId('value-filter')
    const buttonFilter = await screen.getByRole('button', {
      name: /filtrar/i
    })
    
    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(compFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(nameFilter).toHaveValue('');
    expect(columnFilter).toHaveValue('population');
    expect(compFilter).toHaveValue('maior que');
    expect(valueFilter).toHaveValue(0);
  });

  it('should be able to search by the planets name', async () => {
    await act(() => render(<App />))

    const nameFilter = await screen.getByRole('textbox')
    act(() => {
      userEvent.type(nameFilter, 'Alderaan');
    })

    const planetByName = screen.getByRole('cell', {
      name: /alderaan/i
    })
    expect(planetByName).toBeInTheDocument();
  });

  it('should be able to search by numberic values and delete said searchs', async () => {
    await act(() => render(<App />))

    const columnFilter = await screen.getByTestId('column-filter')
    const compFilter = await screen.getByTestId('comparison-filter')
    const valueFilter = await screen.getByTestId('value-filter')
    const buttonFilter = await screen.getByRole('button', {
      name: /filtrar/i
    })

    act(() => {
      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(compFilter, 'maior que');
      userEvent.type(valueFilter, '15000');
      userEvent.click(buttonFilter);
    })

    const planets = await screen.findAllByTestId('planet');
    expect(planets.length).toBe(2);

    const deleteButtons = await screen.findAllByTestId('delete-one')
    expect((deleteButtons).length).toBe(1);
    
    act(() => {
        userEvent.click(deleteButtons[0])
    })

    const newPlanets = await screen.findAllByTestId('planet');
    expect(newPlanets.length).toBe(10)

    act(() => {
      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(compFilter, 'menor que');
      userEvent.type(valueFilter, '15000');
      userEvent.click(buttonFilter);
      userEvent.selectOptions(columnFilter, 'orbital_period');
      userEvent.selectOptions(compFilter, 'igual a');
      userEvent.type(valueFilter, '304');
      userEvent.click(buttonFilter);
    })

    const deleteAll = screen.getByRole('button', {
      name: /delete all/i
    })

    expect(deleteAll).toBeInTheDocument();

    act(() => {
      userEvent.click(deleteAll);
    })

    const newNewPlanets = await screen.findAllByTestId('planet');
      expect(newNewPlanets.length).toBe(10)
  })

})