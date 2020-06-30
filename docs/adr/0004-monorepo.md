# 4) Use a monorepo

Date: 2020-06-30

## Status

Accepted

## Context
The Design System consists of two parts - tokens in agnostic format (see [ADR #3](./0003-agnostic-tokens.md)) and Vue components (see [ADR #1](0001-use-a-design-system.md)). The components depend on the tokens in order to consume the design system styles. The tokens are published in a separate package from the components, because they are agnostic, and therefore can be used in a non-vuejs project. The two packages can be kept either together in one repository (monorepo) or in separate repositories. 

### Keeping them in the same repository (monorepo)
:x: Needs documentation to ensure people do not confuse tech-agnostic & tech-specific parts  
:heavy_check_mark: Preview token changes effects on components before releasing a new version

### Keeping them in separate repositories
:x: Cannot easily preview how token changes affect components  
:x: Extra dependency overhead  
:heavy_check_mark: “Clarity” (not confuse concepts)  
:heavy_check_mark: Possible easier navigation for non-development roles

:x: Downside, :heavy_check_mark: Benefit

## Decision
Use a monorepo for tokens and components. Manage the packages using the tool [Lerna](https://lerna.js.org/). 


## Consequences
We can preview how changes in tokens affect the vue components immediately, without having to manually do updates between packages. This is also very important for UX, who have the possibility and responsibility to change tokens.

We need to create documentation which explains boundaries and ensures clarity between non-agnostic and tech-specific parts.

By using [Lerna](https://lerna.js.org/) we get optimized workflow around managing a multi-package repository (monorepo). We deviate from the best practices listed in the [Lerna docs](https://github.com/lerna/lerna#concepts) by creating packages on the root level instead of locating leaf packages under `packages/*`
