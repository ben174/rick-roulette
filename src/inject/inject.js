chrome.extension.sendMessage({}, function(response) {
    var config = null;

	var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            var configURL = 'https://mn8qel1j6c.execute-api.us-east-1.amazonaws.com/prod/getConfig'
            getJSON(configURL).then(function(data) {
                config = JSON.parse(data);
                // check to see if this page contains a video
                if(document.getElementsByTagName("video").length>0) {
                    // spin the chamber...
                    var pinHit = Math.floor(Math.random() * 6);

                    // fire!
                    if(pinHit != 0) {
                        // click...
                    } else {
                        // BANG!
                        setTimeout(rickRoll, 5000);
                    }
                }
            }, function(status) {
                console.log('Unable to load config for Rick Roulette extension.');
            });
        }
	}, 10);


    var rickRoll = function() {
        document.getElementsByTagName("video")[0].setAttribute("src", config.rick_roll_url);
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
