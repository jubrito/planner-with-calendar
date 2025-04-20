import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { HourButtons } from './HourButtons';
import { screen } from '@testing-library/react';

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
          `Click, hold, and drag to create an event within the range ${range}`,
        ),
      );
    });
  });
});
