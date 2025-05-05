import { HoursOfTheDay } from './HoursOfTheDay';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Months } from '../../../../types/calendar/enums';
import {
  get2DigitsValue,
  getDateISOString,
} from '../../../../utils/calendar/utils';
import { InitialState as InitialDateState } from '../../../../redux/slices/dateSlice';
import {
  InitialState,
  initialValue,
} from '../../../../redux/slices/localeSlice';
import { initialValue as initialDateValue } from '../../../../redux/slices/dateSlice';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';

describe('Hours of the day', () => {
  const year = 2025;
  const month = Months.APRIL;
  const day = 1;

  const getDateTime = (index: number) =>
    `${year}-${get2DigitsValue(month)}-${get2DigitsValue(day)} ${get2DigitsValue(index)}:00:00`;

  const getPreloadedState = (
    lang: string,
  ):
    | Partial<{
        dateSlice: InitialDateState;
        localeSlice: InitialState;
      }>
    | undefined => ({
    localeSlice: {
      ...initialValue,
      currentState: {
        ...initialValue.currentState,
        locale: {
          lang,
        },
      },
    },
    dateSlice: {
      ...initialDateValue,
      currentState: {
        ...initialDateValue.currentState,
        dayViewISODate: getDateISOString(new Date(year, month, day)),
      },
    },
  });

  it('should render AM/PM hours of the day when locale is english', () => {
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
    const midnightDateTime = getDateTime(0);
    hours.forEach((hour, index) => {
      const timeElement = screen.getByText(hour);
      const dateTime = getDateTime(index + 1);
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveRole('time');
      expect(timeElement).toHaveProperty('dateTime', dateTime);
    });
    expect(screen.getAllByText(midnight).length).toBe(2);
    expect(screen.getAllByText(midnight)[0]).toHaveRole('time');
    expect(screen.getAllByText(midnight)[0]).toHaveProperty(
      'dateTime',
      midnightDateTime,
    );
    expect(screen.getAllByText(midnight)[1]).toHaveRole('time');
    expect(screen.getAllByText(midnight)[1]).toHaveProperty(
      'dateTime',
      midnightDateTime,
    );
  });
  it('should render hours using 24-hour notation when locale is pt-br', () => {
    renderWithProviders(<HoursOfTheDay />, {
      preloadedState: getPreloadedState('pt-br'),
    });
    const hours = [
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ];
    const midnight = '00:00';
    const midnightDateTime = getDateTime(0);
    hours.forEach((hour, index) => {
      const timeElement = screen.getByText(hour);
      const dateTime = getDateTime(index + 1);
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveRole('time');
      expect(timeElement).toHaveProperty('dateTime', dateTime);
    });
    expect(screen.getAllByText(midnight).length).toBe(2);
    expect(screen.getAllByText(midnight)[1]).toHaveRole('time');
    expect(screen.getAllByText(midnight)[1]).toHaveProperty(
      'dateTime',
      midnightDateTime,
    );
  });
});
