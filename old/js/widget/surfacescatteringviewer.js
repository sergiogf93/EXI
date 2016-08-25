function SurfaceScatteringViewer(){
	this.id = BUI.id();
	this.originalData = [];

	this.scale = 1;
}


SurfaceScatteringViewer.prototype.getTopBar = function(){
	var _this = this;
	var slider = Ext.create('Ext.slider.Single', {
	    width: 300,
	    value: 1,
	    increment: 1,
	    minValue: 0.1,
	    maxValue: 10,
	    fieldLabel : "Scale",
	    listeners : {
			change : function(component, newvalue) {
					for (var i=0; i< _this.originalData.length; i++){
						for (var j=0; j< _this.originalData[i].length; j++){
							_this.data[i][j] = (_this.originalData[i][j]*newvalue);
						}
					}
					_this.clear();
					_this.render(_this.data);
		}
	    }
	});
	return Ext.create('Ext.toolbar.Toolbar', {
	    items: [
		slider
	    ]
	});
};

SurfaceScatteringViewer.prototype.clear = function(){
	document.getElementById(this.id).innerHTML = "";

};
SurfaceScatteringViewer.prototype.getPanel = function(){
	var _this = this;
	return Ext.create('Ext.panel.Panel', {
	    width: 810,
	    height: 810,
	    border: 1,
	    margin : 5,
	    cls : "borderGrid",
	    //tbar : this.getTopBar(),
	    items: [
	    {
		html : "<div id='" + this.id +"'></div>"
	    }],
	    listeners : {
			afterrender : function(component, eOpts) {
				_this.render(_this.data);
		}
	    }
	});
};

SurfaceScatteringViewer.prototype.render = function(data){

	var numRows = data.length - 2;
	var numCols = data[0].length - 2;
	
	var tooltipStrings = new Array();
	var plotData = new google.visualization.DataTable();
	
	for (var i = 0; i < numCols; i++)
	{
	plotData.addColumn('number', 'col'+i);
	}
	
	plotData.addRows(numRows);
	var d = 360 / numRows;
	var idx = 0;
	
	for (var i = 0; i < numRows; i++) 
	{
		for (var j = 0; j < numCols; j++)
		{
			//var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0) + Math.sin(i * d * Math.PI / 180.0));
			var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0));
			//var value = (Math.sin(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0)) * 1.5;
			
			plotData.setValue(i, j, (1 - (data[i][j]/(255*this.scale))));
			
			tooltipStrings[idx] = "x:" + i + ", y:" + j + " = " + value;
			idx++;
		}
	}
	
	var surfacePlot = new greg.ross.visualisation.SurfacePlot(document.getElementById(this.id));
	
	// Don't fill polygons in IE. It's too slow.
	var fillPly = true;
	
	// Define a colour gradient.
	var colour1 = {red:0, green:0, blue:255};
	var colour2 = {red:0, green:255, blue:255};
	var colour3 = {red:0, green:255, blue:0};
	var colour4 = {red:255, green:255, blue:0};
	var colour5 = {red:255, green:0, blue:0};
	var colours = [colour1, colour2, colour3, colour4, colour5];
	
	// Axis labels.
	var xAxisHeader	= "X";
	var yAxisHeader	= "Y";
	var zAxisHeader	= "Z";
	
	var options = { width: 800, height: 800, colourGradient: colours, fillPolygons: fillPly,
		tooltips: tooltipStrings, xTitle: xAxisHeader, yTitle: yAxisHeader, zTitle: zAxisHeader, restrictXRotation: false};
	
	surfacePlot.draw(plotData, options);

};


SurfaceScatteringViewer.prototype.load = function(data){	
			
			//google.load("visualization", "1");
			//google.setOnLoadCallback(setUp);
	this.originalData = data;		
	this.data = data;
	
			

};
