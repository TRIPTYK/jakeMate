// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(()=>{
  "use strict";

  let jshint = require("jshint").JSHINT;
  let fs = require("fs");

  exports.lintOneFile = function (Objet1){
    console.log(Objet1);
    fs.readFile(Objet1, function(err, data){
      validateSources(data);
    });
  }

  function validateSources(sourceCode, options, globals){
    var pass = jshint(sourceCode, options, globals);
    console.log(pass.data());
		// if (!pass) reportErrors(name);
		// return pass;
  }
}());
