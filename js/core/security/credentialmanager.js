function CredentialManager(){
	this.onLogin = new Event(this);
	this.onLogout = new Event(this);
	this.onActiveProposalChanged = new Event(this);
}

CredentialManager.prototype.addCredential = function(username, roles, token, url, exiUrl, properties){
	var credential = new Credential(username, roles, token, url, exiUrl, [], properties);
	/** Writing to ExtLocalStorage * */
	if (localStorage.getItem("credentials") == null) {
		localStorage.setItem("credentials", "[]");
	}
	var credentials = this.getCredentials();
	credentials.push(credential);
	localStorage.setItem("credentials", JSON.stringify(credentials));
	this.onLogin.notify(credential);
};

CredentialManager.prototype.getCredentials = function(){
	var credentials = [];
	if (JSON.parse(localStorage.getItem("credentials")) != null){
		credentials = JSON.parse(localStorage.getItem("credentials"));
	}
	return credentials;
};

/** Given a beamline name it return MX or SAXS **/
CredentialManager.prototype.getTechniqueByBeamline = function(beamlineName){
	var connections = this.getConnections();
	for (var i = 0; i < connections.length; i++) {
		if (JSON.stringify(connections[i].beamlines.MX).toUpperCase().indexOf(beamlineName.toUpperCase()) != -1){
			return "MX";
		}
		if (JSON.stringify(connections[i].beamlines.SAXS).toUpperCase().indexOf(beamlineName.toUpperCase()) != -1){
			return "SAXS";
		}
	}
	return "UNKNOW";
	
};

CredentialManager.prototype.getConnections = function(){
	var credentials = this.getCredentials();
	var connectors = [];
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].activeProposals.length > 0){
			for (var j = 0; j < credentials[i].activeProposals.length; j++) {
				connectors.push({
					username : credentials[i].username,
					url : credentials[i].url,
					exiUrl : credentials[i].exiUrl,
					token : credentials[i].token,
					beamlines : credentials[i].properties.beamlines,
					proposal : credentials[i].activeProposals[j] });
			}
		}
		else{
				connectors.push({
					username : credentials[i].username,
					url : credentials[i].url,
					exiUrl : credentials[i].exiUrl,
					token : credentials[i].token,
					beamlines : credentials[i].properties.beamlines,
					proposal : null 
				});
		}
	}
	return connectors;
};

CredentialManager.prototype.getCredentialByUserName = function(username, roles, token, url){
	var credentials = this.getCredentials();
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].username == username) {
			return new Credential(
					credentials[i].username, 
					credentials[i].roles, 
					credentials[i].token, 
					credentials[i].url,
					credentials[i].activeProposals);
		}
	}
};

CredentialManager.prototype.logout = function(username, roles, token, url){
	localStorage.removeItem('credentials');
	this.onLogout.notify();
};

CredentialManager.prototype.setActiveProposal = function(username, proposal){
	var credentials = this.getCredentials();
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].username.toLowerCase() == username.toLowerCase()) {
			credentials[i].activeProposals = [proposal];
			localStorage.setItem("credentials", JSON.stringify(credentials));
			localStorage.removeItem("sessions");
			this.onActiveProposalChanged.notify();
		}
	}
};

