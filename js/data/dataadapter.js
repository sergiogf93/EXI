

function DataAdapter(args){
	this.async = false;
	if (args != null){
		if (args.async != null){
			this.async = args.async;
		}
	}
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
	
	this.server = 'http://pc593.embl.fr:8080/ispyb-ws/rest';
}

DataAdapter.prototype.call = function(url){
	var _this = this;
	console.log(this.server + url);
	$.ajax({
		  url: this.server + url,
		  type: 'get',
		  success: function(data){ 
			  _this.onSuccess.notify(data);
		  },
		  error: function(data){
			  _this.onError.notify(data);
		  }
		});

};

DataAdapter.prototype.getSessions = function(){
	this.call('/{0}/saxs/{1}/session/list'.format([ AuthenticationController.getToken(), AuthenticationController.getUser()]));
};

DataAdapter.prototype.getMacromolecules= function(){
	this.call('/{0}/saxs/{1}/macromolecule/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser()]));
};

DataAdapter.prototype.getExperiments= function(){
	this.call('/{0}/saxs/{1}/experiment/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser()]));
};

DataAdapter.prototype.getExperimentsBySessionId= function(sessionId){
	this.call('/{0}/saxs/{1}/experiment/sessionId/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), sessionId]));
};

DataAdapter.prototype.getSubtractionByExperimentId= function(experimentId){
	this.call('/{0}/saxs/{1}/subtraction/experimentId/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), experimentId]));
};


DataAdapter.prototype.authenticate = function(user, password){
	/** this method does not have the cookie **/
	this.call('/{0}/{1}/authenticate'.format([user, password]));
	
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