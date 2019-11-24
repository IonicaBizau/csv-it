## Documentation

You can see below the API reference of this module.

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

