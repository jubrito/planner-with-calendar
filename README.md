# Next steps (v1):

- Fix calendar responsiveness (it breaks because of min-width: 485px;)
- Highlight current day of the week or day
- Verify accessibility
- Add skip to main content

# Future Steps:

## v1:

- Update layout
- Add simple nav
- Add simple footer
- Handle basic responsiveness
  [x] Test leap year

## v2

- Day / Week / Month with tasks views
- Click on calendar day and open planner + tests + update title to indicate what clicking it will do
- Implement checklists + tests

## v3

- Add translations (change locale)
- Support changing month names, getFullDateTitle and other stuff when changing translations
- Change date order based on locale
- Timezones?

## v4

- Get calendar data from Apple API + tests
- Add light/dark/accessible themes

## v5

- Pipeline
- Integration tests
- Cache for already visited months

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
