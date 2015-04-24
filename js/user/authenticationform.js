function AuthenticationForm(){
	
	
	
}
AuthenticationForm.prototype.show = function(){
	Ext.create('Ext.window.Window', {
	    title: 'Authentication',
	    height: 200,
	    width: 400,
	    layout: 'fit',
	    items: [
	            this.getPanel()
        ]}
	).show();
};

AuthenticationForm.prototype.getPanel = function(){
	return Ext.create('Ext.form.Panel', {
	    bodyPadding: 5,
	    width: 350,
	    layout: 'anchor',
	    defaults: {
	        anchor: '100%'
	    },

	    // The fields
	    defaultType: 'textfield',
	    items: [{
	        fieldLabel: 'User',
	        name: 'user',
	        allowBlank: false
	    },{
	        fieldLabel: 'Password',
	        name: 'password',
	        allowBlank: false,
	        inputType : 'password'
	    }],

	    buttons: [ {
	        text: 'Login',
	        formBind: true,
	        disabled: true,
	        handler: function() {
	        	var form = this.up('form').getForm();
	        	AuthenticationController.login(form.getFieldValues().user, form.getFieldValues().password);
	        }
	    }]
	});
};




