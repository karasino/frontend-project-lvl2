### Diff generator package
![Node.js CI](https://github.com/karasino/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)
[![Actions Status](https://github.com/karasino/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/karasino/frontend-project-lvl2/actions)
<a href="https://codeclimate.com/github/karasino/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/03a350e1b4dc0141fb64/maintainability" /></a>
<a href="https://codeclimate.com/github/karasino/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/03a350e1b4dc0141fb64/test_coverage" /></a>

## Description:
This package can find difference between two JSON or YAML files and show it in three different formats.
Fomats:
- stylish
```sh
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
- plain
```sh
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
```
- json
```sh
{
  "name": "group2",
  "children": null,
  "depth": 2,
  "status": "deleted",
  "value": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```

## Install:
```sh
$ git clone https://github.com/karasino/frontend-project-lvl2
$ cd frontend-project-lvl2
$ npm link
```

## Run tests:
```sh
$ make test
```

## Show help:
```sh
$ gendiff -h
```

## Usage:
```sh
$ gendiff -f <formatter> <filepath1> <filepath2>
```

## Examples:

Stylish
[![asciicast](https://asciinema.org/a/h8dLtiQUSAN5gwgU0tYeBIs5x.svg)](https://asciinema.org/a/h8dLtiQUSAN5gwgU0tYeBIs5x)

Plain
[![asciicast](https://asciinema.org/a/oxi1HLeSDag4DLR5xcvD49xCZ.svg)](https://asciinema.org/a/oxi1HLeSDag4DLR5xcvD49xCZ)

JSON
[![asciicast](https://asciinema.org/a/ircKOyBek6lk8dgYErkM9pSl7.svg)](https://asciinema.org/a/ircKOyBek6lk8dgYErkM9pSl7)