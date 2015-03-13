#!/usr/bin/env node

"use strict";

var bunyan = require("bunyan");
var ss = require("stream-splitter");

var lineFormat = /(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2}) /;
var tagFormat = /([\w.]+): /;

var logName = process.argv[2] || "etcd";
var log = bunyan.createLogger({name: logName});

var stream = process.stdin.pipe(ss("\n"));
stream.encoding = "utf8";

stream.on("token", function(line) {
  var preambleMatch = lineFormat.exec(line);
  line = line.substring(preambleMatch[0].length);

  var date = new Date(preambleMatch[1], preambleMatch[2], preambleMatch[3], preambleMatch[4], preambleMatch[5], preambleMatch[6]);

  var tagMatch = tagFormat.exec(line);
  var tag = tagMatch ? tagMatch[1] : undefined;
  if (tagMatch) {
    line = line.substring(tagMatch[0].length);
  }

  log.info({time: date, type: tag}, line);
});
