ShippingDataAdapter.prototype.get = DataAdapter.prototype.get;
ShippingDataAdapter.prototype.post = DataAdapter.prototype.post;
ShippingDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function ShippingDataAdapter(args){
	DataAdapter.call(this, args);
}



ShippingDataAdapter.prototype.getShippings = function(){
	this.get('/{token}/proposal/{proposal}/shipping/list');
};

ShippingDataAdapter.prototype.getShipment = function(shippingId){
	this.get('/{token}/proposal/{proposal}/shipping/{0}/get'.format([shippingId]));
};

ShippingDataAdapter.prototype.saveShipment = function(shipment ){
	var proposal = exiSAXS.localExtorage.tokenManager.getTokens()[0].user;
	var url = ('/{0}/proposal/{2}/shipping/save'.format( ['%TOKEN%', '%PROPOSAL%', proposal]));
	this.post(url, shipment);
};