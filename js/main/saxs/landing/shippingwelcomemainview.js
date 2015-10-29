function ShippingWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
}

ShippingWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

ShippingWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Shipments</h2></div>'
							         },
							         {
							        	 html : '<div class="landing-text"> A Shipment consists of a set of Dewars which is sent from your home lab to the synchrotron via a courier company. Each dry shipping Dewar within the shipment is identified by a label (barcode or sticker). The dewars(s) contains a set of Containers (Pucks or canes). Containers (typically Pucks), contain Samples. A Sample (Sample Holder) contains the Crystal</div><br/>',
							        	 margin : '0 0 0 20'
							         },
//							         {
//							        	 html : '<div class="landing-text"><img src="../images/ShippingObjects_02.png" /></div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         {
//							        	 html : '<div class="landing-text">Tracking your shipment & contents (Dewars, toolboxes etc) allows you to follow the progress of your shipment from your home Lab to The ESRF.</div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         
//							         {
//							        	 html : '<div class="landing-text"><img src="../images/dewarTrackingWF_01.png" /></div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         {
//							        	 html : this.getOptions(),
//							        	 margin : '0 0 0 40'
//							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">Do you want to ship your samples to the beamline?</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Create a new Shipment</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){

										        		 if (EXI.proposalManager.getFutureSessions().length > 0){
										     				location.hash = '/shipping/main';
										     			 }
										        		 else{
											        		 BUI.showError("Sorry, there are not sessions scheduled for this proposal");
										        		 }
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


ShippingWelcomeMainView.prototype.load = function() {
	
};
