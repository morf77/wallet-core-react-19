// import { promisify } from "util";
// import * as BrowserFS from "browserfs";

// const BrowserFS = require()

const util = require('util')

const BrowserFS = require('browserfs');


console.log("Initializing BrowserFS...");

// Initialize BrowserFS
BrowserFS.configure({ fs: "InMemory",options:{} }, (err) => {
  if (err) console.error("Failed to initialize BrowserFS:", err);
});



const fs = BrowserFS.BFSRequire("fs");

const fsPromises = {
  readFile: util.promisify(fs.readFile),
  writeFile: util.promisify(fs.writeFile),
  unlink: util.promisify(fs.unlink),
  readdir: util.promisify(fs.readdir),
  mkdir: util.promisify(fs.mkdir),
  rmdir: util.promisify(fs.rmdir),
  stat: util.promisify(fs.stat),
};




module.exports = fsPromises;
