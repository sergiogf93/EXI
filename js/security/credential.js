
function Credential(username, roles, token, url, activeProposals) {
	this.username = username.toLowerCase();
	this.roles = roles;
	this.url = url;
	this.token = token;
	this.activeProposals = activeProposals;
}

Credential.prototype.isManager = function() {
	return this._checkRole("manager");
};

Credential.prototype.isLocalContact = function() {
	return this._checkRole("localcontact");
};

Credential.prototype._checkRole = function(role) {
	return JSON.stringify(this.roles).toLowerCase().indexOf(role) != -1;
};
