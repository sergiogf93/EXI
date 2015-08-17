AutoProcIntegrationMainView.prototype.getPanel = MainView.prototype.getPanel;

function AutoProcIntegrationMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	
	this.autoProcIntegrationGrid = new AutoProcIntegrationGrid();
	/** Curve completenessPlotter * */
	this.completenessPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Completeness vs Resolution"
	});
	
	this.rFactorPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Rfactor vs Resolution"
	});
	
	this.isigmaPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "I/SigmaI vs Resolution"
	});


	this.cc2Plotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "CC/2 vs Resolution"
	});

}


AutoProcIntegrationMainView.prototype.getSlavePanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
//		cls 	: 'defaultGridPanel',
		margin : 5,
		border : 0,
		 height : 1400, 
		items : [ 
		         {
		        	 xtype : 'panel',
		        	 flex : 0.7,
		        	
		        	 type: 'vhbox',
		        	 items : [
		     		        	          this.rFactorPlotter.getPanel(),
		     		        	          this.isigmaPlotter.getPanel(),
		     		        	          this.completenessPlotter.getPanel(),
		     		        	          this.cc2Plotter.getPanel()
		        	 ]
		         },
		         
		         {
		        	 xtype : 'panel',
		        	 layout: {
		        	        type: 'accordion',
		        	        titleCollapse: false,
		        	        animate: true,
		        	        activeOnTop: true
		        	    },
		        	    flex : 0.3,
		        	 items : [
		        	          this.autoProcIntegrationGrid.getPanel()
		        	         
		        	          ]
		         }
		       
		        
		    ]
	};

};


AutoProcIntegrationMainView.prototype.getContainer = function() {
	return {
		xtype : 'container',
		items : [
//		         	this.grid.getPanel(),
		        	this.getSlavePanel()         
		]
	};
};


AutoProcIntegrationMainView.prototype.groupBy = function(array , f ){
	  var groups = {};
	  array.forEach( function( o )
	  {
	    var group = JSON.stringify( f(o) );
	    groups[group] = groups[group] || [];
	    groups[group].push( o );  
	  });
	  return Object.keys(groups).map( function( group ){
		  return groups[group]; 
	  });
	};


	
	
	
AutoProcIntegrationMainView.prototype.load = function(dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Phasing");
	var onSuccess = function(sender, data){
		
		/** Loading grid **/
		data =  _this.groupBy(data, function(item){
			  return [item.AutoProcIntegration_autoProcIntegrationId];
		});
		var autos = [];
		var autosId = [];
		for (var i = 0; i < data.length; i++) {
			autos.push(data[i][0]);
			autosId.push(data[i][0].AutoProcIntegration_autoProcIntegrationId);
		}
		_this.autoProcIntegrationGrid.load(autos);
		
		_this.completenessPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleCompleteness(autosId));
		_this.rFactorPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleRfactor(autosId));
		_this.isigmaPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleISigma(autosId));
		_this.cc2Plotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleCC2(autosId));
		
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoProcIntegrationDataAdapter.getByDataCollectionId(dataCollectionId);
};


