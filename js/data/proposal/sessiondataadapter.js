SessionDataAdapter.prototype.get = DataAdapter.prototype.get;
SessionDataAdapter.prototype.post = DataAdapter.prototype.post;
SessionDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function SessionDataAdapter(args){
	DataAdapter.call(this, args);
}



SessionDataAdapter.prototype.getSessions = function(){
	this.get('/{token}/proposal/{proposal}/session/list');
};

