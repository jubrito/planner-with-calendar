# Next steps (v1):

- extract components to display inside update events modal
- display calendar as absolute

-------------------- ALL DAY events --------------------

- Add all day events to planner top
- Update Event Creation to consider all day events (& check Event View Details)

-------------------- FEATURES --------------------

- Delete event
- Events side by side
- Move events through drag/drop

// https://www.npmjs.com/package/@fullcalendar/react
// https://calendar.online/

# Future Steps:

## v1:

- Accessibility

  > Keyboard navigation (calendar, button planners, modal)
  > create event on edit mode when clicking on enter on calendar cell
  > buttons of planner should be focusable

  > give focus to planner when clicking on calendar day
  > create 'go back to calendar' with ref of prev cell, focusing it
  > Lighthouse report
  > Modal focus trapping https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
  > SEO
  > allow navigating

- Performance

  > Cache: Check if blocking files (js, css) headers have max-age=0 and must-revalidade
  > Tree shaking
  > CDN: Serve static resources via a CDN:
  > Content Delivery Network is to reduce latency and deliver content to the end user as quickly as possible. They implement multiple strategies for this. The two most important ones for this article are "distributed servers" and "caching."

- Improvements

  > create selectors for initial or current based on received props key
  > event validation (isValidEvent) + test (remove comments from eventscontainer component) -> how to conciliate with validateEventFields?
  > improve error handling
  > create banner that disappears if fails to create event (e.g., event.start is undefined) and don't run event component

- Web Hosting

  > Netlify/HottestNewProvider

- Features

  > If two events happen at the same time, show side by side
  > Day / Week / Month / Year View / Compact (+ tests)
  > Alerts

- Layout

  > Transitions for cool effects
  > Text highlight bg and color
  > Text hover
  > Text searched highlight
  > Responsiveness

  - Adjust resize compact calendar to avoid titles breaking
    > Favicon
    > Scrollbar

- Update README.md
- Husky tool for automatic linting and test run on commit and push.

## v2

- Multiple calendars
- Allow user to edit event colors
- Checklists (+ tests)
- Components
  - Nav
    - Links (Gihub, project functionalities and details, about me?)
    - Header?
- Accessibility
  - Add skip to main content (+ tests)
- Store bd now?

## v3

- Locale
  - Button to change language (+ tests) + html lang
  - Update month names, getFullDateTitle, getHoursOfTheDay, date order (+ tests)
  - Labels/descriptions
- Timezones?
- Duplicate events

## v4

- Calendar Integration

  - Get calendar data from Apple API (+ tests)
  - Add custom events connecting to calendar (+ tests)
  - Integrate new changes with personal calendar (+ tests)

- Custom events and reminders
  - Allow repeating on specific months (e.g: every november) or periods (e.g.: from monthA to monthB every year)
    - Enable for example fertilization reminders

## v5

- Security
  - CORs
- Themes
  - Light/dark/accessible themes
- Pipeline
- Integration tests
- Moons?
