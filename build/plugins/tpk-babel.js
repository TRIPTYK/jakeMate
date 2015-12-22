// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(() =>
{
  "use strict";
  let babel = require("babel-core");
  let glob = require("glob");
  let async = require("async");
  let fs = require("fs");
  let path = require('path');
  let mkdirp = require('mkdirp');

  function compileFile(fileName, options, cb)
  {
    babel.transformFile(fileName, options.babelOptions, function(err, result)
    {
      if (err) throw err;
      let destFile = path.join(options.destFolder, fileName.substr(fileName.lastIndexOf(options.srcFolder) + options.srcFolder.length));
      let getDirName = path.dirname(destFile);
      console.log(getDirName);
      mkdirp(getDirName, function(err)
      {
        if (err) console.error(err)
        fs.writeFile(destFile, result.code, 'utf8', cb);
      });


    });
  }

  exports.compileFiles = function(options, success, fail)
  {
    let files = options.files;
    let babelOptions = options;
    glob(files, (err, files) =>
    {
      async.each(files, (item, callback) =>
      {
        compileFile(item, babelOptions, callback);
      }, (err) =>
      {
        if (err) return fail(err);
        success();
      });

    });
  }


}());
