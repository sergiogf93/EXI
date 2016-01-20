function ShippingListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

ShippingListView.prototype.getPanel = ListView.prototype.getPanel;
ShippingListView.prototype.load = ListView.prototype.load;

ShippingListView.prototype.getRow = function(record){
	console.log(record.data)
		var html = "<table class='listView'>";
		html = html + "<tr><td>Name:</td><td>" + record.data.Shipping_shippingName+ "</td></tr>";
		html = html + "<tr><td  style='color:#207a7a;font-weight:bold;'>Status:</td><td>" + record.data.Shipping_shippingStatus+ "</td></tr>";
		html = html + "<tr><td>Type:</td><td>" + record.data.Shipping_shippingType+ "</td></tr>";
		if (record.data.creationDate != null){
			try{
				html = html + "<tr><td>Date:</td><td>" + moment(record.data.Shipping_creationDate).format("MMM Do YY") + "</td></tr>";
			}
			catch(e){
				html = html + "<tr><td>Date:</td><td>Format Error</td></tr>";
			}
		}
	return html + "</table>";
};

ShippingListView.prototype.getFilter = function(value){
	return [{property : "creationDate", value : value, anyMatch : true}];
};

ShippingListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Shipping',  flex: 1, dataIndex: 'shippingId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

ShippingListView.prototype.getFields = function(){
	return  ['Shipping_shippingName', 'creationDate', 'Shipping_shippingStatus', 'Shipping_shippingType', 'Shipping_shippingId'];
};


