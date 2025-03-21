# Next steps (v1):

- Use compact mixin to change flex display of calendar menu
- Verify accessibility
  - Fix can't see navigation indicators when using opt+ctrl+arrows
  - Add skip to main content (+ tests)

# Future Steps:

## v1:

- Components
  - Nav
    - Links (Gihub, project functionalities and details, about me?)
    - Header?
  - Footer
- Layout
  - Transitions
  - Text highlight bg and color
  - Check responsiveness
- Features
  - Day / Week / Month / Compact (+ tests)
- Update project important information
  - Accessibility requirements
  - Favicon, basic SEO?
  - Update readme with project specifications
- Web Hosting

## v2

- Planner
  - Create weekly planner integrated with calendar (+ tests)
  - Calendar button to click on day and open planner
  - Indicate in the cell that clicking will open planner
- Checklists (+ tests)

## v3

- Locale
  - Button to change language (+ tests)
  - Update month names, getFullDateTitle, date order (+ tests)
- Timezones?

## v4

- Calendar Integration
  - Get calendar data from Apple API (+ tests)
  - Add custom events connecting to calendar (+ tests)
  - Integrate new changes with personal calendar (+ tests)

## v5

- Security
- Add light/dark/accessible themes
- Pipeline
- Integration tests
- Cache for already visited months
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
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
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
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
