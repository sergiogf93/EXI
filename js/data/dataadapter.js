function DataAdapter(args) {
	this.async = true;
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
	
	if (args != null) {
		if (args.async != null) {
			this.async = args.async;
		}
		if (args.onSuccess != null) {
			this.onSuccess.attach(args.onSuccess);
		}
		if (args.onError != null) {
			this.onError.attach(args.onError);
		}
		
	}
	

}

DataAdapter.prototype.getUrl = function(connection, url){
	return connection.url + url.replace("{token}", connection.token).replace("{proposal}", connection.proposal).replace("{username}", connection.username);
};


DataAdapter.prototype.get = function(url){
	var _this = this;

	if (EXI != null){
		EXI.setLoading();
	}

	var connections = EXI.credentialManager.getConnections();
	if (connections.length == 1){
		console.log(this.getUrl(connections[0], url));
		$.ajax({
			  url: this.getUrl(connections[0], url),
			  type: 'get',
			  async : this.async,
			  success: function(data){ 
				  _this.onSuccess.notify(data);
				  if (EXI != null){
					  EXI.setLoading(false);
				  }
			  },
			  error: function(error){
				  _this.onError.notify(error);
				   EXI.setError(error.responseText);
			  }
			});
	}
	else{
		alert("Number of connections > 1");
	}
	

//	if (connections.length == 2){
//		function success(dataset1, dataset2){
//			 _this.onSuccess.notify(dataset1[0].concat(dataset2[0]));
//			 if (exiSAXS != null){
//				  exiSAXS.setLoading(false);
//			 }
//		}
//		function error(error){
//			 _this.onError.notify(error);
//			  _this.onError.notify(error);
//			  if (exiSAXS != null){
//				  exiSAXS.setError(error.responseText);
//			  }
//		}
//		$.when( 
//				$.ajax({
//							url: connections[0].url + url.replace("%TOKEN%", connections[0].token).replace("%PROPOSAL%", connections[0].proposal).replace("%USER%", connections[0].username),
//							async : this.async,
//							type: 'get'
//						}), 
//			    $.ajax({
//			    	url: connections[1].url + url.replace("%TOKEN%", connections[1].token).replace("%PROPOSAL%", connections[1].proposal).replace("%USER%", connections[1].username),
//			    			async : this.async,
//			    			type: 'get'
//					 })
//			)
//		  .then( success, error);
//	}
};

DataAdapter.prototype.post = function(url, data){
	var _this = this;
	/** exiSAXS could be not defined yed **/
	if (EXI != null){
		EXI.setLoading();
	}
	var connections = EXI.credentialManager.getConnections();
	 url = this.getUrl(connections[0], url);
	 $.ajax({
		  type: "POST",
		  url: url,
		  data: data,
		  success: function(data){ 
			  _this.onSuccess.notify(data);
			  if (exiSAXS != null){
				  exiSAXS.setLoading(false);
			  }
		  },
		  error: function(error){
			  _this.onError.notify(error);
			  if (exiSAXS != null){
				  exiSAXS.setError(error);
			  }
		  }
	});
	 
};


/** Function for String **/
String.prototype.format = function (args) {
	var str = this;
	return str.replace(String.prototype.format.regex, function(item) {
		var intVal = parseInt(item.substring(1, item.length - 1));
		var replace;
		if (intVal >= 0) {
			replace = args[intVal];
		} else if (intVal === -1) {
			replace = "{";
		} else if (intVal === -2) {
			replace = "}";
		} else {
			replace = "";
		}
		return replace;
	});
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");