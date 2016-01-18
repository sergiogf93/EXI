function PuckListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

PuckListView.prototype.getPanel = ListView.prototype.getPanel;
PuckListView.prototype.load = ListView.prototype.load;

PuckListView.prototype.getRow = function(record){
		var html = "<table class='listView'>";
		html = html + "<tr><td>Code:</td><td>" + record.data.Container_code + "</td></tr>";
		html = html + "<tr><td  style='color:#207a7a;font-weight:bold;'>Status:</td><td>" + record.data.Dewar_dewarStatus+ "</td></tr>";
		html = html + "<tr><td>Shipping:</td><td>" + record.data.Shipping_shippingName + "</td></tr>";
		if (record.data.Shipping_bltimeStamp != null){
			try{
				html = html + "<tr><td>Shipping Date:</td><td>" + moment(record.data.Shipping_bltimeStamp).format("MMM Do YY") + "</td></tr>";
			}
			catch(e){
				html = html + "<tr><td>Shipping Date:</td><td>Format Error</td></tr>";
			}
		}
	return html + "</table>";
};

PuckListView.prototype.getFilter = function(value){
	return [{property : "creationDate", value : value, anyMatch : true}];
//	, {property : "shippingStatus", value : value, anyMatch : true}];
//	var filters = [
//	               new Ext.util.Filter({
//	                property: "creationDate", value: value,
//	               }),
//	               new Ext.util.Filter({
//	            	   property: "shippingStatus", value: value, anyMatch : true
//	               })
//	              ];
//	return filters;
};

PuckListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Pucks',  flex: 1, dataIndex: 'shippingId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

PuckListView.prototype.getFields = function(){
	return  ['Shipping_shippingName','Container_code', 'Dewar_dewarStatus', 'shippingStatus', 'shippingType'];
};


