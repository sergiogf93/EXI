function TimeLineWidget() {
	this.id = "test";
	this.targetId = "timeline" + BUI.id();
	this.width = 1000;
	
	this.data = [];
	this.color = {
			
		'BM29' : '#D0F5A9',
		'ID23-1' : '#81DAF5',
		'ID23-2' : '#A9D0F5',
		'ID23-3' : '#58ACFA',
		'ID30'   : '#F7819F',
		'ID29'   : '#FAAC58',
		'ID30A-1' : '#DF01D7',
		'ID30B' : '#D7DF01'
			
	};
	
	this.onSelected = new Event(this);
}


TimeLineWidget.prototype.render = function() {
	var _this = this;
	if (document.getElementById(this.targetId)){
		var options = {
				editable: true,
				autoResize : true,
				height : "100%",
				selectable : true,
				zoomable : false,
				moveable : true,
				stack : true,
			    onUpdate: function (item, callback) {
			    	_this.onSelected.notify(item);
			    }
		};

		document.getElementById(this.targetId).setAttribute("width", this.panel.getWidth() + "px");
		
		this.timeline = new vis.Timeline(document.getElementById(this.targetId), this.data, options);
		this.timeline.setGroups(this.groups);
		
		
	}
};


TimeLineWidget.prototype.load = function(data, startDate, endDate, groups) {
	var _this = this;
	this.data = data;
	this.start = startDate;
	this.end = endDate;
	this.groups = groups;
	this.timeline.setGroups(this.groups);
	this.timeline.setItems(data);
	
	
};

TimeLineWidget.prototype.getTopBar = function() {
	return null;
};

TimeLineWidget.prototype.getPanel = function() {
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		id :  this.id,
		height : 800,
		cls : 'border-grid',
		flex : 1,
		margin : this.margin,
		items : [ 
		          {
		        	  html : '<div style="height:790px" id="' + this.targetId + '"></div>'
		          } 
		] 
		});

	
	this.panel.on("afterrender", function(){
		_this.render();
	});
	
	this.panel.on("afterlayout", function(){
	});
	
	return this.panel;
};

