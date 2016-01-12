chrome.extension.sendMessage({}, function(response) {
    var serverConfig = null;
    var localConfig = null;
    var serverConfigURL = '//s3-us-west-1.amazonaws.com/www.rickroulette.com/config.json';

	var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            Promise.all([getServerConfig(), getLocalConfig()]).then(fireTrigger);
        }
	}, 10);

    var rickRoll = function() {
        document.getElementsByTagName("video")[0].setAttribute("src", serverConfig.rickRollURL);
    };

    var fireTrigger = function() {
        // check to see if this page contains a video
        if(document.getElementsByTagName("video").length>0) {
            // spin the chamber...
            var chamberCount = serverConfig.chamberCount;
            if(localConfig.override) {
                chamberCount = localConfig.chamberCount;
            }
            console.log("Chamber count (server): " + serverConfig.chamberCount);
            console.log("Chamber count (local): " + localConfig.chamberCount);
            console.log("Chamber count: " + chamberCount);
            var pinHit = Math.floor(Math.random() * chamberCount);
            console.log("Fired a " + pinHit);
            // fire!
            if(pinHit != 0) {
                // click...
            } else {
                // BANG!
                setTimeout(rickRoll, 5000);
            }
        }
    }

    var getServerConfig = function() {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', serverConfigURL, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    serverConfig = xhr.response;
                    resolve();
                } else {
                    reject();
                }
            };
            xhr.send();
        });
    };
    var getLocalConfig = function() {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.get(["chamberCount","override"], function(data) {
                localConfig = data;
                resolve();
            });
        });
    }

});
