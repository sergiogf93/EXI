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

ShippingDataAdapter.prototype.getLabContacts = function(){
	this.get('/{token}/proposal/{proposal}/shipping/labcontact/list');
};


ShippingDataAdapter.prototype.getLabContactById = function(labContactId){
	this.get('/{token}/proposal/{proposal}/shipping/labcontact/{0}/get'.format([labContactId]));
};


ShippingDataAdapter.prototype.saveShipment = function(shipment ){
	this.post('/{token}/proposal/{proposal}/shipping/save', shipment);
};