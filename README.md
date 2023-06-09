# Markup Parser

This parser can be used to evaluate if a paragraph of text written in basic markup is correctly tagged.

## Markup Rules

- An opening tag is represented by enclosed angle brackets and contains exactly one uppercase letter, e.g., `<B>`, `<A>`, `<S>`.
- A corresponding closing tag will be the same letter preceded by the symbol `/`, e.g., `</B>`, `</A>`, `</S>`.

## Functionality

This program can be used to check that all the tags in a given paragraph of text are correctly nested, and there are no missing or extra tags.

If a paragraph is correctly tagged, the program will output the line:

`Correctly tagged paragraph`

If a paragraph is incorrectly tagged the program with output a line in the form:

`Expected <expected> found <found>`

## Project Setup

Follow the steps below to set up and run the project:

1. Download the code using the following command:

   ```javascript
    git clone <repository-url>
   ```

2. Install the dependencies using the following command:

   ```javascript
    yarn install
   ```

3. Run the code using the following command:

   ```javascript
       yarn run dev
   ```

4. Run the tests using the following command:

   ```javascript
       yarn test
   ```

5. To run the debugger in VSCode, first open a JavaScript Debug Terminal, and then run the following command:

   ```javascript
         yarn run dev:debug
   ```

## The dangers of parsing more complex markup languages with regex

[You can't parse HTML with regex](https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags)
