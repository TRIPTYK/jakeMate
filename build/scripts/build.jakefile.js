// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(() =>
{
  "use strict";
  //Requirements
  let chalk = require('chalk');
  let jshintConf = require('../config/jshint.conf');
  let jshint = require('../plugins/tpk-jshint');
  let sassLint = require('../plugins/tpk-sass-lint');
  let babel = require('../plugins/tpk-babel');
  let startTime = Date.now();
  desc("Default task to lint test");
  task("default", ["lint"]);

  desc("Task to lint js client and server files");
  task("lint", ["lintClient", "lintServer", "lintScss"]);

  task("lintClient", () =>
  {
    console.log(chalk.bgBlue('############## Linting Client Code ##############'));
    let options = {
      files: 'build/**/*.js',
      options: jshintConf.clientOptions,
      globals: jshintConf.clientGlobals
    };
    jshint.lintFiles(options, complete, fail);
  },
  {
    async: true
  });

  task("lintServer", () =>
  {
    console.log(chalk.bgBlue('############## Linting Server Code ##############'));
    let options = {
      files: 'build/**/*.js',
      options: jshintConf.nodeOptions,
      globals: jshintConf.nodeGlobals
    };
    jshint.lintFiles(options, complete, fail);
  },
  {
    async: true
  });

  task("lintScss", () =>
  {

    console.log(chalk.bgBlue('############## Linting SCSS Code ################'));
    let options = {
      files: 'src/client/sass/**/*.scss',
    };
    sassLint.lintOneFile(options, complete, fail);
  },
  {
    async: true
  });

  desc("Babel files");
  task("babel", ["babel_node"], function(){
    let elapsedSeconds = (Date.now() - startTime) / 1000;
    console.log(chalk.bgRed(`############## BABELING IN  ( ${elapsedSeconds.toFixed(2)} s)) ##############`));
  });

  task("babel_node", () =>
  {
    console.log(chalk.bgBlue('############## Babeling Node files ################'));
    let options ={
        files: 'src/server/**/*.js',
        srcFolder:'src/server/',
        destFolder:'dist/server/',
        babelOptions :{ presets: ['es2015-node4']}
    }
    babel.compileFiles(options, complete, fail);

  },
  {
    async: true
  });

}())
