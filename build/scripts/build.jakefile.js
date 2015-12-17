// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(() =>
{
  "use strict";
  //Requirements
  let chalk = require('chalk');
  let jshintConf = require('../config/jshint.conf');
  let jshint = require('../plugins/tpk-jshint');

  desc("Default task to lint test");
  task("default", ["lint"]);

  desc("Task to lint js client and server files");
  task("lint", ["lintClient", "lintServer"]);

  task("lintClient", () =>
  {
    console.log(chalk.bgBlue('############## Linting Client Code ##############'));
    let options = {
      files: 'build/**/*.js',
      options: jshintConf.clientOptions,
      globals : jshintConf.clientGlobals
    };
    jshint.lintFiles(options, complete, fail);
  },
  {
    async: true
  });

  task("lintServer", () =>
  {
    console.log(chalk.bgBlue('############## Linting Server Code ##############'));
  });

}());
