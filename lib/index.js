"use strict";

const csv = require("fast-csv")
    , noop = require("noop6")
    , Streamp = require("streamp")
    , assured = require("assured")
    , fs = require("fs")

class CsvIt {

    /**
     * read
     * Read a CSV file.
     *
     * @name read
     * @function
     * @static
     * @param {String} file The file path of the CSV file.
     * @param {Object} opts An object containing the following fields:
     * @param {Function} cb The callback function.
     * @param {Function} onData The on data handler. If provided the rows will not be cached in memory.
     * @param {Function} transformFn The transform handler. Use it for async operations.
     * @returns {Promise} A promise resolving to the csv content.
     */
    static read (file, opts = {}, cb, onData, transformFn) {

        // read(file, cb)
        if (typeof opts === "function") {
            onData = cb
            cb = opts
            opts = {}
        }

        cb = assured(cb || noop)

        opts = Object.assign({
            sep: ",",
            headers: true
        }, opts)

        const rows = [];
        const stream = fs.createReadStream(file);

        const onDataFn = onData ? onData : data => {
            rows.push(data);
        }

        let csvStream = csv(opts)

        if (transformFn) {
            csvStream = csvStream.transform(transformFn)
        }

        csvStream = csvStream
            .on("data", onDataFn)
            .on("error", cb)
            .on("end", () => {
                cb(null, rows);
            });

        stream.pipe(csvStream);
        return cb._.then(res => {
            CsvIt.verbose && console.log(`Parsed ${file}...`)
            return res
        })
    }

    /**
     * write
     * Write the rows in the CSV file.
     *
     * @name write
     * @function
     * @static
     * @param {String} file The file path of the CSV file.
     * @param {Array} rows The rows to write in the CSV file.
     * @param {Object} opts An object containing the following fields:
     *
     *   - `headers` (Array|Boolean): The list of headers or enable the headers.
     *   - other fields passed to the `fast-csv` library
     *
     * @param {Function} cb The callback function.
     * @returns {Promise} A promise resolving to the csv content.
     */
    static write (file, rows, opts = {}, cb = noop) {

        if (typeof opts === "function") {
            cb = opts
            opts = {}
        }

        cb = assured(cb)
        const stream = CsvIt.writeAsync(file, opts, cb)
        rows.forEach(c => stream.write(c));
        stream.end();
        return cb._
    }

    /**
     * writeAsync
     * Create a CSV file stream which you can use to write rows manually.
     *
     * @name writeAsync
     * @function
     * @static
     * @param {String} file The file path of the CSV file.
     * @param {Array} rows The rows to write in the CSV file.
     * @param {Object} opts An object containing the following fields:
     *
     *     - `headers` (Array|Boolean): The list of headers or enable the headers.
     *     - `append` (Boolean): Wheater to append the data in the CSV file or override it (default: override)
     *     - other fields passed to the `fast-csv` library
     *
     * @param {Function} cb The callback function.
     * @returns {Stream} The CSV stream you can write to. Note you have to end it.
     */
    static writeAsync (file, opts = {}, cb = noop) {

        if (typeof opts === "function") {
            cb = opts
            opts = {}
        }

        const writableStream = new Streamp.writable(file, {
            flags: opts.append ? "a" : ""
        });

        opts = Object.assign({
            headers: true
        }, opts)

        const csvStream = csv.createWriteStream(opts);

        csvStream.pipe(writableStream);
        writableStream.on("finish", () => {
            CsvIt.verbose && console.log(`Written ${file}`);
            cb();
        });

        return csvStream
    }
}

CsvIt.verbose = true

module.exports = CsvIt
