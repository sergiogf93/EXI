function QueueGrid(args) {
    this.decimals = 3;
	this.onSelect = new Event();

	this.maxHeight = 600;
	this.imgWidth = 77;
	this.padding = 0;
	
	this.id = BUI.id();
	this.title = 'Data Collections';
	this.key = {};

	this.selectionMode = 'MULTI';
	
	this.collapsible = true;
	this.collapsed = false;
	
	var _this = this;
	this.filters = [ function(item) {
		if (item.data.dataCollectionId == null) {
			return false;
		}
		if (_this.key[item.data.dataCollectionId] == null) {
			_this.key[item.data.dataCollectionId] = [];
		}
		_this.key[item.data.dataCollectionId].push(item.data);
		return item.data.macromoleculeId != null;
	} ];
	if (args!= null){
		if (args.maxHeight != null){
			this.maxHeight = args.maxHeight;
		}
		if (args.padding != null){
			this.padding = args.padding;
		}
		if (args.collapsible != null){
			this.collapsible = args.collapsible;
		}
		if (args.collapsed != null){
			this.collapsed = args.collapsed;
		}
		if (args.selectionMode != null){
			this.selectionMode = args.selectionMode;
		}
		if (args.title != null){
			if (args.title == false){
				this.title = null;
			}
		}
	}
	
	this.selected = []; 
	this.onSelectionChange = new Event();
	this.onDeselect = new Event(this);
	this.onSelect = new Event(this)
}

// QueueGrid.prototype.getPercentage = function(averaged, total) {
	
// 	var color = "undefined";
// 	if (averaged == null){
// 		averaged = "NA";
// 		color = "orange";
// 	}
// 	if (total == null){
// 		total = "NA";
// 		color = "orange";
// 	}
	
// 	if ((averaged != "NA")&(total != "NA")){
// 		if (averaged/total >= 0.3){
// 			color = "orange";
// 		}
// 		if (averaged/total > 0.7){
// 			// color = "#BCF5A9";
// 			color = "undefined";
// 		}
		
// 		if (averaged/total < 0.3){
// 			color = "red";
// 		}
		
		
// 	}
	
// 	return {color : color,
// 			text : averaged + " / " + total};
// };

QueueGrid.prototype.getImage = function(sample, name) {
	if (sample.Subtraction_subtractionId != null) {
		var url = EXI.getDataAdapter().saxs.subtraction.getImage(sample.Subtraction_subtractionId, name);
		return url;
	}
};

// QueueGrid.prototype.parseDataById = function (data) {
// 	var parsed = {};
// 	// data.sort(function (a,b){
// 	// 	return b.Measurement_measurementId - a.Measurement_measurementId;
// 	// });
// 	var byDataCollectionId = _.keyBy(data,'MeasurementToDataCollection_dataCollectionId');
// 	var keys = _.keys(byDataCollectionId);
// 	for (var i=0 ; i < keys.length ; i++) {
// 		var dataCollectionId = Number(keys[i]);
// 		parsed[dataCollectionId] = _.filter(data,{'MeasurementToDataCollection_dataCollectionId' : dataCollectionId});
// 	}
// 	return parsed;
// }


/**
* Attaches the events to lazy load to the images. Images concerned are with the class queue-img
*
* @method attachCallBackAfterRender
*/
QueueGrid.prototype.attachCallBackAfterRender = function(nodeWithScroll) {
    
    var _this = this;
	
    var lazy = {
            bind: 'event',
            /** !!IMPORTANT this is the parent node which contains the scroll **/
            appendScroll: nodeWithScroll,
            beforeLoad: function(element) {
                console.log('image "' + (element.data('src')) + '" is about to be loaded');                                
            },           
            onFinishedAll: function() {
                EXI.mainStatusBar.showReady();
            }
    };
       
    var timer1 = setTimeout(function() { $('.queue-img').lazy(lazy);}, 500);

};

QueueGrid.prototype.getPanel = function(){
    var _this = this;

	return {
		html : '<div id="' + this.id + '"></div>',
		autoScroll : true,
        padding : this.padding
	}
};