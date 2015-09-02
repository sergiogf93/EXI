function TimeLineWidget() {
	this.id = "test";
	this.targetId = "timeline" + BUI.id();
	this.width = 1000;
	
	this.onSelected = new Event(this);
}

TimeLineWidget.prototype.getStartDate = function(data) {
	if (data != null){
		var starts = [];
		for (var i = 0; i < data.length; i++) {
			starts.push(data[i].start);
		}
		return starts.reduce(function (a, b) { return a < b ? a : b; }); 
	}
};

TimeLineWidget.prototype.getEndDate = function(data) {
	if (data != null){
		var starts = [];
		for (var i = 0; i < data.length; i++) {
			starts.push(data[i].start);
		}
		return starts.reduce(function (a, b) { return a > b ? a : b; }); 
	}
};



TimeLineWidget.prototype.load = function(data, startDate, endDate) {
	var _this = this;
	this.data = data;


	if (document.getElementById(this.targetId)){
		var options = {
			width : '100%',
			height : '700px',
			cluster: true,
			axisOnTop: true,
            groupsChangeable : true,
            groupsOnRight: false,
			editable : false,
			style : 'box',
			groupMinHeight : 14,
			end : endDate,
			max : endDate,
			start : startDate,
			min : startDate
		};

		document.getElementById(this.targetId).setAttribute("width", this.panel.getWidth() + "px");
		
		var timeline = new links.Timeline(document.getElementById(this.targetId), options);

		
		function onSelect() {
			var sel = timeline.getSelection();
			  if (sel.length) {
			    if (sel[0].row != undefined) {
			    	_this.onSelected.notify(_this.data[sel[0].row]);
			    }
			  }
		}
		
		links.events.addListener(timeline, 'select', onSelect);
		timeline.draw(data);
	}
};

TimeLineWidget.prototype.getTopBar = function() {
	return null;
};

TimeLineWidget.prototype.getPanel = function(data) {
	var _this =this;
	this.panel = Ext.create('Ext.panel.Panel', {
		id :  this.id,
		layout : {
			type : 'fit' 
		},
		flex : 1,
		cls : 'border-grid',
		flex : 1,
		tbar: this.getTopBar(),
		margin : this.margin,
		items : [ 
		          {
			html : '<div style="height:800px;" id="' + this.targetId + '"></div>'
			 } 
		] 
		});

	
	this.panel.on("afterrender", function(){
	});
	
	this.panel.on("afterlayout", function(){
		_this.load(_this.data);
	});
	
	return this.panel;
};

