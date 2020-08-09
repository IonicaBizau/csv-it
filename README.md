<!-- Please do not edit this file. Edit the `blah` field in the `package.json` instead. If in doubt, open an issue. -->


















# csv-it

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/csv-it.svg)](https://www.npmjs.com/package/csv-it) [![Downloads](https://img.shields.io/npm/dt/csv-it.svg)](https://www.npmjs.com/package/csv-it) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

<a href="https://www.buymeacoffee.com/H96WwChMy" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>







> Simple and useful tools to work with CSV files.






### Features


 1. Read all the rows from a file or row by row
 2. Write rows into a file or row by row
 3. The flexibility when creating the files: the directory structure is created (aka `mkdirp`)
 4. Promises, callbacks and streams :rocket:













## :cloud: Installation

```sh
# Using npm
npm install --save csv-it

# Using yarn
yarn add csv-it
```













## :clipboard: Example



```js
const CsvIt = require("csv-it");

// Create a stream into a directory which is going to be created
const testStream = CsvIt.writeAsync(`${__dirname}/csv/some/directory/first.csv`)
testStream.write({ A: 42 , B: 33 })
testStream.write({ A: 7 , B: -1 })
testStream.end()

// Write the rows which are already available
const SECOND_PATH = `${__dirname}/csv/some/directory/second.csv`
CsvIt.write(SECOND_PATH, [
    { A: 42 , B: 33 }
  , { A: 7 , B: -1 }
]).then(() => {
    console.log("Done")
    return CsvIt.read(SECOND_PATH)
}).then(res => {
    console.log(res)
})
```











## :question: Get Help

There are few ways to get help:



 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:





## :memo: Documentation


### `read(file, opts, cb, onData, transformFn)`
Read a CSV file.

#### Params

- **String** `file`: The file path of the CSV file.
- **Object** `opts`: An object containing the following fields:
- **Function** `cb`: The callback function.
- **Function** `onData`: The on data handler. If provided the rows will not be cached in memory.
- **Function** `transformFn`: The transform handler. Use it for async operations.

#### Return
- **Promise** A promise resolving to the csv content.

### `write(file, rows, opts, cb)`
Write the rows in the CSV file.

#### Params

- **String** `file`: The file path of the CSV file.
- **Array** `rows`: The rows to write in the CSV file.
- **Object** `opts`: An object containing the following fields:
  - `headers` (Array|Boolean): The list of headers or enable the headers.
  - other fields passed to the `fast-csv` library
- **Function** `cb`: The callback function.

#### Return
- **Promise** A promise resolving to the csv content.

### `writeAsync(file, rows, opts, cb)`
Create a CSV file stream which you can use to write rows manually.

#### Params

- **String** `file`: The file path of the CSV file.
- **Array** `rows`: The rows to write in the CSV file.
- **Object** `opts`: An object containing the following fields:
    - `headers` (Array|Boolean): The list of headers or enable the headers.
    - `append` (Boolean): Wheater to append the data in the CSV file or override it (default: override)
    - other fields passed to the `fast-csv` library
- **Function** `cb`: The callback function.

#### Return
- **Stream** The CSV stream you can write to. Note you have to end it.














## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects
I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:


 - Starring and sharing the projects you like :rocket:
 - [![Buy me a book][badge_amazon]][amazon]—I love books! I will remember you after years if you buy me one. :grin: :book:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)


Thanks! :heart:
























## :scroll: License

[MIT][license] © [Ionică Bizău][website]






[license]: /LICENSE
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
[badge_patreon]: https://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: https://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: https://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: https://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
