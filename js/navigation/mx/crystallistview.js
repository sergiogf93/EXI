function CrystalListView(){
	ListView.call(this);
}

CrystalListView.prototype.getPanel = ListView.prototype.getPanel;
CrystalListView.prototype.load = ListView.prototype.load;


CrystalListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
		html = html + "<tr><td>Acronym:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.proteinVO.acronym+ "</td></tr>";
		html = html + "<tr><td>Name:</td><td>" + record.data.proteinVO.name+ "</td></tr>";
		if (record.data.diffractionPlanVO != null){
			if (record.data.diffractionPlanVO.experimentKind != null){
				html = html + "<tr><td>Experiment:</td><td>" + record.data.diffractionPlanVO.experimentKind+ "</td></tr>";
			}
		}
		
		if (record.data.spaceGroup){
			html = html + "<tr><td>Space Group:</td><td>" + record.data.spaceGroup+ "</td></tr>";
		}
	return html + "</table>";
};

CrystalListView.prototype.getFilter = function(value){
	return [{property : "acronym", value : value, anyMacth : true}];
};

CrystalListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Crystals',  flex: 1, dataIndex: 'bufferId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

CrystalListView.prototype.getFields = function(){
	return  ['acronym', 'name'];
};

