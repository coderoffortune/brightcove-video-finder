"use strict";

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: 'js/BrightcoveVideoIdFinder.es5.js'});
});
