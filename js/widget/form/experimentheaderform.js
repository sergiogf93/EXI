/**
 * Shows the header for the experiments changing the color and parameters depending on experiment type
 * 
 */
function ExperimentHeaderForm(args) {
	this.id = BUI.id();
	this.backgroundColor = '#FFFFFF';
}


ExperimentHeaderForm.prototype.load = function(experiment) {
	this.experiment = experiment;
	Ext.getCmp(this.id + "name").setValue(experiment.name);
	document.getElementById(this.id + "date").innerHTML = "Created on " + (experiment.creationDate);
	Ext.getCmp(this.id + "comments").setValue(experiment.json.comments);
};


ExperimentHeaderForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        {
	            text: 'Save',
	            width : 100,
	            handler : function(){
	            	var adapter = new DataAdapter();
	            	_this.panel.setLoading();
	            	adapter.onSuccess.attach(function(sender){
	            		_this.panel.setLoading(false);
	            		
	            	});
	            	adapter.saveExperiment(_this.experiment.experimentId, 
	            			Ext.getCmp(_this.id + "name").getValue(), 
	            			Ext.getCmp(_this.id + "comments").getValue());
	            }
	        },
	        '->',
	        Ext.create('Ext.button.Split', {
	            text: 'Download',
	            menu: new Ext.menu.Menu({
	                items: [
	                    {text: 'For BsxCube on bm29', handler: function(){
	                    		window.open(new DataAdapter().getTemplateSourceFile(_this.experiment.experimentId, "bsxcube")); 
	                    	}
	                    },
	                    {text: 'For Becquerel on p12', handler: function(){
	                    		window.open(new DataAdapter().getTemplateSourceFile(_this.experiment.experimentId, "becquerel"));
	                    	}
	                    }
	                ]
	            })
	        })
	];
//	return Ext.create('Ext.toolbar.Toolbar', {
//		cls : 'exi-top-bar',
//		height : 45,
//	    items: [
//	        {
//	            text: 'Save',
//	            width : 100,
//	            handler : function(){
//	            	var adapter = new DataAdapter();
//	            	_this.panel.setLoading();
//	            	adapter.onSuccess.attach(function(sender){
//	            		_this.panel.setLoading(false);
//	            		
//	            	});
//	            	adapter.saveExperiment(_this.experiment.experimentId, 
//	            			Ext.getCmp(_this.id + "name").getValue(), 
//	            			Ext.getCmp(_this.id + "comments").getValue());
//	            }
//	        },
//	        '->',
//	        Ext.create('Ext.button.Split', {
//	            text: 'Download',
//	            // handle a click on the button itself
//	            handler: function() {
//	                alert("The button was clicked");
//	            },
//	            menu: new Ext.menu.Menu({
//	                items: [
//	                    {text: 'For BsxCube on bm29', handler: function(){
//	                    		console.log(new DataAdapter().getTemplateSourceFile(_this.experiment.experimentId, "bsxcube"));
//	                    		window.open(new DataAdapter().getTemplateSourceFile(_this.experiment.experimentId, "bsxcube")); 
//	                    	}
//	                    },
//	                    {text: 'For Becquerel on p12', handler: function(){
//	                    		window.open(new DataAdapter().getTemplateSourceFile(_this.experiment.experimentId, "becquerel"));
//	                    	}
//	                    }
//	                ]
//	            })
//	        })
//	        
//	    ]
//	});
};

ExperimentHeaderForm.prototype.getPanel = function() {
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		buttons : this.getToolBar(),
		style : {
						borderColor : 'gray',
						borderStyle : 'solid',
						borderWidth : '1px',
						backgroundColor : 'white' 
		},
		items : [
		         {
				xtype : 'container',
				margin : '10 0 0 20',
				layout : 'hbox',
				items : [ {
					xtype : 'container',
					layout : 'vbox',
					items : [ {
								xtype : 'textfield',
								fieldLabel : 'Name' ,
								id : this.id + "name"
						}, 
						{
								margin : '0 0 0 100',
								html : "<div style='color:gray;' id='" + this.id + "date';></div>"
						},
						 ] 
				},
				{
					xtype : 'textarea',
					fieldLabel : 'Comments',
					margin : '0 0 10 20',
					width : 600 ,
					height : 80 ,
					id : this.id + "comments"
				}

				]  }
		] });
	return this.panel;
};

