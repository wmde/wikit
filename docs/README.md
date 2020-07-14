# WiKit docs

This package holds the Wikit documentation and tools needed to produce it.

It holds both visualizations of the [design tokens](../tokens) in the system as well as stories showing implemented [vue-components](../vue-components). 

We implemented the documentation using storybook. It gets built for each commit, where it can be used - as part of the UX verification workflow - and published upon merge into the main line, where it serves as canonical documentation of the current state of the Design System.

## How to update or add files under Documentation

The following explains how to edit/add files by only using the GitHub website

 1. Make sure you have writing access to the [WiKit repo](https://github.com/wmde/wikit).
    
 2. Make sure you are on the master branch.
    
 3. Navigate to the file you want to edit or the folder where you want to add a new file `wikit/docs/src/doc/`
    
 4. Make your changes.  
    4.1. For editing: Click on the file you want to edit and then click the pen icon on the right.  
    4.2. For adding a new file: Click on the dropdown menu on the right that says `Add file` and choose `Create new file`. The name of the file has to end in `stories.mdx` or Storybook won't show it. e.g. `introduction.stories.mdx`. The content of the file has to start with
```
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Documentation|UX/introduction" />
```
where `title` contains the structure where your new file will appear, e.g. `Documentation|UX/introduction` will create an introduction subpage under the page `UX` in the `Documentation` section of [WiKit's Storybook](https://wmde.github.io/wikit/)

 5. After you're done with your changes, scroll down to make a commit.  
    5.1. Write a commit message in the header e.g. `Add introduction.stories.mdx`  
    5.2. Select `Create a new branch for this commit and start a pull request.`  
    :warning: If you don't do this you will commit directly to `master`, without opening a PR, which is frowned upon.  
    5.3. Click `Commit changes` (this button can also be named `Propose changes`). This will send you to a page where you create a PR.  
    5.4. Give a title to the PR (if there isn't one prefilled already) and click  `Create pull request`.  
  6. If you want to see how your changes look in Storybook, scroll down to the bottom of your PR and click `Show all checks`. You will see `Storybook published` if your PR passed the tests. You can click on `Details` to open the resulting Storybook.
