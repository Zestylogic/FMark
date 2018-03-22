module RefParseTest
open Types
open RefParse
open Expecto

// maybe write a random test for the dates
let testDataDate =
    [
    "Harvard date1",
    Some (2018,8,3), Harvard,
    [FrmtedString (Literal "[Accessed 3rd August 2018]. ")]

    "Harvard date2",
    Some (2018,31,3), Harvard,
    [FrmtedString (Literal "Access date invalid, please use yyyy-mm-dd")]

    "Chicago date1",
    Some (2018,12,4), Chicago,
    [FrmtedString (Literal "Accessed December 4, 2018. ")]

    ]

let makeDateTest (name,inn,style,out) =
    testCase name <| fun () -> Expect.equal (dateGen style inn) out "Unit test"

[<Tests>]
let dateTests =
    List.map makeDateTest testDataDate
    |> Expecto.Tests.testList "Date generation unit tests"
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// testing single reference parsing
let testDataRefHarvard =
    [
    "Harvard Author only",
    [LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Wang"],
    Harvard,
    (Literal "(Wang)",[FrmtedString (Literal "Wang, "); FrmtedString (Literal "Z. ")]);

    "Harvard Author with multiple given names",
    [LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Eric"; WHITESPACE 1; LITERAL "Wang"],
    Harvard,
    (Literal "(Wang)",[FrmtedString (Literal "Wang, "); FrmtedString (Literal "E. ");
        FrmtedString (Literal "Z. ")]);

    "Harvard Title only",
    [LITERAL "title";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book1"],
    Harvard,
    (Literal "(n.d.)",[FrmtedString (Emphasis [FrmtedString (Literal "Book1. ")])]);

    "Harvard Title with multiple words",
    [LITERAL "title";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book1"; WHITESPACE 1;
        LITERAL "Subtitle"],
    Harvard,
    (Literal "(n.d.)",[FrmtedString (Emphasis [FrmtedString (Literal "Book1 Subtitle. ")])]);

    "Harvard Year only",
    [LITERAL "year";WHITESPACE 1; EQUAL; WHITESPACE 1; NUMBER "2018"],
    Harvard,
    (Literal "(2018)",[FrmtedString (Literal "(2018) ")]);

    "Harvard URL only",
    [LITERAL "url";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "www.example.com"],
    Harvard,
    (Literal "(n.d.)",[FrmtedString (Literal "Available from: ");
        Link (Literal "www.example.com","www.example.com");
        FrmtedString (Literal " ")]);

    "Harvard Access date only",
    [LITERAL "access";WHITESPACE 1; EQUAL; WHITESPACE 1; NUMBER "2018"; MINUS; NUMBER "3";
        MINUS; NUMBER "8"],
    Harvard,
    (Literal "(n.d.)",[FrmtedString (Literal "[Accessed 8th March 2018]. ")]);

    "Harvard Book reference",
    [LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Wang"; COMMA; LITERAL "title"; WHITESPACE 1; EQUAL; WHITESPACE 1;
        LITERAL "Not a real book"; COMMA; LITERAL "year"; WHITESPACE 1; EQUAL; WHITESPACE 1;
        NUMBER "2018"],
    Harvard,
    (
        Literal "(Wang 2018)",
        [FrmtedString (Literal "Wang, "); FrmtedString (Literal "Z. ");
            FrmtedString (Literal "(2018) ");
            FrmtedString (Emphasis [FrmtedString (Literal "Not a real book. ")])]
    )

    "Harvard Website reference",
    [LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Eric"; WHITESPACE 1;
        LITERAL "Wang"; COMMA; LITERAL "title"; WHITESPACE 1; EQUAL; WHITESPACE 1;
        LITERAL "Not a real website"; COMMA; LITERAL "year"; WHITESPACE 1; EQUAL;
        WHITESPACE 1; NUMBER "2017"; COMMA; LITERAL "url"; WHITESPACE 1; EQUAL;
        WHITESPACE 1; LITERAL "www.example.com/website"; COMMA;
        LITERAL "access"; WHITESPACE 1; EQUAL; WHITESPACE 1; NUMBER "2018"; MINUS; NUMBER "2";
        MINUS; NUMBER "4"],
    Harvard,
    (
        Literal "(Wang 2017)",
        [FrmtedString (Literal "Wang, "); FrmtedString (Literal "E. ");
            FrmtedString (Literal "(2017) ");
            FrmtedString (Emphasis [FrmtedString (Literal "Not a real website. ")]);
            FrmtedString (Literal "Available from: ");
            Link (Literal "www.example.com/website","www.example.com/website");
            FrmtedString (Literal " "); FrmtedString (Literal "[Accessed 4th February 2018]. ")]
    )

    ]

let testDataRefChicago =
    [
    "Chicago Author only",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book"; COMMA;
        LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Wang"],
    Chicago,
    (Literal "(Wang)",[FrmtedString (Literal "Zifan Wang. ")]);

    "Chicago Author with multiple given names",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book"; COMMA;
        LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Eric"; WHITESPACE 1; LITERAL "Wang"],
    Chicago,
    (Literal "(Wang)",[FrmtedString (Literal "Zifan Eric Wang. ")]);

    "Chicago Title only",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book"; COMMA;
        LITERAL "title";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book1"],
    Chicago,
    (Literal "(n.d.)",[FrmtedString (Emphasis [FrmtedString (Literal "Book1. ")])]);

    "Chicago Title with multiple words",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book"; COMMA;
        LITERAL "title";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book1"; WHITESPACE 1;
        LITERAL "Subtitle"],
    Chicago,
    (Literal "(n.d.)",[FrmtedString (Emphasis [FrmtedString (Literal "Book1 Subtitle. ")])]);

    "Chicago Year only",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book"; COMMA;
        LITERAL "year";WHITESPACE 1; EQUAL; WHITESPACE 1; NUMBER "2018"],
    Chicago,
    (Literal "(2018)",[FrmtedString (Literal "2018. ")]);

    "Chicago URL only",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Website"; COMMA;
        LITERAL "url";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "www.example.com"],
    Chicago,
    (Literal "(n.d.)",[Link (Literal "www.example.com","www.example.com")]);

    "Chicago Access date only",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Website"; COMMA;
        LITERAL "access";WHITESPACE 1; EQUAL; WHITESPACE 1; NUMBER "2018"; MINUS; NUMBER "8";
        MINUS; NUMBER "8"],
    Chicago,
    (Literal "(n.d.)",[FrmtedString (Literal "Accessed August 8, 2018. ")]);

    "Chicago Book reference",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Book"; COMMA;
        LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Zifan"; WHITESPACE 1;
        LITERAL "Wang"; COMMA; LITERAL "title"; WHITESPACE 1; EQUAL; WHITESPACE 1;
        LITERAL "Not a real book"; COMMA; LITERAL "year"; WHITESPACE 1; EQUAL; WHITESPACE 1;
        NUMBER "2018"],
    Chicago,
    (
        Literal "(Wang, 2018)",
        [FrmtedString (Literal "Zifan Wang. "); FrmtedString (Literal "2018. ");
            FrmtedString (Emphasis [FrmtedString (Literal "Not a real book. ")])]
    );

    "Chicago Website reference",
    [LITERAL "type";WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Website"; COMMA;
        LITERAL "author"; WHITESPACE 1; EQUAL; WHITESPACE 1; LITERAL "Eric"; WHITESPACE 1;
        LITERAL "Wang"; COMMA; LITERAL "title"; WHITESPACE 1; EQUAL; WHITESPACE 1;
        LITERAL "Not a real website"; COMMA; LITERAL "year"; WHITESPACE 1; EQUAL;
        WHITESPACE 1; NUMBER "2017"; COMMA; LITERAL "url"; WHITESPACE 1; EQUAL;
        WHITESPACE 1; LITERAL "www.example.com/website"; COMMA;
        LITERAL "access"; WHITESPACE 1; EQUAL; WHITESPACE 1; NUMBER "2018"; MINUS; NUMBER "3";
        MINUS; NUMBER "4"],
    Chicago,
    (
        Literal "(Wang, 2017)",
        [FrmtedString (Literal "Eric Wang. "); FrmtedString (Literal "2017. ");
            FrmtedString (Literal "\"Not a real website.\" ");
            FrmtedString (Literal "Accessed March 4, 2018. ");
            Link (Literal "www.example.com/website","www.example.com/website")]
    )

    ]


let testDataRef = List.append testDataRefHarvard testDataRefChicago
let makeRefTest (name,inn,frmt,out) =
    testCase name <| fun () -> Expect.equal (refParser frmt inn) out "Unit test"

[<Tests>]
let refTests =
    List.map makeRefTest testDataRef
    |> Expecto.Tests.testList "Specific reference unit tests"