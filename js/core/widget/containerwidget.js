function ContainerWidget(args) {
    this.id = BUI.id();
	
    this.templateData = {
                            id          : this.id,
                            xmargin     : 0,
                            ymargin     : 0,
                            mainRadius  : 50,
                            width       : 100,
                            height      : 100,
                            r           : 20
                        };
	this.containerId = 0;
    this.samples = null;

	if (args){
		if (args.xMargin){
			this.templateData.xMargin = args.xMargin;
		}
		if (args.yMargin){
			this.templateData.yMargin = args.yMargin;
		}
        if (args.mainRadius){
			this.templateData.mainRadius = args.mainRadius;
			this.templateData.width = 2*args.mainRadius;
			this.templateData.height = 2*args.mainRadius;
			this.templateData.r = args.mainRadius/5;
		}
	}
};

ContainerWidget.prototype.getPanel = function () {
	
	var _this = this;
	
	this.panel =  Ext.create('Ext.panel.Panel', {
            id: this.id + "-container",
		    x: this.templateData.xMargin,
		    y: this.templateData.yMargin,
		    width : this.templateData.width + 1,
		    height : this.templateData.height + 1,
		//    cls:'border-grid',
		    frame: false,
			border: false,
			bodyStyle: 'background:transparent;',
		    
            items : [
						{
							html : this.getSVG(),
							width : this.templateData.width + 1,
							height : this.templateData.height + 1
						}
			],
			
	});
	
	return this.panel;
	
};

ContainerWidget.prototype.loadSamples = function (samples) {
    this.samples = samples;
    if (samples){
		if (samples.length > 0){
			this.containerId = samples[0].Container_containerId; 
		}
	}
};

ContainerWidget.prototype.getSVG = function (samples) {
	var html = "";
	dust.render("container.widget.template", this.templateData, function(err, out){
		html = out;
	});
	
	return html;
};

