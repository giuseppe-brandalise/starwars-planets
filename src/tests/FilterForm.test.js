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

  it('should be able to search by numberic values', async () => {
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
  })
})