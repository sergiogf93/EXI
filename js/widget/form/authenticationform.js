function AuthenticationForm(){
	this.onAuthenticate = new Event(this);
}
AuthenticationForm.prototype.show = function(){
	this.window = Ext.create('Ext.window.Window', {
	    title: 'Authentication',
	    height: 250,
//	    closable :  EXI.localExtorage.tokenManager.getTokens().length > 0,
	    width: 400,
	    modal : true,
	    layout: 'fit',
	    items: [
	            this.getPanel()
        ]}
	);
	this.window.show();
};

AuthenticationForm.prototype.getPanel = function(){
	var _this = this;
	var sites = Ext.create('Ext.data.Store', {
	    fields: ['name', 'url'],
	    data : ExtISPyB.sites
	});
	
	return Ext.create('Ext.form.Panel', {
	    bodyPadding: 5,
	    width: 350,
	    layout: 'anchor',
	    defaults: {
	        anchor: '90%'
	    },
	    // The fields
	    defaultType: 'textfield',
	    items: [{
	        fieldLabel: 'User',
	        name: 'user',
	        margin : '10 0 0 10',
	        allowBlank: false
	    },{
	        fieldLabel: 'Password',
	        margin : '10 0 0 10',
	        name: 'password',
	        allowBlank: false,
	        inputType : 'password'
	    },{
	    	xtype : 'combo',
	        fieldLabel: 'Choose site',
	        name: 'site',
	        store : sites,
	        allowBlank: false,
	        valueField : 'url',
	        displayField : 'name',
	        margin : '10 0 0 10'
	    }],

	    buttons: [ {
	        text: 'Login',
	        formBind: true,
	        disabled: true,
	        handler: function() {
	        	var form = this.up('form').getForm();
	        	_this.onAuthenticate.notify({
	        		user : form.getFieldValues().user, 
	        		password : form.getFieldValues().password, 
	        		site : form.getFieldValues().site
	        	});

	        }
	    }]
	});
};




