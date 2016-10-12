/**
* Abstract class for creating a puck widget
*
* @class PuckWidget
* @constructor
*/
function PuckWidget(args){
	this.id = BUI.id();
	
	this.mainRadius = 150;
	
	this.isUnipuck = false;
	
	if (args){
		if (args.mainRadius){
			this.mainRadius = args.mainRadius;
		}
		if (args.isUnipuck){
			this.isUnipuck = args.isUnipuck;			
		}
	}
	
	this.shapeRadiusX = this.mainRadius/10;
	this.shapeRadiusY = this.mainRadius/20;
	
	this.data = {
				mainRadius : this.mainRadius,
				cells : [],
				id : this.id,
				isUnipuck : this.isUnipuck,
				shapeRadiusX : this.shapeRadiusX,
				shapeRadiusY : this.shapeRadiusY
	};
	
	this.onClick = new Event(this);
	this.onMouseOver = new Event(this);
	this.onMouseOut = new Event(this);
}

/**
* Add a certain number of cell objects to the data following a circle.
*
* @method addCirclePathCells
* @param {Object} data The data of the puck
* @param {Integer} n The number of cells to add
* @param {Double} marginPercent Factor to control the separation between cells
* @param {Double} dist The distance to the center of the puck where the cells are positioned
*/
PuckWidget.prototype.addCirclePathCells = function (data, n, marginPercent, dist) {
	var rad = Math.min(dist*Math.sin((Math.PI/n)*marginPercent), 
						(data.mainRadius - dist)*marginPercent);
	
	for (var i = 0 ; i < n ; i++){
		var ang = i*2*Math.PI/n;
		var newCell = 		{
								x :-dist*Math.sin(ang) + data.mainRadius,
								y :-dist*Math.cos(ang) + data.mainRadius,
								color :'#FFFFFF', 
								radius : rad,								
								id : this.id + "-" + Number(data.cells.length + 1),
								state : "Empty"
							};
							
		data.cells.push(newCell);
	}
	return data;
	
}

PuckWidget.prototype.getPanel = function () {
	var html = "";
	dust.render("puck.template", this.parseData(this.data), function(err, out){
		html = out;
	});
	
	return html;
};

PuckWidget.prototype.load = function (data) {
	var _this = this;
	for (i in this.data.cells){
		var currentId = this.id + "-" + Number(Number(i)+1);
		
		$("#" + currentId).mouseover(function(sender){
			_this.onMouseOver.notify(sender.target.id.split("-")[1]);
			_this.focus(sender.target.id.split("-")[1],true);
		});
		
		$("#" + currentId).mouseout(function(sender){
			_this.onMouseOut.notify();
			_this.focus(sender.target.id.split("-")[1],false);
			
		});
		
		$("#" + currentId).click(function(){
			_this.onClick.notify(_this.data.cells[0]);
			/*if($("#" + this.id).attr("fill") == "#FFFFFF"){
				$("#" + this.id).attr("fill","#23eeff");
			}else{
				$("#" + this.id).attr("fill","#FFFFFF");
				$("#" + this.id + "-label").html("");
			}*/
		});
	}
	for (sample in data){
		var id = this.id + "-" + data[sample].location;
		var cellIndex = this.findCellIndexById(id);
		this.data.cells[cellIndex].state = data[sample].state;
		this.select(data[sample].location,true);
	}
};

PuckWidget.prototype.focus = function (location, bool) {
	if (bool){
		$("#" + this.id + "-" + location).attr("stroke-width", "3");
		$("#" + this.id + "-" + location).attr("stroke", "#00FF00");
	} else {
		this.select(location,true);
	}
}

PuckWidget.prototype.select = function (location, bool) {
	if (bool) {
		var cellIndex = this.findCellIndexById(this.id + "-" + location);
		switch (this.data.cells[cellIndex].state) {
			case "Filled":
				$("#" + this.id + "-" + location).attr("fill","#23eeff");
				$("#" + this.id + "-" + location).attr("stroke", "#000000");
				$("#" + this.id + "-" + location).attr("stroke-width", "1");
				break;
			case "Collected":
				$("#" + this.id + "-" + location).attr("fill","url(#collectedPattern)");
				$("#" + this.id + "-" + location).attr("stroke", "#ff0000");
				$("#" + this.id + "-" + location).attr("stroke-width", "1");
				break;
			case "Results":
				$("#" + this.id + "-" + location).attr("fill","url(#resultsPattern)");
				$("#" + this.id + "-" + location).attr("stroke", "#00bb00");
				$("#" + this.id + "-" + location).attr("stroke-width", "2");
				break;
			case "Empty":
				$("#" + this.id + "-" + location).attr("fill","#ffffff");
				$("#" + this.id + "-" + location).attr("stroke", "#000000");
				$("#" + this.id + "-" + location).attr("stroke-width", "1");
				break;
		}
	} else {
		$("#" + this.id + "-" + location).attr("fill","#FFFFFF");
		$("#" + this.id + "-" + location).attr("stroke", "#000000");
	}
}

PuckWidget.prototype.findCellIndexById = function (id) {
	for (cellIndex in this.data.cells) {
		if (this.data.cells[cellIndex].id == id){
			return cellIndex;
		}
	}
}