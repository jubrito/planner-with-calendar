import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateField } from './DateField';
import { Months } from '../../../../../../types/calendar/enums';
import { getDateISOString } from '../../../../../../utils/calendar/utils';
import { renderWithProviders } from '../../../../../../utils/tests/renderWithProviders';

describe('DateField', () => {
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 25;
  const startISODate = getDateISOString(new Date(year, month, day));
  const endISODateMultiDay = getDateISOString(new Date(year, month, day + 1));
  const errorMessage = 'Error message';
  const onCellClick = {
    startDate: jest.fn(),
    endDate: jest.fn(),
  };
  const icon = 'icon';

  it('should render icon', () => {
    renderWithProviders(
      <DateField
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
      <DateField
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

  describe('Multi day', () => {
    beforeEach(() => {
      renderWithProviders(
        <DateField
          startISODate={startISODate}
          endISODate={endISODateMultiDay}
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

    it('should render end date field if it is multi day event', () => {
      const dateField = screen.getByLabelText('End date');
      expect(dateField).toBeInTheDocument();
      expect(dateField.id).toBe('End date');
      expect(dateField).toHaveRole('textbox');
    });
    it('should render end date field with read only properties as true', () => {
      const endDateField = screen.getByLabelText('End date');
      expect(endDateField).toHaveAttribute('readonly');
      expect(endDateField).toHaveAttribute('aria-readonly', 'true');
    });
    it('should render end date field with aria error message', () => {
      const endDateField = screen.getByLabelText('Start date');
      expect(endDateField).toHaveAttribute('aria-errormessage', errorMessage);
    });
  });
  describe('Same day', () => {
    beforeEach(() => {
      renderWithProviders(
        <DateField
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
        expect(startDateField.id).toBe('Start date');
      });
      it('should not render end date field if it is single day event', () => {
        const endDateField = screen.queryByLabelText('End date');
        expect(endDateField).not.toBeInTheDocument();
      });
      it('should render start date field as input', () => {
        const startDateField = screen.getByRole('textbox', {
          name: 'Start date',
        });
        expect(startDateField).toBeInTheDocument();
      });
      it('should render start date field with read only properties as true', () => {
        const startDateField = screen.getByLabelText('Start date');
        expect(startDateField).toHaveAttribute('readonly');
        expect(startDateField).toHaveAttribute('aria-readonly', 'true');
      });
      it('should render start date field with aria error message', () => {
        const startDateField = screen.getByLabelText('Start date');
        expect(startDateField).toHaveAttribute(
          'aria-errormessage',
          errorMessage,
        );
      });
      it.todo(
        'should display start date calendar when clicking on start date input (mouse)',
      );
      it.todo(
        'should display end date calendar when clicking on end date input (mouse)',
      );
      it.todo(
        'should display start date calendar when clicking on start date input (enter key down)',
      );
      it.todo(
        'should display end date calendar when clicking on end date input (enter key down)',
      );
      it.todo(
        'should call start date on click function when clicking on calendar',
      );
      it.todo(
        'should call end date on click function when clicking on calendar',
      );
      // it('should call start date on click function when clicking on calendar', async () => {
      //   const startDateField = screen.getByLabelText('Start date');
      //   await userEvent.click(startDateField);
      //   await waitFor(() => {
      //     expect(onCellClick.startDate).toHaveBeenCalled();
      //   });
      //   screen.debug();
      // });
    });

    describe('Hour field', () => {
      it('should render start hour field with label', () => {
        const startHourField = screen.getByLabelText('Start hour');
        expect(startHourField).toBeInTheDocument();
        expect(startHourField.id).toBe('Start hour');
      });
      it('should render end hour field with label', () => {
        const endHourField = screen.getByLabelText('End hour');
        expect(endHourField).toBeInTheDocument();
        expect(endHourField.id).toBe('End hour');
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

      it.todo('should set start hour field on click function');
      it.todo('should set end hour field on click function');
      it.todo('should open calendar when using enter key on start date');
      it.todo('should open calendar when using enter key on end date');
    });

    describe('Same day event field', () => {
      it.todo(
        'should render same day checkbox checked if it is same-day event',
      );
      it.todo(
        'should render same day checkbox unchecked if it is multi-day event',
      );
      it.todo(
        'should render input and label connected with correct accessibility properties',
      );
    });
  });
});
