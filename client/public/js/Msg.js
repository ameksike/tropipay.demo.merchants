
var Msg = {

	sendChild : function (id, data, msg){
		msg = msg ? msg : '*';
		const ifr = document.getElementById(id);
		ifr.contentWindow.postMessage(data, msg);	
	},

	sendParent : function (data, msg){
		msg = msg ? msg : '*';
		parent.postMessage(data, msg);	
	},

	listen : function (callback, msg){
		msg = msg ? msg : 'message';
		window.addEventListener(msg, event => { 
			console.log(event); 
			// IMPORTANT: check the origin of the data! 
			if (event.origin.startsWith( window.location.href )) { 
				// The data was sent from your site.
				// Data sent with postMessage is stored in event.data:
				callback(event.data);
			} else {
				// The data was NOT sent from your site! 
				// Be careful! Do not use it. This else branch is
				// here just for clarity, you usually shouldn't need it.
				return; 
			} 
		
		});
		
	}
}