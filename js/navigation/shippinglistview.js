function ShippingListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

ShippingListView.prototype.getPanel = ListView.prototype.getPanel;
ShippingListView.prototype.load = ListView.prototype.load;
ShippingListView.prototype.getFilter = ListView.prototype.getFilter;
ShippingListView.prototype.getFields = ListView.prototype.getFields;
ShippingListView.prototype.getColumns = ListView.prototype.getColumns;


/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
ShippingListView.prototype.getRow = function(record){
	var html = "";
    
	dust.render("shipping.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};

