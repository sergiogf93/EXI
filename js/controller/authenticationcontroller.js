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
	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, data) {
		_this.onSuccess.notify({
			user : user,
			token : data.cookie,
			url : url
		});
		
	});
	adapter.onError.attach(function(sender, data) {
		Ext.Msg.alert('Failed', "Error on authentication");
	});
	debugger
	adapter.authenticate(user, password, url);
};

