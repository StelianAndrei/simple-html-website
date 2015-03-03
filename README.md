# Simple HTML Website

This is a simple HTML starting point for plain and simple HTML website, with no backend or database power. Just dump and plain HTML (and JavaScript, if required).

The building process is automated using Gulp (read below for the available Gulp tasks). Things are made easier by using *gulp-file-include* (rudimentary template structure of some sort). The CSS is created using *LESS*. 

A simple structure is already set in place to get an idea of the location for the files. If these default locations are changed, remember to change them in *gulpfile.js* so they are properly generated.

## Installing
You have to run

```
npm install && bower install
```

to jump-start the project. This will install all the required dependencies.

## Gulp tasks

**gulp** or **gulp default** will run a local server and watch for local changes on the files

**gulp build** will generate the files required for deployment

## Dependencies

Twitter Bootstrap and implicitly jQuery are installed as default dependencies. The initial HTML files are based on the syntax that Bootstrap supports, but these can be removed or modified as needed.