chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            setTimeout('document.getElementsByTagName("video")[0].setAttribute("src", "https://s3-us-west-1.amazonaws.com/rickroulette/rickroll.mp4")', 5000);
        }
	}, 10);
});
