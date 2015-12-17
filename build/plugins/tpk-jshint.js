// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
////////////EXAMPLE OF USE////////////////////////////
// task("lintClient", () =>
// {
//   console.log("lintClient");
//   let options = {
//     fileName: 'build/scripts/build.jakefile.js',
//     options: jshintConf.clientOptions,
//     globals : jshintConf.clientGlobals
//   };
//   jshint.lintOneFile(options, complete, fail);
// },
// {
//   async: true
// });
///////////////////////////////////////////////////////

(() => {
  "use strict";

  let jshint = require("jshint").JSHINT;
  let fs = require("fs");
  let merge = require('merge');

  const DEFAULT_OPTIONS = {
    options:{},
    globals:{}
  }
  exports.lintOneFile = function(lintOptions,success,fail) {
    let fileName = lintOptions.files;
    let argOptions= lintOptions.options;
    let argGlobals = lintOptions.globals
    let options = merge(argOptions, DEFAULT_OPTIONS.options);
    let globals = merge(argGlobals, DEFAULT_OPTIONS.globals);
    fs.readFile(fileName, "utf8", function(err, data) {
      if (err) return fail(err);
      validateSources(data, options, globals, lintOptions.fileName);
      success()
    });
  }

  exports.lintFiles = function(lintOptions,success,fail) {
    console.log(lintOptions);
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
