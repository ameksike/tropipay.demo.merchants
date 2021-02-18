
var getIframeDoc = function(id){
	const ifr_doc = document.getElementById(id);
	return ifr_doc.contentWindow.document || ifr_doc.contentDocument;  
}

var loadContent= function (url, authToken, ifrm_auth) {
	
	const iframe = getIframeDoc(ifrm_auth);  
    const headers = {'Authorization':'Basic '+ authToken};

	axios.get(url, { headers })
		.then(response => {
			iframe.body.innerHTML = response.data;
		})
		.catch(error => {
			console.log(error);
		});
}


