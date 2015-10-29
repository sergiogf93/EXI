
ModelSaxsDataAdapter.prototype.get = DataAdapter.prototype.get;
ModelSaxsDataAdapter.prototype.post = DataAdapter.prototype.post;
ModelSaxsDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function ModelSaxsDataAdapter(args){
	DataAdapter.call(this, args);
}


ModelSaxsDataAdapter.prototype.saveMeasurement= function(measurement){
    var url = ('/{token}/proposal/{proposal}/saxs/measurement/save');
	this.post(url, {measurement : JSON.stringify(measurement)});
};

ModelSaxsDataAdapter.prototype.removeMeasurement= function(measurement){
    var url = ('/{token}/proposal/{proposal}/saxs/measurement/{0}/remove'.format([measurement.measurementId]));
	this.get(url);
};

ModelSaxsDataAdapter.prototype.getPDB= function(models, superpositions){
    var url = ('/{token}/proposal/{proposal}/saxs/modeling/pdb/get');
	this.post(url, {models : JSON.stringify(models)});
	
//    this.get('/{token}/proposal/{proposal}/saxs/modeling/pdb/get?models={0}&superpositions={1}'.format( [JSON.stringify(models), superpositions]));
};