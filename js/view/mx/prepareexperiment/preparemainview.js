function PrepareMainView() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);

    this.dewarListSelector = new DewarListSelector({height : 300});
    /*this.dewarListSelector.onSelect.attach(function(sender, dewars){
       console.log(dewars);  
         
    });*/
	this.containerListEditor = new ContainerListEditor();

}



PrepareMainView.prototype.getPanel = function() {
   
     return Ext.create('Ext.container.Container', {
        layout: {
            type: 'hbox'
        },
        width: 400,
        
        border: 1,
        style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
       
        items: [this.dewarListSelector.getPanel(),this.dewarListSelector.getPanel()]
    });

	this.panel =  Ext.create('Ext.panel.Panel', {
           layout : 'hbox',
            items : [
                        this.dewarListSelector.getPanel(), 
                        //this.containerListEditor.getPanel()        
            ]
	});
    
    return this.panel;
};




PrepareMainView.prototype.load = function(dewars) {
	//this.panel.setTitle("Prepare Experiment");
    
	// this.containerListEditor.load(dewars);
try{
debugger
    	 this.dewarListSelector.load(dewars);
}catch(e){console.log(e)}
};
