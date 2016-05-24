function AutoProcIntegrationAttachmentGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	
	this.maxHeight = 300;
	this.margin = '10 0 0 0';
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.searchBar != null) {
			this.searchBar = args.searchBar;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.collapsed != null) {
			this.collapsed = args.collapsed;
		}

		if (args.width != null) {
			this.width = args.width;
		}
		if (args.margin != null) {
			this.margin = args.margin;
		}
		if (args.maxHeight != null) {
			this.maxHeight = args.maxHeight;
		}
	}
	this.onSelected = new Event(this);
};


AutoProcIntegrationAttachmentGrid.prototype.load = function(data) {
    if (data){
	       this.store.loadData(data, false);
    }
};

AutoProcIntegrationAttachmentGrid.prototype.selectRowByAutoProcIntegrationId = function(autoProcIntegrationId) {
	this.panel.getSelectionModel().select(this.store.find("autoProcIntegrationId", autoProcIntegrationId));
};

AutoProcIntegrationAttachmentGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {

		fields : [  ]
	});

    
	
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Auto-Processing Files',
		store : this.store,
		cls : 'border-grid',
		margin : this.margin,
		overflow :'auto',
        height : 500,
		//width : this.width - 20,
		columns : [ 
		
		{
			text : 'fileName',
			dataIndex : 'fileName',
			flex : 1,
			renderer : function(grid, opt, val, val2, val3){
				if (val.data.fileName.indexOf("XSCALE") != -1){
					return "<span style='color:green; font-weight: bold;'>" + val.data.fileName +"</span>";
				}
				return val.data.fileName;
			}
		}, 
		{
            xtype:'actioncolumn',
            flex : 0.3,
            text : 'Download',
            items: [{
                icon: '../images/icon/ic_get_app_black_24dp.png',  // Use a URL in the icon config
                tooltip: 'Download',
                handler: function(grid, rowIndex, colIndex) {
                	window.open(EXI.getDataAdapter().mx.autoproc.getDownloadAttachmentUrl(grid.store.getAt(rowIndex).data.autoProcProgramAttachmentId)); 
                }
            }]
        }
		],
		flex : 1,
		viewConfig : {
			stripeRows : true,
			listeners : {
			}
		}
	});

	return this.panel;
};




