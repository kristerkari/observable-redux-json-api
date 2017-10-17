const replace = require("replace-in-file");

const options = {
  files: ["lib/*.js"],
  from: /require\("lodash-es\//g,
  to: 'require("lodash/'
};

replace(options);
