ShippingListView.prototype.getPanel = NavigationListView.prototype.getPanel;

function ShippingListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	NavigationListView.call(this);
}

ShippingListView.prototype.getRow = function(record){
		var html = "<table class='listView'>";
		html = html + "<tr><td>Name:</td><td>" + record.data.shippingName+ "</td></tr>";
		html = html + "<tr><td>Status:</td><td>" + record.data.shippingStatus+ "</td></tr>";
		html = html + "<tr><td>Type:</td><td>" + record.data.shippingType+ "</td></tr>";
		if (record.data.creationDate != null){
			try{
				html = html + "<tr><td>Date:</td><td style='font-weight:bold;'>" + moment(record.data.creationDate).format("MMM Do YY") + "</td></tr>";
			}
			catch(e){
				html = html + "<tr><td>Date:</td><td>Format Error</td></tr>";
			}
		}
	return html + "</table>";
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


