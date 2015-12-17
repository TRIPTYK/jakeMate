// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(()=>{
  "use strict";
  //Requirements
  let jshintConf = require('../config/jshint.conf');
  let jshint = require('../plugins/tpk-jshint');

  desc("Default task to lint test");
  task("default", ["lint"]);

  desc("Task to lint js client and server files");
  task("lint", ["lintClient", "lintServer"]);

  task("lintClient", ()=>{
    jshint.lintOneFile('build/scripts/build.jakefile.js', jshintConf.nodeOptions);
  });

  task("lintServer", ()=>{

  });

}());
