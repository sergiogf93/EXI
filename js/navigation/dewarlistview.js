function DewarListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

DewarListView.prototype.getPanel = ListView.prototype.getPanel;
DewarListView.prototype.load = ListView.prototype.load;

DewarListView.prototype.getRow = function(record){
    var html = "";
    dust.render("dewarlistview", record.data, function(err, out){
        html = out;
     });
    return html;
};

DewarListView.prototype.getFilter = function(value){
	return [{property : "creationDate", value : value, anyMatch : true}];
};

DewarListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Pucks',  flex: 1, dataIndex: 'shippingId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

DewarListView.prototype.getFields = function(){
	return  ['Shipping_shippingName','Container_code', 'Dewar_dewarStatus', 'shippingStatus', 'shippingType'];
};


