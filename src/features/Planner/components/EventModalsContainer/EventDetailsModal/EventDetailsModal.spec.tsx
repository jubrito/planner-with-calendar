import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { EventDetailsModal } from './EventDetailsModal';
import { Months } from '../../../../../types/calendar/enums';
import {
  EventStored,
  SelectedEventOnDayView,
} from '../../../../../types/event';
import { renderWithProviders } from '../../../../../utils/tests/renderWithProviders';
import { initialValue as initialEventValue } from '../../../../../redux/slices/eventSlice';
import { initialValue as initialLocaleValue } from '../../../../../redux/slices/localeSlice';
import {
  get2DigitsValue,
  getDateISOString,
} from '../../../../../utils/calendar/utils';

describe('EventDetailsModal', () => {
  const eventTitle = 'title';
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 11;
  const startHour = 1;
  const startMinutes = 59;
  const endHour = 11;
  const endMinutes = 59;
  const weekDay = 'Tue';
  const weekDayPtBr = 'Ter';
  const startMonthName = 'Feb';
  const startMonthNamePtBr = 'Fev';
  const endMonthName = 'Dec';
  const endMonthNamePtBr = 'Dez';
  const endYear = 2026;
  const endMonth = Months.DECEMBER;
  const endDay = 31;
  const startDate = getDateISOString(
    new Date(year, month, day, startHour, startMinutes),
  );
  const endDate = getDateISOString(
    new Date(year, month, day, endHour, endMinutes),
  );
  const startPeriod = 'AM';
  const endPeriod = 'PM';
  const closeModalMock = jest.fn();
  const editModalMock = jest.fn();
  const refMock = { current: null };
  type RenderEventDetailsModalProps = {
    renderWith24hTimeSystem?: boolean;
    event?: EventStored;
    top?: number;
  };

  const renderEventDetailsModal = ({
    event,
    top,
    renderWith24hTimeSystem = false,
  }: RenderEventDetailsModalProps) => {
    const selectedDayViewEvent = {
      event: event ?? initialSelectedEvent.event,
      top: top ?? initialSelectedEvent.top,
    };
    return renderWithProviders(
      <EventDetailsModal
        closeModal={closeModalMock}
        viewEventModalRef={refMock}
        editModal={editModalMock}
      />,
      {
        preloadedState: {
          eventSlice: {
            ...initialEventValue,
            currentState: {
              ...initialEventValue.currentState,
              selectedDayViewEvent,
            },
          },
          localeSlice: {
            ...initialLocaleValue,
            currentState: {
              ...initialLocaleValue.currentState,
              locale: {
                lang: renderWith24hTimeSystem ? 'pt-BR' : 'en-US',
              },
            },
          },
        },
      },
    );
  };

  const initialSelectedEvent: SelectedEventOnDayView = {
    event: {
      endDate,
      startDate,
      id: 'id',
      title: eventTitle,
    },
    top: 0,
  };

  it('should render event details modal title', () => {
    renderEventDetailsModal({});
    expect(screen.getByText(eventTitle)).toBeInTheDocument();
  });

  const getTime = ({
    start,
    end,
  }: {
    start?: { hourDate: Date; minutesDate: Date };
    end?: { hourDate: Date; minutesDate: Date };
  }) => {
    let startBlock = {
      hourDate: new Date(startDate),
      minutesDate: new Date(startDate),
    };
    let endBlock = {
      hourDate: new Date(endDate),
      minutesDate: new Date(endDate),
    };
    if (start && end) {
      startBlock = start;
      endBlock = end;
    }
    const startTime = `${get2DigitsValue(startBlock.hourDate.getHours())}:${get2DigitsValue(startBlock.minutesDate.getMinutes())}`;
    const endTime = `${get2DigitsValue(endBlock.hourDate.getHours())}:${get2DigitsValue(endBlock.minutesDate.getMinutes())}`;
    return { startTime, endTime };
  };

  describe('When is 12-hour time system', () => {
    describe('When is same day event', () => {
      it('should render modal with same day event within same period', () => {
        renderEventDetailsModal({});
        const date = `${weekDay}, ${startMonthName} ${day}`;
        const { startTime, endTime } = getTime({});
        const time = `${startTime} – ${endTime} ${startPeriod}`;
        const title = `Event on ${date} ${time}`;
        const timeElement = screen.getByText(time);
        const dateElement = screen.getByText(date);
        const titleElement = timeElement.parentElement;

        expect(titleElement).toHaveProperty('title', title);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveAttribute('aria-hidden', 'true');
        expect(dateElement).toBeInTheDocument();
        expect(dateElement).toHaveAttribute('aria-hidden', 'true');
      });
      it('should render modal with same day event within different periods', () => {
        const updatedEndHour = 12;
        const updatedEndMinutes = 0;
        const updatedEndDate = getDateISOString(
          new Date(year, month, day, updatedEndHour, updatedEndMinutes),
        );
        const updatedEvent = {
          dayViewPosition: {
            endY: 0,
            startY: 0,
          },
          id: 'id',
          title: eventTitle,
          startDate,
          endDate: updatedEndDate,
        };
        renderEventDetailsModal({ event: updatedEvent });
        const date = `${weekDay}, ${startMonthName} ${day}`;
        const { startTime, endTime } = getTime({
          start: {
            hourDate: new Date(startDate),
            minutesDate: new Date(startDate),
          },
          end: {
            hourDate: new Date(updatedEndDate),
            minutesDate: new Date(updatedEndDate),
          },
        });
        const time = `${startTime} ${startPeriod} – ${endTime} ${endPeriod}`;
        const timeWrapperElement = screen.getByText(time);
        const dateWrapperElement = screen.getByText(date);
        expect(timeWrapperElement).toBeInTheDocument();
        expect(dateWrapperElement).toBeInTheDocument();
      });
    });
    describe('When is multi day event', () => {
      it('should render modal with multi day event within same year', () => {
        const updatedEndHour = 12;
        const updatedEndMinutes = 0;
        const updatedEndDate = getDateISOString(
          new Date(year, endMonth, endDay, updatedEndHour, updatedEndMinutes),
        );
        const updatedEvent = {
          dayViewPosition: {
            endY: 0,
            startY: 0,
          },
          id: 'id',
          title: eventTitle,
          startDate,
          endDate: updatedEndDate,
        };
        renderEventDetailsModal({ event: updatedEvent });
        const separator = '–';
        const startTime = `${get2DigitsValue(new Date(startDate).getHours())}:${get2DigitsValue(new Date(startDate).getMinutes())}`;
        const endTime = `${get2DigitsValue(new Date(updatedEndDate).getHours())}:${get2DigitsValue(new Date(updatedEndDate).getMinutes())}`;
        const startFullDate = `${startMonthName} ${day}, ${startTime} ${startPeriod}`;
        const endFullDate = `${endMonthName} ${endDay}, ${endTime} ${endPeriod}`;
        const fullTime = `${startFullDate} ${separator} ${endFullDate}`;
        const timeElement = screen.getByText(fullTime);
        const title = `Event from ${startFullDate} to ${endFullDate}`;
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveProperty('title', title);
      });
      it('should render modal with multi day event within different years', () => {
        const endHourIn12HourSystem = 11;
        const updatedEndHour = 23;
        const updatedEndMinutes = 59;
        const updatedEndDate = getDateISOString(
          new Date(
            endYear,
            endMonth,
            endDay,
            updatedEndHour,
            updatedEndMinutes,
          ),
        );
        const updatedEvent = {
          dayViewPosition: {
            endY: 0,
            startY: 0,
          },
          id: 'id',
          title: eventTitle,
          startDate,
          endDate: updatedEndDate,
        };
        renderEventDetailsModal({ event: updatedEvent });
        const separator = '–';
        const startTime = `${get2DigitsValue(new Date(startDate).getHours())}:${get2DigitsValue(new Date(startDate).getMinutes())}`;
        const endTime = `${endHourIn12HourSystem}:${get2DigitsValue(new Date(updatedEndDate).getMinutes())}`;
        const startFullDate = `${startMonthName} ${day}, ${year}, ${startTime} ${startPeriod}`;
        const endFullDate = `${endMonthName} ${endDay}, ${endYear}, ${endTime} ${endPeriod}`;
        const fullTime = `${startFullDate} ${separator} ${endFullDate}`;
        const timeElement = screen.getByText(fullTime);
        const title = `Event from ${startFullDate} to ${endFullDate}`;
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveProperty('title', title);
      });
    });
  });
  describe('When is 24-hour time system', () => {
    describe('When is same day event', () => {
      it('should render modal with same day event within same period', () => {
        renderEventDetailsModal({ renderWith24hTimeSystem: true });
        const date = `${weekDayPtBr}, ${startMonthNamePtBr} ${day}`;
        const { startTime, endTime } = getTime({});
        const time = `${startTime} – ${endTime}`;
        const timeWrapperElement = screen.getByText(time);
        const dateWrapperElement = screen.getByText(date);
        expect(timeWrapperElement).toBeInTheDocument();
        expect(dateWrapperElement).toBeInTheDocument();
      });
      it('should render modal with same day event within different periods', () => {
        const updatedEndHour = 12;
        const updatedEndMinutes = 0;
        const updatedEndDate = getDateISOString(
          new Date(year, month, day, updatedEndHour, updatedEndMinutes),
        );
        const date = `${weekDayPtBr}, ${startMonthNamePtBr} ${day}`;
        const updatedEvent = {
          dayViewPosition: {
            endY: 0,
            startY: 0,
          },
          id: 'id',
          title: eventTitle,
          startDate,
          endDate: updatedEndDate,
        };
        renderEventDetailsModal({
          event: updatedEvent,
          renderWith24hTimeSystem: true,
        });
        const { startTime, endTime } = getTime({
          start: {
            hourDate: new Date(startDate),
            minutesDate: new Date(startDate),
          },
          end: {
            hourDate: new Date(updatedEndDate),
            minutesDate: new Date(updatedEndDate),
          },
        });
        const time = `${startTime} – ${endTime}`;
        const timeWrapperElement = screen.getByText(time);
        const dateWrapperElement = screen.getByText(date);
        expect(timeWrapperElement).toBeInTheDocument();
        expect(dateWrapperElement).toBeInTheDocument();
      });
    });
    describe('When is multi day event', () => {
      it('should render modal with multi day event within same year', () => {
        const updatedEndHour = 12;
        const updatedEndMinutes = 0;
        const updatedEndDate = getDateISOString(
          new Date(year, endMonth, endDay, updatedEndHour, updatedEndMinutes),
        );
        const updatedEvent = {
          dayViewPosition: {
            endY: 0,
            startY: 0,
          },
          id: 'id',
          title: eventTitle,
          startDate,
          endDate: updatedEndDate,
        };
        renderEventDetailsModal({
          event: updatedEvent,
          renderWith24hTimeSystem: true,
        });
        const separator = '–';
        const startTime = `${get2DigitsValue(new Date(startDate).getHours())}:${get2DigitsValue(new Date(startDate).getMinutes())}`;
        const endTime = `${get2DigitsValue(new Date(updatedEndDate).getHours())}:${get2DigitsValue(new Date(updatedEndDate).getMinutes())}`;
        const startFullDate = `${startMonthNamePtBr} ${day}, ${startTime}`;
        const endFullDate = `${endMonthNamePtBr} ${endDay}, ${endTime}`;
        const fullTime = `${startFullDate} ${separator} ${endFullDate}`;
        const timeElement = screen.getByText(fullTime);
        const title = `Event from ${startFullDate} to ${endFullDate}`;
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveProperty('title', title);
      });
      it('should render modal with multi day event within different years', () => {
        const updatedEndHour = 23;
        const updatedEndMinutes = 59;
        const updatedEndDate = getDateISOString(
          new Date(
            endYear,
            endMonth,
            endDay,
            updatedEndHour,
            updatedEndMinutes,
          ),
        );
        const updatedEvent = {
          dayViewPosition: {
            endY: 0,
            startY: 0,
          },
          id: 'id',
          title: eventTitle,
          startDate,
          endDate: updatedEndDate,
        };
        renderEventDetailsModal({
          event: updatedEvent,
          renderWith24hTimeSystem: true,
        });
        const separator = '–';
        const startTime = `${get2DigitsValue(new Date(startDate).getHours())}:${get2DigitsValue(new Date(startDate).getMinutes())}`;
        const endTime = `${get2DigitsValue(new Date(updatedEndDate).getHours())}:${updatedEndMinutes}`;
        const startFullDate = `${startMonthNamePtBr} ${day}, ${year}, ${startTime}`;
        const endFullDate = `${endMonthNamePtBr} ${endDay}, ${endYear}, ${endTime}`;
        const fullTime = `${startFullDate} ${separator} ${endFullDate}`;
        const timeElement = screen.getByText(fullTime);
        const title = `Event from ${startFullDate} to ${endFullDate}`;
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveProperty('title', title);
      });
    });
  });
});
