import { initialValue } from '../../../redux/slices/localeSlice';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { HoursOfTheDay } from './HoursOfTheDay';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('Hours of the day', () => {
  const getPreloadedState = (lang: string) => ({
    localeSlice: {
      initialState: {
        ...initialValue.initialState,
      },
      currentState: {
        ...initialValue.currentState,
        locale: {
          lang,
        },
      },
    },
  });

  it('should render hours of the day in english', () => {
    renderWithProviders(<HoursOfTheDay />, {
      preloadedState: getPreloadedState('en-US'),
    });
    const hours = [
      '01 AM',
      '02 AM',
      '03 AM',
      '04 AM',
      '05 AM',
      '06 AM',
      '07 AM',
      '08 AM',
      '09 AM',
      '10 AM',
      '11 AM',
      '12 PM',
      '01 PM',
      '02 PM',
      '03 PM',
      '04 PM',
      '05 PM',
      '06 PM',
      '07 PM',
      '08 PM',
      '09 PM',
      '10 PM',
      '11 PM',
    ];
    const midnight = '12 AM';
    hours.forEach((hour) => {
      expect(screen.getByText(hour)).toBeInTheDocument();
    });
    expect(screen.getAllByText(midnight).length).toBe(2);
  });
});
