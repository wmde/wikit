# WiKit Vue Components

The component implementation of [WiKit](https://github.com/wmde/wikit) in vue

## Installation

## Vue 2

**The library assumes the consuming application uses Vue.js v2.6+.**

#### 1. Install via npm

`npm install @wmde/wikit-vue-components`

#### 2. Import styles

In your style entry point(s), e.g. `_main.scss`, add

`@import '~@wmde/wikit-vue-components/dist/wikit-vue-components.css';`

or in your entry component, e.g `App.vue`, add

`import '@wmde/wikit-vue-components/dist/wikit-vue-components.css';`

#### 3. Import a component

`import { Button } from '@wmde/wikit-vue-components';`

### Vue 3 migration build

There is an experimental build that works with the Vue 3 migration build (`@vue3/compat`).
To use it, change your imports to
`@wmde/wikit-vue-components/dist/wikit-vue-components-vue3compat.common.js`
(or configure `@wmde/wikit-vue-components` to be an alias for that),
then configure your build so that `vue` and `@vue/composition-api` are both aliases for `@vue/compat`.

Keep in mind that this build still uses Vue 2 APIs,
so it is only compatible with the migration build, not with pure Vue 3.

## Development

For instructions on how to contribute to the vue components, please refer to the README.md file in the root folder of this repo or the documentation in the package `docs`.
