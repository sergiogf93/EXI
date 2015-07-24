

function ExiDataAdapter(args){
	this.async = false;
	if (args != null){
		if (args.async != null){
			this.async = args.async;
		}
	}
	this.onSuccess = new Event(this);
	this.onError = new Event(this);

	this.server = "http://pc593.embl.fr:8080/extispyb-ws/rest";
}

ExiDataAdapter.prototype.call = function(url){
	var _this = this;
	
	$.ajax({
		  url: this.server + url,
		  type: 'get',
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

ExiDataAdapter.prototype.postcall = function(url, data){
	var _this = this;
	$.ajax({
		  url: this.server + url,
		  type: 'post',
		  data : data,
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

ExiDataAdapter.prototype.getUser = function(){
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	if (tokens != null){
		if (tokens.length > 0){
			this.call('/{0}/project/list'.format([ tokens[0].token]));
		}
	}
};

ExiDataAdapter.prototype.getRuns = function(projectId){
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	if (tokens != null){
		if (tokens.length > 0){
			this.call('/{0}/project/{1}/run/list'.format([ tokens[0].token, projectId]));
		}
	}
};

ExiDataAdapter.prototype.save = function(user){
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	if (tokens != null){
		if (tokens.length > 0){
			this.postcall('/{0}/user/save'.format([ tokens[0].token]), {user : JSON.stringify(user)});
		}
	}
};

