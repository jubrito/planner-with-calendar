import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { HourButtons } from './HourButtons';
import { screen } from '@testing-library/react';
import { initialValue } from '../../../../redux/slices/localeSlice';

describe('HourButtons', () => {
  it('should render buttons with accessibility title using 12-hour clock system', () => {
    renderWithProviders(<HourButtons />);
    const ranges = [
      '12 to 01 AM',
      '01 to 02 AM',
      '02 to 03 AM',
      '03 to 04 AM',
      '04 to 05 AM',
      '05 to 06 AM',
      '06 to 07 AM',
      '07 to 08 AM',
      '08 to 09 AM',
      '09 to 10 AM',
      '10 to 11 AM',
      '11 AM to 12 PM',
      '12 to 01 PM',
      '01 to 02 PM',
      '02 to 03 PM',
      '03 to 04 PM',
      '04 to 05 PM',
      '05 to 06 PM',
      '06 to 07 PM',
      '07 to 08 PM',
      '08 to 09 PM',
      '09 to 10 PM',
      '10 to 11 PM',
      '11 PM to 12 AM',
    ];
    ranges.forEach((range) => {
      expect(
        screen.getByTitle(
          `Click, hold, and drag to create an event within ${range}`,
        ),
      );
    });
  });

  it('should render buttons with accessibility title using 24-hour clock system', () => {
    renderWithProviders(<HourButtons />, {
      preloadedState: {
        localeSlice: {
          ...initialValue,
          currentState: {
            locale: {
              lang: 'pt-BR',
            },
          },
        },
      },
    });
    const ranges = [
      '00:00 to 01:00',
      '01:00 to 02:00',
      '02:00 to 03:00',
      '03:00 to 04:00',
      '04:00 to 05:00',
      '05:00 to 06:00',
      '06:00 to 07:00',
      '07:00 to 08:00',
      '08:00 to 09:00',
      '09:00 to 10:00',
      '10:00 to 11:00',
      '11:00 to 12:00',
      '12:00 to 13:00',
      '13:00 to 14:00',
      '14:00 to 15:00',
      '15:00 to 16:00',
      '16:00 to 17:00',
      '17:00 to 18:00',
      '18:00 to 19:00',
      '19:00 to 20:00',
      '20:00 to 21:00',
      '21:00 to 22:00',
      '22:00 to 23:00',
      '23:00 to 00:00',
    ];
    ranges.forEach((range) => {
      expect(
        screen.getByTitle(
          `Click, hold, and drag to create an event within ${range}`,
        ),
      );
    });
  });
});
