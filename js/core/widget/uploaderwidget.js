<<<<<<< HEAD
function UploaderWidget(url){
	this.id = BUI.id();

	this.url = url;
	if (url == null){
=======
function UploaderWidget(args){
	this.id = BUI.id();

	this.url = null;
	if (args) {
		if (args.url) {
			this.url = args.url;
		}
	}
	if (this.url == null){
>>>>>>> mx_121216
		 Ext.Msg.alert('Error', 'Please, set an url');
	}
	
	
	this.onUploaded = new Event(this);
}

UploaderWidget.prototype.getFileName = function(){
	var filePath =  Ext.getCmp(this.id).value;
	return filePath.split("\\")[filePath.split("\\").length - 1];
};

UploaderWidget.prototype.getForm = function(){
	var _this = this;
	return Ext.create('Ext.form.Panel', {
<<<<<<< HEAD
	    width: 400,
	    bodyPadding: 20,
	    border : 0,
	    frame: true,
	    items: [{
	        xtype: 'filefield',
	        name: 'file',
	        id : this.id,
	        fieldLabel: 'File',
	        labelWidth: 50,
	        msgTarget: 'side',
	        allowBlank: false,
	        anchor: '100%',
	        buttonText: 'Browse...'
	    },
	    {
			xtype : 'hiddenfield',
			id : _this.id + 'fileName',
			name : 'fileName',
			value : '' }
	    ],

	    buttons: [{
=======
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
	    bodyPadding: 20,
	    border : 0,
	    frame: true,
	    items: [
			{
				xtype: 'filefield',
				name: 'file',
				width: 400,
				id : this.id,
				fieldLabel: 'File',
				labelWidth: 30,
				msgTarget: 'side',
				allowBlank: false,
				buttonText: 'Browse...'
			},
			// {
			// 	xtype : 'hiddenfield',
			// 	id : _this.id + 'fileName',
			// 	name : 'fileName',
			// 	value : '' 
			// },
			{
			xtype : 'button',
			margin: '0 0 0 2',
>>>>>>> mx_121216
	        text: 'Upload',
	        handler: function() {
	            var form = this.up('form').getForm();
	            if(form.isValid()){
<<<<<<< HEAD
	            	Ext.getCmp(_this.id + "fileName").setValue(_this.getFileName());
=======
	            	// Ext.getCmp(_this.id + "fileName").setValue(_this.getFileName());
>>>>>>> mx_121216
	                form.submit({
	                    url: _this.url,
	                    waitMsg: 'Uploading your file...',
	                    success: function(fp, o) {
//	                        Ext.Msg.alert('Success', 'Your file has been uploaded.');
<<<<<<< HEAD
	                    	
=======
	                    	debugger
>>>>>>> mx_121216
	                    	_this.window.close();
	                    	_this.onUploaded.notify();
	                    },
	                    failure : function(fp, o) {
//	                    	Ext.Msg.alert('Failure', 'Processed file "' + o.result.file + '" on the server');
	                    	_this.window.close();
	                    	_this.onUploaded.notify();
	                    } });
	            }
	        }
<<<<<<< HEAD
	    }]
=======
	    }
	    ],
>>>>>>> mx_121216
	});
	
	
};



UploaderWidget.prototype.show = function(){
	this.window = Ext.create('Ext.window.Window', {
	    title: 'ISPyB File Uploader Manager',
	    height: 200,
	    modal : true,
	    icon : '../images/icon/upload.svg',
	    width: 600,
	    layout: 'fit',
	    items: this.getForm()
	});
	this.window.show();
<<<<<<< HEAD
	
	
=======
>>>>>>> mx_121216
};