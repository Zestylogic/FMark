#load "EEExtensions.fs"
#load "Types.fs"
#load "Lexer.fs"

open System
open EEExtensions
open Lexer

tokenize ""

tokenize "It was a _beautiful_ day Today."

tokenize "# This is a *Title*"

tokenize "                            "
