function StockSolutionContainer(args) {
    this.id = BUI.id();
	
    this.templateData = {
                            id          	: this.id,
                            xmargin     	: 0,
                            ymargin     	: 0,
                            mainRadius  	: 50,
                            width       	: 100,
                            height      	: 100,
                            r           	: 20,
							enableMainClick : false,
                            code            : "",
                            enableClick     : false
                        };

	this.stockSolutionId = 0;
    this.samples = null;

	if (args){
		if (args.xMargin){
			this.templateData.xMargin = args.xMargin;
		}
		if (args.yMargin){
			this.templateData.yMargin = args.yMargin;
		}
		if (args.enableMainClick != null){
			this.templateData.enableMainClick = args.enableMainClick;
		}
        if (args.mainRadius){
			this.templateData.mainRadius = args.mainRadius;
			this.templateData.width = 2*args.mainRadius;
			this.templateData.height = 2*args.mainRadius;
			this.templateData.r = args.mainRadius/5;
		}
        if (args.code) {
            this.templateData.code = args.code;
        }
        if (args.enableClick != null) {
            this.templateData.enableClick = args.enableClick;
        }
        if (args.stockSolutionId) {
            this.stockSolutionId = args.stockSolutionId;
            var stockSolution = EXI.proposalManager.getStockSolutionById(this.stockSolutionId);
            this.templateData.macromoleculeAcronym = EXI.proposalManager.getMacromoleculeById(stockSolution.macromoleculeId).acronym;
            this.templateData.buffer = EXI.proposalManager.getBufferById(stockSolution.bufferId).acronym;
        }
	}

	this.onClick = new Event(this);
};

StockSolutionContainer.prototype.getPanel = function () {
	
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
            cls : 'border-grid',
		    
            items : [
						{
							html : this.getHTML(),
							width : this.templateData.width + 1,
							height : this.templateData.height + 1
						}
			],
			
	});

	this.panel.on('boxready', function() {
        if(_this.templateData.enableMainClick) {
			$("#" + _this.id).unbind('click').click(function(sender){
				_this.onClick.notify(sender.target.id);
			});
		}
    });
	
	return this.panel;
	
};

StockSolutionContainer.prototype.loadSamples = function (samples) {
    this.samples = samples;
    if (samples){
		if (samples.length > 0){
			this.containerId = samples[0].Container_containerId; 
		}
	}
};

StockSolutionContainer.prototype.getHTML = function (samples) {
	var html = "";
	dust.render("stock.solution.container.template", this.templateData, function(err, out){
		html = out;
	});
	
	return html;
};

