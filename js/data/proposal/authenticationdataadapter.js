AuthenticationDataAdapter.prototype.get = DataAdapter.prototype.get;
AuthenticationDataAdapter.prototype.post = DataAdapter.prototype.post;
AuthenticationDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function AuthenticationDataAdapter(args){
	DataAdapter.call(this, args);
}


AuthenticationDataAdapter.prototype.authenticate = function(user, password, url){
	var _this = this;
	$.ajax({
		  url: url + '/authenticate',
		  type: 'post',
		  data: {
			  		login : user,
			  		password : password
		  },
		  success: function(data){
			   _this.onSuccess.notify(data);
		  },
		  error: function(error){
			  _this.onError.notify(error);
		  }
	});
};
