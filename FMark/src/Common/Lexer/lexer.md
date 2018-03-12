# Lexer

## Types

* `type LexerState = Normal | InCodeBlock`: Contains the current lexer state, as the lexer will behave
differently when the lexer is in a code block.

* `type LexerData = {Source: string; State: LexerState}`: Contains the data for the current lexer state
which can take on different states and always contains the current string it is at in the source code.

## Functions

* `(|LexerMatch|_)`: This 

* `nextToken : LexerData -> Token * LexerData`: This function takes in a current lexer state, which
contains the markdown source code and outputs the next token and the left over `LexerData`.

* `tokenize : string -> Token list`: This function takes in the markdown source code and outputs a `Token list`, 
which can then be processed by the parser.
