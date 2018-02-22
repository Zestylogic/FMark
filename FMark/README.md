# FMark - Citations and Table of Contents

## Submission Write-up

### How will (or might) your code contribute to the group deliverable? What have you done to ensure interfaces etc will be compatible? What are your interfaces (enough information for your module to be used by someone else not in your team. Assessment here is based on best efforts while allowing independent development, not whether the code is actually useful. Typical length 1/4 page.

* Wrote parsers for headers and footers. `Token list -> ParsedObj list`.
* Types.fs created as a group, which defines `Token` and `ParsedObj`.

### What is the specification of your code? Detail differences from VisUAL (if doing standard project), and reasons for them. Detail any areas where spec was initially unclear and has been clarified. Typical length 1/2 page + Tables.
_Your markdown file can refer to comments in code, or the code itself, for details of normal functionality._

_Your markdown file should contain a precise description of how much functionality has been implemented, and how much tested (tables of features are good for this)._

_A precise specification document would be very long: your document should only detail issues not obvious from the initial spec that needed to be resolved. An example of this for the default project would be where upper/lower case is significant, and where not._

* Headers are indicated with any number of `#` followed by more than one `WHITESPACE`.
* Footers are indicated by `[^1]`, and its cooresponding text will have `[^1]:` before it.
  * Footer within is parsed but taken no action on <- TODO
  * Footer text is parsed as regular text, a new line with 4 `WHITESPACE` can be used to write the text in multiple lines.
  * This text is tupled with its `ID :int`. <- future support for any string instead of just int.

### A short description of your Test Plan. Typical length 1/2 page + tables. What you have tested will be clear from the feature specification which includes test status. How you have tested it must be itemised. Again a table is good (could be the same one as used for specification). Add any rationale for your test plan.

* Header tests
 * Unit tests
 
|Test     |Expected output|Rationale           |
|---      |------         |--------            |
|# H1     |H1, 1          |Basic header        |
|### h3   |h3, 3          |Header depth        |
|#H1      | -             |Not a header without space after hash|
|# H1 # H2|H1 # H2, 1     |Hash in header      |
|text <br># H1<br> text|H1, 1|text before and after header|

* Footer tests
 * Unit tests
 
|Test     |Expected output|Rationale           |
|---      |------         |--------            |
|\[^1]    |1              |Basic footer        |
|\[^1]: text|1, text     |Basic footer text   |
|\[^2]: line0<br>&nbsp;&nbsp;&nbsp;&nbsp;line1<br>line2|2, line0<br>line1|Multiple line footer text|


### Anything notable learnt during testing.
