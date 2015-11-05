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


GrayScalePlot.prototype.getPanel = function(){
	return "<div id=" + this.id +" style='border:1px solid black;width:" + this.width +"px;height:" + this.height +"px;'></div>";
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
				  title: 'Luminance',
				  ylabel: 'Intensity',
				});
			}
			catch(e){}
		}
	}

};
