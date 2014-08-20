var postNum = 1;
var pageNum = 1;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendReponse) {
		if (request.type == "addPost") {
			if (postNum > 9) {
				pageNum += 1;
				postNum = 1;
				sendReponse({"num": postNum, "load": "forward"})
			} else {
				postNum += 1;
				sendReponse({"num": postNum, "load": "stay"})
			}
		} else if (request.type == "minusPost") {
			if (postNum == 1 && pageNum > 1) {
				pageNum -= 1;
				postNum = 10;
				sendReponse({"num": postNum, "load": "backward"})
			} else if (postNum == 1) {
				sendReponse({"num": postNum, "load": "stay"})
			} else {
				postNum -= 1;
				sendReponse({"num": postNum, "load": "stay"})
			}
		} else if (request.type == "reset") {
			if (postNum == 10 && pageNum == 1) {

			} else {
				postNum = 1;
				pageNum = 1;
			}		
		} else if (request.type == "getNum") {
			sendReponse({"num": postNum})
		}
	}
);