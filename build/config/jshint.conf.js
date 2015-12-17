// Copyright (c) 2015 TRIPTYK S.P.R.L. All rights reserved.
(() => {
  "use strict";
  var merge = require("merge");

  var universalOptions = {
    bitwise: true,
    curly: false,
    eqeqeq: true,
    forin: true,
    immed: true,
    latedef: false,
    newcap: true,
    noarg: true,
    noempty: true,
    nonew: true,
    regexp: true,
    undef: true,
    strict: true,
    esnext:true,
    globalstrict: true, // "global" stricts are okay when using CommonJS modules
    trailing: true
  };

  exports.nodeOptions = merge(universalOptions, {
    node: true
  });

  exports.clientOptions = merge(universalOptions, {
    browser: true
  });
}());
