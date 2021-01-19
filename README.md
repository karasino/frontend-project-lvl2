### Diff generator package
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
- json (data in json format)

## Setup:
```sh
$ make install
```

## Run tests:
```sh
$ make test
```

## Usage:
```sh
$ genDiff -f plain filepath1 filepath2
```