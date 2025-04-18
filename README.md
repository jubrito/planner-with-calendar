# Next steps (v1):

Quality

- error handling

  - Wrap components on errorfallback
  - handle errors on components
    - [ ] calendar menu
  - handle errors on functions
    - [x] utils
    - [x] weeks
    - [ ] selectors

- test error handling

Features

- Show current hour of the day on a line on the planner
  Event
- Create event from calendar to plot on planner
- Edit events on click
- Connect events created to specific day
  - How to change days but preserve events? State? Only with bd?
- Display dynamically the hours of the event being created during creation
- If two events happen at the same time, show side by side

// https://www.npmjs.com/package/@fullcalendar/react

# Future Steps:

## v1:

- Accessibility

  > Lighthouse report
  > SEO

- Performance

  > Cache: Check if blocking files (js, css) headers have max-age=0 and must-revalidade
  > Tree shaking
  > CDN: Serve static resources via a CDN:
  > Content Delivery Network is to reduce latency and deliver content to the end user as quickly as possible. They implement multiple strategies for this. The two most important ones for this article are "distributed servers" and "caching."

- Web Hosting

  > Netlify/HottestNewProvider

- Features

  > Day / Week / Month / Year View / Compact (+ tests)

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
