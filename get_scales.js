const fs = require('fs');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');
const THREE = require('three');
const { JSDOM } = require('jsdom');

// We need a dom environment for GLTFLoader
const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.self = dom.window;
global.Blob = dom.window.Blob;
global.URL = dom.window.URL;

// This is hard to run without a proper environment...
console.log("I'll just ask the user or check manually.");
