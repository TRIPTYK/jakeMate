// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(() => {
  "use strict";

  let jshint = require("jshint").JSHINT;
  let fs = require("fs");
  let merge = require('merge');

  const DEFAULT_OPTIONS = {
    options:{},
    globals:{}
  }
  exports.lintOneFile = function(fileName, userOptions) {
    console.log(fileName);
    let options = merge(userOptions, DEFAULT_OPTIONS.options);
    fs.readFile(fileName, "utf8", function(err, data) {
      if (err) throw err;
      console.log(validateSources(data, options, {}, fileName));
    });
  }

  function validateSources(sourceCode, options, globals, name) {
    var pass = jshint(sourceCode, options, globals);
    if (!pass) reportErrors(name);
    return pass;
  }

  function reportErrors(name) {
    // The errors from the last run are stored globally on the jshint object. Yeah.
    name = name ? name + " " : "";
    console.log("\n" + name + "failed");
    translate(jshint.errors).forEach((errorLine)=>{
      console.error(errorLine);
    });
  }

  function translate(errors) {
    var result = [];

    errors.forEach(function(error) {
      if (error === null) return;
      var evidence = (error.evidence !== undefined) ? ": " + error.evidence.trim() : "";
      var code = (error.code !== undefined) ? " (" + error.code + ")" : "";

      result.push(`line ${error.line} ${evidence}`);
      result.push(`  ${error.reason} ${code}` );
    });
    return result;
  };

})();
