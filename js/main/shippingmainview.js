ShippingMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingMainView.prototype.getContainer = MainView.prototype.getContainer;

function ShippingMainView() {
	this.title = "Shipping";
	MainView.call(this);
	
	var _this = this;
	this.shipmentForm = new ShipmentForm();
	this.caseGrid = new CaseGrid({
		height : 300
	});
	
	this.caseGrid.onAdd.attach(function(sender){
		_this.panel.setLoading();
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender){
			_this.load(_this.shippingId);
			_this.panel.setLoading(false);
		});
		adapter.addDewar(_this.shippingId );
	});
	
	this.caseGrid.onRemove.attach(function(sender, dewar){
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender){
			_this.load(_this.shippingId);
			_this.panel.setLoading(false);
		});
		adapter.removeDewar(_this.shippingId, dewar.dewarId );
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
	return {
		  layout: {
		        type: 'anchor'
		    },
		    defaults : {
				anchor : '100%',
				hideEmptyLabel : false },
		    margin : 30,
			bodyStyle : {
				"background-color" : "#E6E6E6" 
			},
		items : [
		         	this.shipmentForm.getPanel(),
		         	this.getTabs()
		]
	};
};


ShippingMainView.prototype.load = function(shippingId) {
	this.shippingId = shippingId;
	var _this = this;
	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, shipment){
		_this.shipmentForm.load(shipment);
		_this.caseGrid.load(shipment);
	});
	adapter.getShipment(shippingId);
};
