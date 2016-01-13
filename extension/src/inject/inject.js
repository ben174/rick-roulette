/*jslint browser: true*/
/*global Promise, chrome*/
"use strict";

chrome.extension.sendMessage({}, function () {
    if (window.location.hostname !== 'www.youtube.com') {
        // youtube only, for now
        return;
    }


    var serverConfig = null,
        localConfig = null,
        currUrl = document.location.href,
        serverConfigURL = '//s3-us-west-1.amazonaws.com/www.rickroulette.com/config.json',
        rollDelay = 5000,

        getServerConfig = function () {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', serverConfigURL, true);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    var status = xhr.status;
                    if (status === 200) {
                        serverConfig = xhr.response;
                        resolve();
                    } else {
                        reject();
                    }
                };
                xhr.send();
            });
        },

        getLocalConfig = function () {
            return new Promise(function (resolve) {
                chrome.storage.sync.get(["chamberCount", "override"], function (data) {
                    localConfig = data;
                    resolve();
                });
            });
        },

        rickRoll = function () {
            var video = document.getElementsByTagName("video")[0]
            video.setAttribute("src", serverConfig.rickRollURL);
            var canvas = document.createElement('canvas');
            canvas.setAttribute("id", "rr-static");
            canvas.setAttribute("style", "position: relative; top: 0px; left: 0px; z-index: 100");
            document.getElementById('player').appendChild(canvas);
            var v = document.getElementsByTagName('video')[0];
            canvas.style.width = v.style.width;
            canvas.style.height = v.style.height;
            console.log("dims");
            console.log(canvas.style.width);
            console.log(canvas.style.height);
            makeStatic(v);
        },

        fireTrigger = function () {
            currUrl = document.location.href;
            // check to see if this page contains a video
            if (document.getElementsByTagName("video").length > 0) {
                // spin the chamber...
                var chamberCount = localConfig.override ? localConfig.chamberCount : serverConfig.chamberCount,
                    pinHit = Math.floor(Math.random() * chamberCount),
                    bulletChamber = Math.floor(Math.random() * chamberCount);

                console.log("Chamber count (server): " + serverConfig.chamberCount);
                console.log("Chamber count (local): " + localConfig.chamberCount);
                console.log("Chamber count: " + chamberCount);
                console.log("Bullet in chamber: " + bulletChamber);
                console.log("Fired a " + pinHit);
                // fire!
                if (pinHit !== bulletChamber) {
                    // click...
                    console.log("Click...");
                } else {
                    // BANG!
                    console.log("BANG!");
                    setTimeout(rickRoll, rollDelay);
                }
            }
        },

        watchUrl = function () {
            if (currUrl !== document.location.href) {
                fireTrigger();
            }
        },

        readyStateCheckInterval = setInterval(function () {
            if (document.readyState === "complete") {
                window.setInterval(watchUrl, 1000);
                clearInterval(readyStateCheckInterval);
                Promise.all([getServerConfig(), getLocalConfig()]).then(fireTrigger);
            }
        }, 10);
});

// borrowed from http://jsfiddle.net/AbdiasSoftware/dEya9/website

var canvas = null,
    ctx = null, 
    video = null;


function makeStatic(v) {
    video = v;
    canvas = document.getElementById('rr-static');
    ctx = canvas.getContext('2d');
    // closer to analouge appearance
    // added toggle to get 30 FPS instead of 60 FPS
    (function loop() {
        toggle = !toggle;
        if (toggle) {
            requestAnimationFrame(loop);
            return;
        }
        noise(ctx);
        requestAnimationFrame(loop);
    })();
}


function noise(ctx) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0;

    for(; i < len;)
        buffer32[i++] = ((255 * Math.random())|0) << 24;
    
    ctx.putImageData(idata, 0, 0);
}

var toggle = true;

