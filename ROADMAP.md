# Roadmap

## arewecompleteyet?

FMark will be "feature complete" when it is possible to write a typical dissertation entirely in fmarkdown.

- [ ] Stable CLI build released & locked down; generates HTML or PDF.
- [ ] Be able to process long files without StackOverflow (tail recursive or incremental processing).
  - Note: With page breaks, could process each "page" individually.
- [ ] Page breaks/page numbering.
- [ ] Table of contents
- [ ] References
- [ ] Tables
- [ ] Labels for figures/images/tables

## Extensions

- [ ] Styling
  - [ ] Easy CSS integration
  - [ ] Fonts
  - [ ] Page styling
- [ ] Formattable $(today) datestamp
- [ ] References
  - [ ] Chicago
  - [ ] Harvard

## Further work

- [ ] Performance/speed test each component (e.g. I have a suspicion our table parsing mechanism could be optimised a lot, but don't know if it's worth it. Let's check which parts are slowly us down the most.)
