# Changelog

## v0.1.0
- [x] Search for word in GitHub
- [x] Load relevant markdown
- [x] Display markdown in tooltip
- [x] Make tooltip stay in place on scroll

## v0.2.0

- [x] Error message if no content from GitHub
  - [x] Link to Github contribution page
- [x] arrow in the tooltip
- [x] style markdown
  - [x] Better fonts
  - [x] Remove styles inherited from document (thanks @pxgamer)

## v0.3.0

- [x] Comment / document current codebase
- [x] Convert to `fetch` rather than `XMLHttpRequest` (see #4)
- [x] Ensure the tooltip does not disappear when clicking within the tooltip itself but is removed when user clicks outside of the tooltip

## v1.0.0
- [x] Icon for right-click menu bar
- [x] Icon for store

## v.1.0.1
- [x] Screenshots
- [x] Gifs
- [x] Description
- [x] Better README
- [x] Official Web page
- [x] Automatic dark/light theme based in user preferences
- [x] Flip tooltip depending on selection in screen
- [x] Code cleanup
- [x] Improved pipelines

## v1.0.2
### Improvements
- [x] Help popup in extension button
- [x] Code cleanup
- [x] Improved pipelines
- [x] Allow selecting links 

### Bugfixes
- [x] Override styles with `::before` or `::after` selectors

## v1.0.3
### Improvements
- [x] Bumped dependencies versions

### Bugfixes

- [x] Fixed weird bug of positioning when requesting info for a link and later request info for a selection
- [x] Don't allow to create a popup from a selection inside a popup

## v1.1.0
### Improvements
- [x] Bumped dependencies versions
- [x] Spinner while searching for results
- [x] Searching for all sections of pages (android, linux, osx, windows...)
- [x] Copy to clipboard in code examples inside tooltip
- [x] Minimize published JS files && reduce total bundle size pruning unused files

## v1.1.1 (current)
### Bugfixes
- [x] Bumped dependencies versions
- [x] Solved all warnings of Firefox extension and bumped min version for Firefox to 57.0

### Improvements
- [x] Generated bash scripts to generate all extensions for different browsers in `./scripts`
- [x] Generated docs on how to generate the Firefox extension with `.xpi` extension due to publish requirements (also for Edge and Chrome).
- [x] Safer HTML inclusion with [DOMPurify](https://github.com/cure53/DOMPurify).
