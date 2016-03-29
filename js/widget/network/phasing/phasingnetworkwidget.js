/**
* This class renders a network graph with the PhasingStep
*
* @class PhasingNetworkWidget
* @constructor
*/
function PhasingNetworkWidget(args){
	this.id = BUI.id();
	this.data = [];

	/** "OPEN_VIEWER" **/
	this.tbar = "MENU";
	
	this.layout = {
			improvedLayout : true
			
	};
    
	if (args != null){
		if (args.tbar != null){
			this.tbar = args.tbar;
		}
	}
}

PhasingNetworkWidget.prototype.clear = function(){
	document.getElementById(this.id).innerHTML = "";
};

PhasingNetworkWidget.prototype.getTbar = function(){
	var _this = this;
	if (this.tbar == "MENU"){
		return [
						Ext.create('Ext.button.Split', {
						    text: 'View',
						    handler: function() {
						       
						    },
						    menu: new Ext.menu.Menu({
						        items: [
									{
										text: 'Default', 
										handler: function(){ 
											_this.layout = {
											    };
											_this.render();
										
									}},
						            {
						            	text: 'Horizontal',      	
						            	handler: function(){ 
						            		_this.layout = {
						            		        hierarchical: {
						            		            direction: "UD",
						            		            levelSeparation : 100
						            		        }
						            		    };
						            		_this.render();
						            	
						            }},
						            {
 
						            	text: 'Vertical', 
						            	handler: function(){ 
						            		_this.layout = {
						            		        hierarchical: {
						            		            direction: "LR",
						            		            levelSeparation : 100
						            		        }
						            		    };
						            		_this.render();
						            	
						            }},
						        ]
						    })
						})
		       ];
		
	}
	else{
		return [
		           { 
		        	   xtype: 'button', 
		        	   text: 'Open Viewer', 
		        	   handler : function(sender){
		        		   location.hash = "/autoprocintegration/datacollection/" + _this.data[0].v_datacollection_summary_phasing_dataCollectionId + "/phasingviewer/main";
		        	   } 
		           }
	    ];
	}
};

PhasingNetworkWidget.prototype.getPanel = function(){
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
	   layout : 'fit',
	    border: 1,
	    margin : 5,
	    tbar: this.getTbar(),
	    cls : "borderGrid",
	    items: [
	    {
	    	html : "<div style=' height: 600px;min-height: 100% !important;display:block;overflow:auto;' id='" + this.id +"'>Select an autoprocIntegration</div>"
	    }],
	    listeners : {
			afterrender : function(component, eOpts) {
				_this.render();
		}
	    }
	});
	return this.panel;
};


PhasingNetworkWidget.prototype.getLabelByNode = function(node){
	if (node.v_datacollection_summary_phasing_phasingStepType == "PREPARE"){
		return "PR" +
				"\n" +
				node.v_datacollection_summary_phasing_phasingPrograms +
				"\n" +
				node.v_datacollection_summary_phasing_lowRes + " - " + node.v_datacollection_summary_phasing_highRes +
				"\n" +
				node.v_datacollection_summary_phasing_spaceGroupShortName +
				"\n" +
				node.v_datacollection_summary_phasing_method
				
		
	}
	
	if (node.v_datacollection_summary_phasing_phasingStepType == "PHASING"){
		return "PH" +
		"\n" +
		node.v_datacollection_summary_phasing_phasingPrograms +
		"\n" +
		node.v_datacollection_summary_phasing_spaceGroupShortName +
		"\n" +
		node.v_datacollection_summary_phasing_lowRes + " - " + node.v_datacollection_summary_phasing_highRes +
		"\n" +
		"Enan: " + node.v_datacollection_summary_phasing_enantiomorph + 
		"\n" +
		"Solvent: " + node.v_datacollection_summary_phasing_solventContent;
		
	}
	
	if (node.v_datacollection_summary_phasing_phasingStepType == "SUBSTRUCTUREDETERMINATION"){
		return "SUB" +
		"\n" +
		node.v_datacollection_summary_phasing_phasingPrograms +
		"\n" +
		node.v_datacollection_summary_phasing_spaceGroupShortName +
		"\n" +
		node.v_datacollection_summary_phasing_lowRes + " - " + node.v_datacollection_summary_phasing_highRes; 
	}
	return node.v_datacollection_summary_phasing_phasingStepType;
};
/**
* It renders the network by using viz.js
* http://visjs.org/
*
* @method render
*/
PhasingNetworkWidget.prototype.render = function(){
	var _this =this;
	 
	_this.panel.setLoading("Rendering");
//	$.when(_this._render()).then(function( data, textStatus, jqXHR ) {
//		  _this.panel.setLoading(false);
//	});
	/* contrived example alert */
	setTimeout(function(){  _this.panel.setLoading(false); }, 6000);
	setTimeout(function(){ _this._render(); }, 1000);
//	_this._render();
	
};


