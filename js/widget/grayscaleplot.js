function GrayScalePlot(args){
	this.width = 500;
	this.height = 100;
	this.id = BUI.id();

	if (args != null){
		if (args.width != null){
			this.width = args.width;
		}
		if (args.height != null){
			this.height = args.height;
		}
	}
}

GrayScalePlot.prototype.getText = function(){
	return "Click on two points to calculate the intensity";
};


GrayScalePlot.prototype.getPanel = function(){
	return "<div id=" + this.id +" style='text-align:center;width:" + this.width +"px;height:" + this.height +"px;'>" + this.getText() +"</div>";
};

GrayScalePlot.prototype.reset = function(){
	document.getElementById(this.id).innerHTML = this.getText();
};

GrayScalePlot.prototype.load = function(colors){
	if (colors != null){
		if (colors.length != null){
			var div = document.getElementById(this.id);
			var data = [];

			for (var i = 0; i < colors.length; i++){
				data.push([i, 255 - colors[i].luminance]);
	
			}
			try{
				new Dygraph(div, 
				  data, {
				  	title : 'Intensity'
				  	//ylabel: 'Intensity',
				});
			}
			catch(e){}
		}
	}

};
