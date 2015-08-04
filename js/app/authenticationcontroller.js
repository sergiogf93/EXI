function AuthenticationManager(){
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
}

/**
 * url to an ISPyB instance http://pc593.embl.fr:8080/ispyb-ws/rest
 * @param user
 * @param password
 * @param url
 */
AuthenticationManager.prototype.login = function(user, password, url){
	var _this = this;
	var fn = function onSuccess(sender, data) {
		debugger
		_this.onSuccess.notify({
			user : user,
			roles : data.roles,
			token : data.cookie,
			url : url
	});
	};
		
	EXI.getDataAdapter().proposal.authentication.onError.attach(function(sender, data) {
		Ext.Msg.alert('Failed', "Error on authentication");
	});
	debugger
	EXI.getDataAdapter({
		onSuccess :fn
	}).proposal.authentication.authenticate(user, password, url);
	
	
	
};

