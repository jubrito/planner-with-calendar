import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateField } from './DateField';
import userEvent from '@testing-library/user-event';
import { Months } from '../../../../../../types/calendar/enums';
import { getDateISOString } from '../../../../../../utils/calendar/utils';
import { renderWithProviders } from '../../../../../../utils/tests/renderWithProviders';

describe('DateField', () => {
  const label = {
    dateField: 'startDateLabel',
    hourField: 'startHourLabel',
  };
  const value = {
    dateField: '0',
    hourField: 1,
  };
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
  let rerenderDateField: (ui: React.ReactNode) => void;

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

      // it('should render date field with aria error message', () => {
      //   const dateField = screen.getByLabelText('Start date');
      //   expect(dateField).toHaveAttribute('aria-errormessage', errorMessage);
      // });
      // it('should call date field on click function', async () => {
      //   const dateField = screen.getByLabelText('Start date');
      //   await userEvent.click(dateField);
      //   expect(onCellClick.startDate).toHaveBeenCalled();
      // });
    });

    // describe('Hour field', () => {
    //   it('should render hour field with label', () => {
    //     const hourField = screen.getByLabelText(label.hourField);
    //     expect(hourField).toBeInTheDocument();
    //     expect(hourField.id).toBe(label.hourField);
    //   });
    //   it('should render hour field as input', () => {
    //     const hourField = screen.getByRole('textbox', { name: label.hourField });
    //     expect(hourField).toBeInTheDocument();
    //   });
    //   it('should render hour field with read only properties as true', () => {
    //     const hourField = screen.getByLabelText(label.hourField);
    //     expect(hourField).toHaveAttribute('readonly');
    //     expect(hourField).toHaveAttribute('aria-readonly', 'true');
    //   });
    //   it('should render hour field with aria error message', () => {
    //     const hourField = screen.getByLabelText(label.hourField);
    //     expect(hourField).toHaveAttribute('aria-errormessage', errorMessage);
    //   });
    //   it('should call hour field on click function', async () => {
    //     const hourField = screen.getByLabelText(label.hourField);
    //     await userEvent.click(hourField);
    //     expect(onClick.hourField).toHaveBeenCalled();
    //   });
    // });
  });
});
