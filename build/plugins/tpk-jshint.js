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

(() =>
{
  "use strict";

  let jshint = require("jshint")
    .JSHINT;
  let fs = require("fs");
  let merge = require('merge');
  let glob = require('glob');
  let async = require('async');
  const DEFAULT_OPTIONS = {
    options:
    {},
    globals:
    {}
  };

  function lintFile(lintOptions, cb)
  {
    let fileName = lintOptions.files;
    let argOptions = lintOptions.options;
    let argGlobals = lintOptions.globals;
    let options = merge(argOptions, DEFAULT_OPTIONS.options);
    let globals = merge(argGlobals, DEFAULT_OPTIONS.globals);
    fs.readFile(fileName, "utf8", function(err, data)
    {
      if (err) return fail(err);
      validateSources(data, options, globals, fileName);
      cb();
    });
  }
  exports.lintOneFile = function(lintOptions, success, fail)
  {
    lintFile(lintOptions, success);
  };

  exports.lintFiles = function(lintOptions, success, fail)
  {
    glob(lintOptions.files, (err, files) =>
    {
      async.each(files, (item, callback) =>
      {
        let options = {};
        options.files = item;
        options.options = lintOptions.options;
        options.globals = lintOptions.globals;
        lintFile(options, callback);
      }, (err) =>
      {
        if (err) return fail(err);
        success();
      });
    });
  };

  function validateSources(sourceCode, options, globals, name)
  {
    var pass = jshint(sourceCode, options, globals);
    if (!pass) reportErrors(name);
    return pass;
  }

  function reportErrors(name)
  {
    // The errors from the last run are stored globally on the jshint object. Yeah.
    name = name ? name + " " : "";
    console.log("\n" + name + "failed");
    translate(jshint.errors)
      .forEach((errorLine) =>
      {
        console.error(errorLine);
      });
  }

  function translate(errors)
  {
    var result = [];

    errors.forEach(function(error)
    {
      if (error === null) return;
      var evidence = (error.evidence !== undefined) ? ": " + error.evidence.trim() : "";
      var code = (error.code !== undefined) ? " (" + error.code + ")" : "";

      result.push(`line ${error.line} ${evidence}`);
      result.push(`  ${error.reason} ${code}`);
    });
    return result;
  }

})();
