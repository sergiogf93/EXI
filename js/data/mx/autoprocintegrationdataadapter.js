
AutoProcIntegrationDataAdapter.prototype.get = DataAdapter.prototype.get;
AutoProcIntegrationDataAdapter.prototype.post = DataAdapter.prototype.post;
AutoProcIntegrationDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function AutoProcIntegrationDataAdapter(args){
	DataAdapter.call(this, args);
}


AutoProcIntegrationDataAdapter.prototype.getByDataCollectionId= function(dataCollectionId){
	this.get('/{token}/proposal/{proposal}/mx/autoprocintegration/dataCollection/{0}/list'.format( [dataCollectionId]));
};

AutoProcIntegrationDataAdapter.prototype.getXScaleByAutoProcIntegrationIdList= function(autoProcIntegrationIdList){
	this.get('/{token}/proposal/{proposal}/mx/autoprocintegration/{0}/xscale/list'.format( [autoProcIntegrationIdList.toString()]));
};

AutoProcIntegrationDataAdapter.prototype.getXScaleCompleteness= function(autoProcIntegrationIdList){
	var connection = EXI.credentialManager.getConnections()[0];
	return this.getUrl(connection, '/{token}/proposal/{proposal}/mx/autoprocintegration/{0}/xscale/completeness'.format( [autoProcIntegrationIdList.toString()]));
};

AutoProcIntegrationDataAdapter.prototype.getXScaleRfactor= function(autoProcIntegrationIdList){
	var connection = EXI.credentialManager.getConnections()[0];
	return this.getUrl(connection, '/{token}/proposal/{proposal}/mx/autoprocintegration/{0}/xscale/rfactor'.format( [autoProcIntegrationIdList.toString()]));
};


AutoProcIntegrationDataAdapter.prototype.getXScaleISigma= function(autoProcIntegrationIdList){
	var connection = EXI.credentialManager.getConnections()[0];
	return this.getUrl(connection, '/{token}/proposal/{proposal}/mx/autoprocintegration/{0}/xscale/isigma'.format( [autoProcIntegrationIdList.toString()]));
};

AutoProcIntegrationDataAdapter.prototype.getXScaleCC2= function(autoProcIntegrationIdList){
	var connection = EXI.credentialManager.getConnections()[0];
	return this.getUrl(connection, '/{token}/proposal/{proposal}/mx/autoprocintegration/{0}/xscale/cc2'.format( [autoProcIntegrationIdList.toString()]));
};
