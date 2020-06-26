# Approach for reuse of variables from wikimedia-ui-base

Date: 2020-06-26

## Status

accepted

## Context

As part of the larger Wikimedia movement, we want to provide a user experience that is consistent with the other Wikimedia products as much as possible. In order to align the look and feel of our system components accordingly, the best possible option is to make use of [wimedia-ui-base](https://github.com/wikimedia/wikimedia-ui-base), which provides stylesheets with variables containing [Wikimedia Foundation basic user interface style values](https://design.wikimedia.org/style-guide/). We considered different approaches for reuse of these style values and the implications for integration with the design tokens of this design system. 

## Considered Actions

### Directly extend and inherit from wikimedia-ui-base

Inheriting the variables contained in wikimedia-ui-base means that we would allow for them to be used directly as design tokens so that we would only specify the delta between what is inherited and what is needed to build our components.

This approach has the advantage of resulting in smaller token files with no redundant entries. It also directly benefits from any upstream improvements, ideally to a point where all global tokens are inherited, and only Wikibase/Wikidata specific alias tokens and component level tokens would need to be defined in this repository.

The main downside of inheriting wikimedia-ui-base variables as design tokens is the loss of control over the overall token naming scheme and structure. We would either have to make do with a structure that does not fully fit our design system, or implement and maintain filters for variables to be allowed or denied.
 
### Map and cherry-pick variables

The alternative to treating wikimedia-ui-base variables as design tokens is to only use their values as a basis for the global tokens. This means that all tokens are named and structured as intended by the system designer, and there are clear boundaries between the different levels of token specificity: component level tokens are derived from alias tokens, which are derived from global tokens, which are derived from either their corresponding wikimedia-ui-base variable or a concrete value. The structure in the system extending to all tokens alike also allows to organize them into folders, files and within the JSON nesting so that the information _how_ to demo the tokens is embedded into the information itself - without additional, error-prone helper constructs.

Among the disadvantages of this approach is that it results in more boilerplate created by the (sometimes redundant) mapping of variables to tokens. It could also be perceived as a detachment from the WMF styles in that variables added to wikimedia-ui-base don't become available as tokens until they are mapped.

## Decision

We decided to go with the "map and cherry-pick" option. Given that we are in the early stages of trialling our design system, the need for structure and purity of the basis of our design system outweighs the benefits that we expect to get from a closer alignment with wikimedia-ui-base.

## Consequences

Variables contained in wikimedia-ui-base are only referenced as values in the source file containing global tokens. They are actively filtered out during the token build step and will neither be available in any files that are consumed by our components or applications, nor will they be listed alongside the design tokens on a documentation page.

We are aware that this decision prevents a gradual migration to a shared token base, but we expect this decision to be revisited if a future version of wikimedia-ui-base variables can more easily be consolidated with our design system's token structure.
