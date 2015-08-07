ShippingListView.prototype.getPanel = ListView.prototype.getPanel;
ShippingListView.prototype.load = ListView.prototype.load;

function ShippingListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

ShippingListView.prototype.getRow = function(record){
		var html = "<table class='listView'>";
		html = html + "<tr><td>Name:</td><td>" + record.data.shippingName+ "</td></tr>";
		html = html + "<tr><td>Status:</td><td>" + record.data.shippingStatus+ "</td></tr>";
		html = html + "<tr><td>Type:</td><td>" + record.data.shippingType+ "</td></tr>";
		if (record.data.creationDate != null){
			try{
				html = html + "<tr><td>Date:</td><td style='color:#207a7a;font-weight:bold;'>" + moment(record.data.creationDate).format("MMM Do YY") + "</td></tr>";
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
	return  ['shippingId', 'creationDate', 'shippingStatus', 'shippingType'];
};


