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
- New tokens based on wikimedia-ui-base v 0.18.0
- New Dropdown Component
- New "clear" Icon type
- Additional icon called edit
- New icon called trash
- New info-outline Icon type
- Quiet button variant
- New icon color `inherit` reuses the css `color` of the parent for the icon

### Changed
- _**(Breaking)**_ the prop of the Button has been split into two: `type` and `variant`

### Removed

- _**(Breaking)**_ Width property is removed from all components
- Cursor tokens

### Fixed

- Exports of type declerations
