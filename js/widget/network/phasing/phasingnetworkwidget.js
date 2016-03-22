/**
* This class renders a network graph with the PhasingStep
*
* @class PhasingNetworkWidget
* @constructor
*/
function PhasingNetworkWidget(){
	this.id = BUI.id();
	this.data = [];
}



PhasingNetworkWidget.prototype.clear = function(){
	document.getElementById(this.id).innerHTML = "";
};

PhasingNetworkWidget.prototype.getPanel = function(){
	var _this = this;
	return Ext.create('Ext.panel.Panel', {
	   layout : 'fit',
	    border: 1,
	    margin : 5,
	    tbar: [
	           { 
	        	   xtype: 'button', 
	        	   text: 'Open Viewer', 
	        	   handler : function(sender){
	        		   location.hash = "/autoprocintegration/datacollection/" + _this.data[0].v_datacollection_summary_phasing_dataCollectionId + "/phasingviewer/main";
	        	   } 
	           }
	         ],
	    cls : "borderGrid",
	    items: [
	    {
	    	html : "<div style=' height: 600px;min-height: 100% !important;display:block;overflow:auto;' id='" + this.id +"'>Select an autoprocIntegration</div>"
	    }],
	    listeners : {
			afterrender : function(component, eOpts) {
				_this.render(_this.data);
		}
	    }
	});
};

/**
* It renders the network by using viz.js
* http://visjs.org/
*
* @method render
*/
PhasingNetworkWidget.prototype.render = function(){
	var nodes = [];
	var edges = [];
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
//				label 	: this.data[i].v_datacollection_summary_phasing_phasingStepType + "-- " + this.data[i].v_datacollection_summary_phasing_phasingStepId+ "-- " + this.data[i].v_datacollection_summary_phasing_previousPhasingStepId,
				label 	: this.data[i].v_datacollection_summary_phasing_phasingStepType + "-- " + this.data[i].v_datacollection_summary_phasing_spaceGroupShortName,
				color	: color
			});
			
			edges.push({
					 from	: this.data[i].v_datacollection_summary_phasing_previousPhasingStepId, 
					 to		: this.data[i].v_datacollection_summary_phasing_phasingStepId,
					 arrows:'to'
			});
		}
	}
	  // create an array with nodes
//	  var nodes = new vis.DataSet([
//	    {id: 1, label: 'Node 1'},
//	    {id: 2, label: 'Node 2'},
//	    {id: 3, label: 'Node 3'},
//	    {id: 4, label: 'Node 4'},
//	    {id: 5, label: 'Node 5'}
//	  ]);
//
//	  // create an array with edges
//	  var edges = new vis.DataSet([
//	    {from: 1, to: 3},
//	    {from: 1, to: 2},
//	    {from: 2, to: 4},
//	    {from: 2, to: 5}
//	  ]);
	

	  // create a network
	  var container = document.getElementById('mynetwork');
	  var data = {
	    nodes: nodes,
	    edges: edges
	  };
	  var options = {
//			  edges: {
//                  smooth: {
//                      type: 'cubicBezier',
//                      forceDirection: 'vertical' ,
//                      roundness: 0.4
//                  }
//              },
//			  layout: {
//		          hierarchical: {
//		            sortMethod: "directed",
//		            direction: "LR"
//		          }
//		        }
	  };
	  var network = new vis.Network(document.getElementById(this.id), data, options);
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
