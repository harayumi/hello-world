function ddloader(info, tab) {
   chrome.tabs.sendMessage(tab.id, { command: "ddloader" }, function (r) {

       var url = r && r.ddloader || "";
       if ( url ) {
			var dt = new Date();
			var y = dt.getFullYear();
			var m = '00' + (dt.getMonth()+1);
			var d = '00' + dt.getDate();
			var now = y+m.slice(-2)+d.slice(-2);
           chrome.downloads.download({ url: url, filename: "ddloader_" + now + ".csv"});
       }

   });
}

function ddcapture(info, tab) {
	chrome.windows.getCurrent(function(w){
		chrome.tabs.captureVisibleTab(w.id,{format:'png'},function(url){
//			console.log(url);
			//captureを画面に送る
			if ( url ) {
				var dt = new Date();
				var y = dt.getFullYear();
				var m = '00' + (dt.getMonth()+1);
				var d = '00' + dt.getDate();
				var now = y+m.slice(-2)+d.slice(-2);
	           chrome.downloads.download({ url: url, filename: "ddcapture_" + now + ".png"});
    	   }
		});
	});
}

var cm = chrome.contextMenus.create({
    type: "normal",
    title: "TableData Download",
    contexts: [ "all" ],
    onclick: ddloader
});
var cm2 = chrome.contextMenus.create({
    type: "normal",
    title: "Desktop Capture",
    contexts: [ "all" ],
    onclick: ddcapture
});

console.log(cm);
