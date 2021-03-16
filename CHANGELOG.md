# WiKit Changelog

All notable changes to this project (as of v2.0.0 onwards) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

_**Important:** This file contains a draft to the official release notes, and is therefore
not a stable documentation of the upcoming version (as it will frequently change during
development)_

## [Unreleased]

**Expected next version:** 2.0.0

### Added

- This CHANGELOG file
- New Message Component
- Initial version of the Lookup component
- Additional icons to the Icon component
- Additional sizes to the Icon component
- New tokens based on wikimedia-ui-base v 0.18.0
- New Dropdown Component
- Quiet button variant
- Icon only button variant
- New icon color `inherit` reuses the css `color` of the parent for the icon
- Bouncing dots loader tokens file
- New nativeType prop to the Button component
- New Checkbox Component
- New ToggleButton and ToggleButtonGroup components
- Add Popover component
- Added new icon type for new window
- Add new icon type for link
- Add new icon type for additions
- Add new icon type for search
- New Link component
- New Link mixin
- Add BouncingDots Component
- Add QuantityInput component

### Changed

- _**(Breaking)**_ the prop of the Button has been split into two: `type` and `variant`
- _**(Breaking)**_ Icon.json was restructured to include all icon styles and Icon.vue was subsequently updated
- Vue composition API
- Icon component can be imported

### Removed

- _**(Breaking)**_ Width property is removed from all components
- Cursor tokens

### Fixed

- Exports of type declarations
