var AuthenticationController = {
	tokenName : "ispyb",
	/** Authenticates an user and password **/
	login : function(user, password) {
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender, data) {
			
			localStorage.setItem(AuthenticationController.tokenName,data.cookie);
			localStorage.setItem("ispyb_user",user);
			
			AuthenticationController.goToMainPage();
			
		});
		adapter.onError.attach(function(sender, data) {
			Ext.Msg.alert('Failed', "Error on authentication");
		});

		adapter.authenticate(user, password);
	},
	
	logout : function() {
		localStorage.removeItem(AuthenticationController.tokenName);
		window.location.href = 'index.html';
	},
	
	goToMainPage : function() {
		window.location.href = 'main.html';
	},
	
	getUser : function() {
		if (localStorage.getItem("ispyb_user")){
			return localStorage.getItem("ispyb_user");
		}
		return "Not a user";
	},
	
	getToken : function() {
		return localStorage.getItem(AuthenticationController.tokenName);
	} 
};