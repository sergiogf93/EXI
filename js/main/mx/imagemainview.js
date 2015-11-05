function ImageMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;

	this.imageViewer = new ImageResolutionViewer();

	this.detectorResolution = {
				
				pixelSize: {
						x : 1475,
						y : 1679
				},
				sensitiveArea : {
						x : 253.7,
						y : 288.8
				},
				pixelSizeHorizontal : 0.172

	};
}

ImageMainView.prototype.getPanel = MainView.prototype.getPanel;

ImageMainView.prototype.getContainer = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '10 30 10 10',
				items : [

					{
						tabConfig : {
							title : 'Test'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
								this.imageViewer.getPanel()
								
							]
						}
						]
				  	},
					{
						tabConfig : {
							title : 'Parameters'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
								this.getParametersGrid()
							]
						}
						]
				  	}
					



				  ]
		});
};




ImageMainView.prototype.getParametersGrid = function(imageId, dataCollectionId) {
	this.storeParameters = Ext.create('Ext.data.Store', {
	    fields:['key', 'value'],
            sorters : 'key'
	});

	this.parametersPanel = Ext.create('Ext.grid.Panel', {
	    title: 'Parameters',
	    store: this.storeParameters,
	    columns: [
		{ text: 'Key',  dataIndex: 'key', flex: 0.2 },
		{ text: 'Value', dataIndex: 'value', flex: 1 }
	    ],
	    height: 800,
	    viewConfig : {
			enableTextSelection : true
	    }
	});
	return this.parametersPanel;

};

ImageMainView.prototype.load = function(imageId, dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Image");
	var url = EXI.getDataAdapter().mx.dataCollection.getImageById(imageId);

	
	var onSuccess = function(sender, dataCollection){
		var dc = (dataCollection[0]);
		for (var key in dc){
			//console.log(key + " " + dc[key]);
			_this.storeParameters.loadData([{key: key, value: dc[key]}], true);
		}
		var waveLength = dataCollection[0].DataCollection_wavelength;
		var detectorDistance = dataCollection[0].DataCollection_detectorDistance;
		var xBeam = dataCollection[0].DataCollection_xBeam;
		var yBeam = dataCollection[0].DataCollection_yBeam;
		_this.imageViewer.load(url, waveLength, detectorDistance, xBeam, yBeam, _this.detectorResolution);


	};
	EXI.getDataAdapter({onSuccess: onSuccess}).mx.dataCollection.getByDataCollectionId(dataCollectionId);
	

};


