import { Months } from "../../../types/calendar/enums";
import { plannerContainerSize } from "../../../utils/calendar/constants";
import { getFormattedDateString } from "../../../utils/calendar/utils";
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
    })
})