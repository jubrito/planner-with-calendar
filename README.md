# Next steps (v1):

- Can't create event from the last hour

  - TODO: hour created on the last block (11-12) gets hour inside endBlock as 0, so the event is not created
  - Fifteen min block is coming -1 (seems ok? all have it)

  - Test

- Create events from back to start
  - Test

Architecture

- Create /utils and /types folder inside features

Improvements

- event validation (isValidEvent) + test
- update current time base on if it is visible or not
- remove old events[]?

Features

- create banner that disappears if fails to create event (e.g., event.start is undefined)
  - don't run event component
- Add all day events to planner top
- Edit event
- Create event button on planner for accessibility
- Delete event

// https://www.npmjs.com/package/@fullcalendar/react

# Future Steps:

## v1:

- Accessibility

  > Keyboard navigation (calendar, button planners, modal)
  > create event on edit mode when clicking on enter on calendar cell
  > buttons of planner should be focusable

  > give focus to planner when clicking on calendar day
  > create 'go back to calendar' with ref of prev cell, focusing it
  > Lighthouse report
  > SEO

- Performance

  > Cache: Check if blocking files (js, css) headers have max-age=0 and must-revalidade
  > Tree shaking
  > CDN: Serve static resources via a CDN:
  > Content Delivery Network is to reduce latency and deliver content to the end user as quickly as possible. They implement multiple strategies for this. The two most important ones for this article are "distributed servers" and "caching."

- Improvements

  > create selectors for initial or current based on received props key

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

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
