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
		_this.panel.setLoading();
		var onSuccess = (function(sender){
			_this.load(_this.shippingId);
			_this.panel.setLoading(false);
		});
		EXI.getDataAdapter({onSuccess:onSuccess}).proposal.dewar.addDewar(_this.shippingId );
	});
	
	this.caseGrid.onRemove.attach(function(sender, dewar){
		var onSuccess = (function(sender){
			_this.load(_this.shippingId);
			_this.panel.setLoading(false);
		});
		EXI.getDataAdapter({onSuccess:onSuccess}).proposal.dewar.removeDewar(_this.shippingId, dewar.dewarId );
	});
}

ShippingMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'Cases'
						},
						items : [ 
						         	this.caseGrid.getPanel()
						]
					}
					]
			});
};


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
								title : 'Shipment'
							},
							items : [ 
							         	this.shipmentForm.getPanel()
							]
						},
						{
							tabConfig : {
								title : 'Cases'
							},
							items : [ 
							         	this.caseGrid.getPanel()
							]
						}
					]
			});
//	return {
//		  layout: {
//		        type: 'anchor'
//		    },
//		    defaults : {
//				anchor : '100%',
//				hideEmptyLabel : false },
//		    margin : 30,
//			bodyStyle : {
//				"background-color" : "#E6E6E6" 
//			},
//		items : [
//		         	this.shipmentForm.getPanel(),
//		         	this.getTabs()
//		]
//	};
};


ShippingMainView.prototype.load = function(shippingId) {
	this.shippingId = shippingId;
	this.panel.setTitle("Sample Tracking");
	var _this = this;
	var onSuccess = (function(sender, shipment){
		_this.shipmentForm.load(shipment);
		_this.caseGrid.load(shipment);
	});
	
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getShipment(shippingId);
};
