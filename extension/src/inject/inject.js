chrome.extension.sendMessage({}, function(response) {
    var config = null;

	var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            var configURL = '//s3-us-west-1.amazonaws.com/www.rickroulette.com/config.json';
            getJSON(configURL).then(function(config) {
                chrome.storage.sync.get(["chambers","override"], function(data) {
                    // check to see if this page contains a video
                    if(document.getElementsByTagName("video").length>0) {
                        // spin the chamber...
                        var chamberCount = config.chamberCount;
                        if(data.override) {
                            chamberCount = data.chambers;
                        }
                        console.log("Chamber count (server): " + config.chamberCount);
                        console.log("Chamber count (local): " + data.chambers);
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
                });
            }, function(status) {
                console.log('Unable to load config for Rick Roulette extension.');
            });
        }
	}, 10);

    var rickRoll = function() {
        document.getElementsByTagName("video")[0].setAttribute("src", config.rickRollURL);
    };

    var getJSON = function(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(status);
                }
            };
            xhr.send();
        });
    };
});
