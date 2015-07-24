

function ExtLocalExtorage(args){
	this.userManager = new UserManager();
	
	/** SUBTRACTIONS SELECTED MANAGER **/
	this.selectedSubtractionsManager = new SelectedSubtractionsManager();
	
	var _this = this;
	this.selectedSubtractionsManager.onAdded.attach(function(sender, args){
		_this.onAdded.notify(args);
		/** Update project selected **/
		var user = _this.userManager.getUser();
//		user.projects[0].subtractions = _this.selectedSubtractionsManager.getSubtractionIds();
		_this.userManager.write();
		
	});
	this.selectedSubtractionsManager.onRemoved.attach(function(sender, args){
		_this.onRemoved.notify(args);
	});
	
	this.userManager.onUserAdded.attach(function(sender, user){
		_this.onUserAdded.notify(user);
	});
	
	
	/** Events sof the selected Subtraction **/
	this.onAdded = new Event(this);
	this.onRemoved = new Event(this);
	
	
	/** TOKEN MANAGER **/
	this.tokenManager = new TokenManager();
	
	/** Events for user **/
	this.onUserAdded = new Event(this);
}



ExtLocalExtorage.prototype.clear = function(){
	this.tokenManager.clear();
	this.selectedSubtractionsManager.clear();
	localStorage.setItem("proposals", null);
	localStorage.setItem("projects", null);
	localStorage.setItem("user", null);
	
};

function UserManager(){
	this.projects = [];
	this.onUserAdded = new Event(this);
}

UserManager.prototype.setProjects = function(projects){
	this.projects = projects;
	this.write();
	this.onUserAdded.notify(projects);
};

UserManager.prototype.getProjects = function(){
	return JSON.parse(localStorage.getItem("projects"));
};

UserManager.prototype.getActiveProject = function(){
	return this.getProjects()[0];
};

UserManager.prototype.getUser = function(){
	return this.user;
};

UserManager.prototype.write = function(){
	localStorage.setItem("projects", JSON.stringify(this.projects));
	/** Saving into the database **/ 
//	new ExiDataAdapter().save(this.user);
};


function SelectedSubtractionsManager(){
	this.selected = [];
	
	/** subtractions subtractions **/
	this.subtractions = [];
	if (localStorage.getItem("subtractionsDataCollectionList")){
		this.subtractions = (JSON.parse(localStorage.getItem("subtractionsDataCollectionList")));
	}
	
	/** Events **/
	this.onAdded = new Event(this);
	this.onRemoved = new Event(this);
};

/** subtractions subtration **/
SelectedSubtractionsManager.prototype.getSelected = function(){
    return this.subtractions;
};

SelectedSubtractionsManager.prototype.getSubtractionIds = function(){
    var ids = [];
    for (var i = 0; i < this.subtractions.length; i++) {
		ids.push(this.subtractions[i].subtractionId);
	}
    return ids;
};

SelectedSubtractionsManager.prototype.getDataCollectionIds = function(){
    var ids = [];
    for (var i = 0; i < this.subtractions.length; i++) {
		ids.push(this.subtractions[i].dataCollectionId);
	}
    return ids;
};

SelectedSubtractionsManager.prototype.clear = function(){
	this.user = {};
    this.subtractions = [];
    this.write();
    this.onRemoved.notify();
};

SelectedSubtractionsManager.prototype.append = function(element){
    this.subtractions.push(element);
    this.onAdded.notify();
    this.write();
};

SelectedSubtractionsManager.prototype.remove = function(element){
    var result = [];
    for (var i = 0; i < this.subtractions.length; i++) {
		if (this.subtractions[i].subtractionId != element.subtractionId){
			result.push(this.subtractions[i]);
		}
	}
    this.subtractions = result;
    this.write();
    this.onRemoved.notify();
};

SelectedSubtractionsManager.prototype.write = function(){
	localStorage.setItem("subtractionsDataCollectionList", JSON.stringify(this.subtractions));
};

SelectedSubtractionsManager.prototype.clear = function(){
	this.subtractions = [];
	this.write();
	this.onRemoved.notify();
};




function TokenManager(){
	this.tokens = [];
	if (localStorage.getItem("tokens")){
		this.tokens = (JSON.parse(localStorage.getItem("tokens")));
	}
	
};

TokenManager.prototype.addToken = function(user, token, url){
	this.tokens.push({
		user : user,
		token : token,
		url : url
	});
	this.write();
};

TokenManager.prototype.isAuthenticated = function(){
	return this.tokens.length > 0;
};

TokenManager.prototype.getTokens = function(){
	return this.tokens;
};

TokenManager.prototype.clear = function(){
	this.tokens = [];
	this.write();
};
TokenManager.prototype.write = function(){
	localStorage.setItem("tokens", JSON.stringify(this.tokens));
};
