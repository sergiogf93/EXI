ShippingMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingMainView.prototype.getContainer = MainView.prototype.getContainer;

function ShippingMainView() {
	
	MainView.call(this);
	
	var _this = this;
	this.shipmentForm = new ShipmentForm();
	this.caseGrid = new CaseGrid({
		height : 300
	});
	
	this.caseGrid.onAdd.attach(function(sender){
//		_this.panel.setLoading();
//		var onSuccess = (function(sender){
//			_this.load(_this.shippingId);
//			_this.panel.setLoading(false);
//		});
//		EXI.getDataAdapter({onSuccess:onSuccess}).proposal.dewar.addDewar(_this.shippingId );
		_this.caseGrid.edit();
	});
	
	this.caseGrid.onRemove.attach(function(sender, dewar){
		var onSuccess = (function(sender){
			_this.load(_this.shippingId);
			_this.panel.setLoading(false);
		});
		EXI.getDataAdapter({onSuccess:onSuccess}).proposal.dewar.removeDewar(_this.shippingId, dewar.dewarId );
	});
}



ShippingMainView.prototype.getContainer = function() {
	return  Ext.createWidget('tabpanel',
			{
				margin : 10,
				 defaults : {
						anchor : '100%'
				 },
				items : [
				     	{
							tabConfig : {
								title : 'Delivery Details'
							},
							items : [ 
							         	this.shipmentForm.getPanel()
							]
						},
						{
							tabConfig : {
								id : this.id + "grid",
								title : 'Content',
								icon : '../images/icon/shipping.png'
							},
							items : [ 
							         	this.caseGrid.getPanel()
							]
						}
					]
			});

};


ShippingMainView.prototype.load = function(shippingId) {
	this.shippingId = shippingId;
	
	if (shippingId == null){
		Ext.getCmp(this.id + "grid").disable(true);
	}
	this.panel.setLoading();
	this.panel.setTitle("Shipment");
	var _this = this;
	if (shippingId != null){
		var onSuccess = (function(sender, shipment){
			_this.shipmentForm.load(shipment);
			_this.caseGrid.load(shipment);
			_this.panel.setLoading(false);
		});
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getShipment(shippingId);
	}
};
