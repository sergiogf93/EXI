function AddContainerForm(args) {
    this.id = BUI.id();

    this.width = 600;
    this.height = 200;
	this.showTitle = true;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.height != null) {
			this.height = args.height;
		}
	}

    this.containerTypeComboBox = new ContainerTypeComboBox();
}

AddContainerForm.prototype.getPanel = function(dewar) {
    this.panel = Ext.create('Ext.form.Panel', {
        width : this.width - 10,
        height : this.height,
//			cls : 'border-grid',
//			margin : 10,
        padding : 10,
        items : [ {
                        xtype : 'container',
                        margin : "2 2 2 2",
                        collapsible : false,
                        defaultType : 'textfield',
                        layout : 'anchor',
                        items : [ {
                            xtype : 'container',
                            margin : '5 0 5 5',
                            layout : 'vbox',
                            items : [ {
                                xtype : 'textfield',
                                fieldLabel : 'Name',
                                name : 'code',
                                id : this.id + 'container_code',
                                labelWidth : 200,
                                width : 500
                            }
                            ]
                        }, 
                        this.containerTypeComboBox.getPanel()
            ]
        } ]
    });
	// this.refresh(dewar);
	return this.panel;
};

AddContainerForm.prototype.getContainer = function () {
    this.container = {};
    this.container.code = Ext.getCmp(this.id + "container_code").getValue();
    this.container.type = this.containerTypeComboBox.getSelectedType();
    this.container.capacity = this.containerTypeComboBox.getSelectedCapacity();
    return this.container;
}