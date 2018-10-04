"use strict";

const CsvIt = require("../lib");

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