PhasingNetworkWidget.prototype._render = function(){
	var nodes = [];
	var edges = [];
	
	/** Start Node **/
	nodes.push({
		id 		: 1,
		label 	: "START",
		font	: {size:32}
	});
	
	for (var i = 0; i < this.data.length; i++) {
		if (this.data[i].v_datacollection_summary_phasing_phasingStepId != null){
			var color = 'lime';
			switch(this.data[i].v_datacollection_summary_phasing_phasingStepType) {
				    case "PREPARE":
				        color = "#FF5733";
				        break;
				    case "SUBSTRUCTUREDETERMINATION":
				    	color = "#FFF8A8";
				        break;
				    default:
				    	color = '#B7A800';
			}
			
			nodes.push({
				id 		: this.data[i].v_datacollection_summary_phasing_phasingStepId,
				label 	: this.getLabelByNode(this.data[i]),// + "-- " + this.data[i].v_datacollection_summary_phasing_spaceGroupShortName,
				color	: color,
				font	: {size:8}
			});
			
			
			/** Edges **/
			var previous = this.data[i].v_datacollection_summary_phasing_previousPhasingStepId;
			var label = "";
			
			/** This is root **/
			if (previous == null){
//					label = this.data[i].v_datacollection_summary_phasing_spaceGroupShortName;
					if (this.data[i].v_datacollection_summary_phasing_phasingStepType == "PHASING"){
						previous = -1;
					}
					else{
						/** Adding spacegroup Node**/
						nodes.push({
							id 		: this.data[i].v_datacollection_summary_phasing_phasingStepId + this.data[i].v_datacollection_summary_phasing_spaceGroupShortName,
							label 	: this.data[i].v_datacollection_summary_phasing_spaceGroupShortName,
							color	: "orange",
							font	: {size:32}
						});
						previous = this.data[i].v_datacollection_summary_phasing_phasingStepId + this.data[i].v_datacollection_summary_phasing_spaceGroupShortName;
						
						edges.push({
							 from	: 1, 
							 to		: this.data[i].v_datacollection_summary_phasing_phasingStepId + this.data[i].v_datacollection_summary_phasing_spaceGroupShortName,
							 label	: label,
							 arrows	:'to',
							 font	: {size:32}
						});
					}
			}
			
			
			
			
			edges.push({
					 from	: previous, 
					 to		: this.data[i].v_datacollection_summary_phasing_phasingStepId,
					 label	: label,
					 arrows	:'to',
					 font	: {size:32}
			});
		}
	}
	  var container = document.getElementById('mynetwork');
	  var data = {
	    nodes: nodes,
	    edges: edges
	  };
	  var options = {
			  edges: {
//                  smooth: {
//                      type: 'cubicBezier',
//                      forceDirection: 'vertical' ,
//                      roundness: 0.4,
//                  },
              },
			  layout : this.layout
	  };
	  
	  this.network = new vis.Network(document.getElementById(this.id), data, options)
};

/**
* It just loads the data but it will not be rendered
* Rendering is done when afterrender method is triggered
*
* @method load
* @param {Object} autoprocIntegrationList This is a list of autoprocintegration retrieved from the phasing view
*/
PhasingNetworkWidget.prototype.load = function(autoprocIntegrationList){	
	/** First we concat all arrays **/
	this.data = [].concat.apply([], autoprocIntegrationList);
	
	if (document.getElementById(this.id) != null){
		this.clear();
		this.render();
	}
	
	
};
