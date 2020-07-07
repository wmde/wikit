# Wikit Tokens

This package holds the Wikit design tokens and tools needed to build them.

## Package organization

We organized the tokens in three categories
* globals
* aliases
* component-level

Each category serves its own purpose.

    ⚠️ TBD

There is one notable conceptual addition to this organization. The global tokens have the highest precedence in our Design System, but some of their values are not originally implemented inside this repository here. Instead, they are "cherry-picked" from WMF variables - you can read more about this topic in [this ADR](../docs/adr/0002-wikimedia-ui-base-variable-reuse.md).

## Looking at the tokens

The tokens can be inspected by looking at the source files in the [`properties` folder](./properties) or the generated token files - in different output formats - in the [`dist` folder](./dist) (requires a build!).

### Demo in storybook

We also added an illustrated version of the tokens to the storybook in the [`docs` folder](../docs).
