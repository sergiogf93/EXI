function AddressWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
}

AddressWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;


AddressWelcomeMainView.prototype.getContainer = function() {
    var _this = this;
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
							        	 html : '<div class="landing-title" ><h2>Address</h2></div>'
							         },
							        //  {
							        // 	 html : '<div class="landing-text"> A Shipment consists of a set of Dewars which is sent from your home lab to the synchrotron via a courier company. Each dry shipping Dewar within the shipment is identified by a label (barcode or sticker). The dewars(s) contains a set of Containers (Pucks or canes). Containers (typically Pucks), contain Samples. A Sample (Sample Holder) contains the Crystal</div><br/>',
							        // 	 margin : '0 0 0 20'
							        //  },
							        //  {
							        // 	 html : '<br/><div class="landing-text">Do you want to ship your samples to the beamline?</div><br/>',
							        // 	 margin : '0 0 0 20'
							        //  },
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
										        	 text : '<div class="square-option-text"; >Create a new Address</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										     				_this.createAddress();
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


AddressWelcomeMainView.prototype.load = function() {
	
};

AddressWelcomeMainView.prototype.createAddress = function () {
    var _this = this;
	var addressEditForm = new AddressEditForm({width : Ext.getBody().getWidth()*0.8});
	
	addressEditForm.onSaved.attach(function (sender, address) {
		window.close();
		location.hash = "#/proposal/address/" + address.labContactId + "/main";
	});

	var window = Ext.create('Ext.window.Window', {
		title : 'Shipping Address Card',
		height : 500,
		width : Ext.getBody().getWidth()*0.81,
		modal : true,
		layout : 'fit',
		items : [ addressEditForm.getPanel() ],
		buttons : [ {
				text : 'Save',
				handler : function() {
					addressEditForm.save();
				}
			}, {
				text : 'Cancel',
				handler : function() {
					window.close();
				}
			} ]
	}).show();

	addressEditForm.load();
}