import { Months } from "../../../types/calendar/enums";
import { fifteenMinBlocksInAHour, fifteenMinutes, numberOfHoursInADay, plannerContainerSize, sizeOfEach15MinBlock, sizeOfEachHourBlock } from "../../../utils/calendar/constants";
import { getDateISOString, getFormattedDateString } from "../../../utils/calendar/utils";
import { calculateYPosition } from "./screenPositions";

describe('screenPositions', () => {
    const year = 2025;
    const month = Months.FEBRUARY;
    const day = 11;
    const locale = 'en-US';
    describe('calculateYPosition', () => {
        it('should create event that start on first hour and end on midnight of current day', () => {
            const hour = 0;
            const minute = 0;
            const date = getFormattedDateString(locale, new Date(year, month, day, hour, minute))
            const startDate = date
            const endDate = date
            const yPosition = calculateYPosition(startDate, endDate)
            expect(yPosition).toStrictEqual({startY: 0, endY: plannerContainerSize})
        })
        it('should create event that start on last hour and end on midnight of current day', () => {
            const startHour = numberOfHoursInADay - 1;
            const endHour = 0;
            const minute = 0;
            const startDate = getDateISOString(new Date(year, month, day, startHour, minute))
            const endDate = getDateISOString(new Date(year, month, day, endHour, minute))
            const yPosition = calculateYPosition(startDate, endDate)
            expect(yPosition).toStrictEqual({startY: sizeOfEachHourBlock * startHour, endY: plannerContainerSize})
        })
        it.todo('event hour ending on 24')
        it('should create events with a minimum size of 15 minutes', () => {
            const startHour = 12;
            const endHour = 12;
            const minutes = 0;
            const startDate = getDateISOString(new Date(year, month, day, startHour, minutes))
            const endDate = getDateISOString(new Date(year, month, day, endHour, minutes))
            const yPosition = calculateYPosition(startDate, endDate)
            const startY = sizeOfEachHourBlock * startHour;
            expect(yPosition).toStrictEqual({startY: startY, endY: startY + sizeOfEach15MinBlock})
        })
    })
})