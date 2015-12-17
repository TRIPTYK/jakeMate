// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(() => {
  "use strict";

  let jshint = require("jshint").JSHINT;
  let fs = require("fs");

  exports.lintOneFile = function(fileName) {
    console.log(fileName);
    fs.readFile(fileName,"utf8", function(err, data) {
      if(err) throw err;
      console.log(validateSources(data,{},{},fileName));
    });
  }

  function validateSources(sourceCode, options, globals,name) {
    var pass = jshint(sourceCode, options, globals);
    if (!pass) reportErrors(name);
    return pass;
  }

  function reportErrors(name) {
    // The errors from the last run are stored globally on the jshint object. Yeah.
    name = name ? name + " " : "";
    console.log("\n" + name + "failed");
    console.log(jshint.errors);
  }
}());
