// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(() =>
{
  "use strict";
  let lint = require('sass-lint');
  exports.lintOneFile = function(lintOptions, success, fail)
  {
    try
    {
      var results = lint.lintFiles(lintOptions.files,
      {});
      console.log(lint.format(results));
    }
    catch (e)
    {
      console.log(e);
    }

  };



}());
