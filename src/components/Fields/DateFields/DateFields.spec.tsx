import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateFields } from './DateFields';
import { Months } from '../../../types/calendar/enums';
import { getDateISOString } from '../../../utils/calendar/utils';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';

describe('DateField', () => {
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 25;
  const startISODate = getDateISOString(new Date(year, month, day));
  const errorMessage = 'Error message';
  const onCellClick = {
    startDate: jest.fn(),
    endDate: jest.fn(),
  };
  const icon = 'icon';

  it('should render icon', () => {
    renderWithProviders(
      <DateFields
        startISODate={startISODate}
        endISODate={startISODate}
        errorMessage={errorMessage}
        className={{ wrapper: '', field: '' }}
        onCellClick={onCellClick}
        icon={<>{icon}</>}
        readonly={true}
      />,
    );
    expect(screen.getByText(icon)).toBeInTheDocument();
  });
  it('should render error message', () => {
    renderWithProviders(
      <DateFields
        startISODate={startISODate}
        endISODate={startISODate}
        errorMessage={errorMessage}
        className={{ wrapper: '', field: '' }}
        onCellClick={onCellClick}
        icon={<>{icon}</>}
        readonly={true}
      />,
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  describe('Same day', () => {
    beforeEach(() => {
      renderWithProviders(
        <DateFields
          startISODate={startISODate}
          endISODate={startISODate}
          errorMessage={errorMessage}
          className={{ wrapper: '', field: '' }}
          onCellClick={onCellClick}
          icon={<>{icon}</>}
          readonly={true}
        />,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    describe('Date field', () => {
      it('should render start date field with label', () => {
        const startDateField = screen.getByLabelText('Start date');
        expect(startDateField).toBeInTheDocument();
        expect(startDateField.id).toBe('Start-date');
      });
      it('should render end date field with label', () => {
        const endDateField = screen.getByLabelText('End date');
        expect(endDateField).toBeInTheDocument();
        expect(endDateField.id).toBe('End-date');
      });
    });

    describe('Hour field', () => {
      it('should render start hour field with label', () => {
        const startHourField = screen.getByLabelText('Start hour');
        expect(startHourField).toBeInTheDocument();
        expect(startHourField.id).toBe('Start-hour');
      });
      it('should render end hour field with label', () => {
        const endHourField = screen.getByLabelText('End hour');
        expect(endHourField).toBeInTheDocument();
        expect(endHourField.id).toBe('End-hour');
      });
      it('should render start hour field as input', () => {
        const startHourField = screen.getByRole('textbox', {
          name: 'Start hour',
        });
        expect(startHourField).toBeInTheDocument();
      });
      it('should render hour field as input', () => {
        const endHourField = screen.getByRole('textbox', {
          name: 'End hour',
        });
        expect(endHourField).toBeInTheDocument();
      });
      it('should render start hour field with read only properties as true', () => {
        const startHourField = screen.getByLabelText('Start hour');
        expect(startHourField).toHaveAttribute('readonly');
        expect(startHourField).toHaveAttribute('aria-readonly', 'true');
      });
      it('should render end hour field with read only properties as true', () => {
        const endHourField = screen.getByLabelText('End hour');
        expect(endHourField).toHaveAttribute('readonly');
        expect(endHourField).toHaveAttribute('aria-readonly', 'true');
      });
      it('should render start hour field with aria error message', () => {
        const startHourField = screen.getByLabelText('Start hour');
        expect(startHourField).toHaveAttribute(
          'aria-errormessage',
          errorMessage,
        );
      });
      it('should render end hour field with aria error message', () => {
        const endHourField = screen.getByLabelText('End hour');
        expect(endHourField).toHaveAttribute('aria-errormessage', errorMessage);
      });
    });
  });
});
