"use strict";

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: 'js/BrightcoveVideoFinder.es5.js'});
});
