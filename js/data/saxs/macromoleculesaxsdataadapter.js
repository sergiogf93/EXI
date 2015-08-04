
MacromoleculeSaxsDataAdapter.prototype.get = DataAdapter.prototype.get;
MacromoleculeSaxsDataAdapter.prototype.post = DataAdapter.prototype.post;
MacromoleculeSaxsDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function MacromoleculeSaxsDataAdapter(args){
	DataAdapter.call(this, args);
}


MacromoleculeSaxsDataAdapter.prototype.saveMacromolecule = function(macromolecule){
    var url = ('/{token}/proposal/{proposal}/saxs/macromolecule/save');
	this.post(url, {macromolecule : JSON.stringify(macromolecule)});
};

MacromoleculeSaxsDataAdapter.prototype.getMacromolecules= function(){
	this.get('/{token}/proposal/{proposal}/saxs/macromolecule/list');
};
