

function SessionTimeLineWidget() {

	this.discarded = {
		'ID13'	: true,
		'ID16A-NI' : true,
		'ID16B-NA' : true,
		'ID02' : true,
		'ID21' : true,
		'BM01A' : true,
		'ID17' : true,
		'ID09B' : true
	};


  this.onSelected = new Event(this);

}


SessionTimeLineWidget.prototype._load = function(data, startDate, endDate, groups) {
	var _this = this;
	this.data = data;

	this.groups = groups;
	this.timeline.setGroups(this.groups);
	this.timeline.setItems(data);
  //this.timeline.setWindow('2014-01-01', '2014-04-01')
  console.log(startDate);
  console.log(endDate);
  this.timeline.setWindow(startDate, endDate);


};


SessionTimeLineWidget.prototype.render = function() {
	var _this = this;
	if (document.getElementById(this.targetId)){
		var options = {
				editable: true,
				autoResize : true,
				height   : 500,
				selectable : true,
				zoomable : false,
				moveable : false,
				stack : true,
			    onUpdate: function (item, callback) {
			    	_this.onSelected.notify(item);
			    }
		};

		document.getElementById(this.targetId).setAttribute("width", this.panel.getWidth() + "px");

		this.timeline = new vis.Timeline(document.getElementById(this.targetId), this.data, options);
		this.timeline.setGroups(this.groups);


	}
};




SessionTimeLineWidget.prototype.getTopBar = function() {
	return null;
};

SessionTimeLineWidget.prototype.getPanel = function() {
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		id :  this.id,
		height : 600,
		cls : 'border-grid',
		flex : 1,
		margin : this.margin,
		items : [
		          {
		        	  html : '<div style="height:790px" id="' + this.targetId + '"></div>'
		          }
		]
		});


	this.panel.on("afterrender", function(){
		_this.render();
	});

	this.panel.on("afterlayout", function(){
	});

	return this.panel;
};


/**
start and end format: YYYYMMDD
**/

SessionTimeLineWidget.prototype.load = function(start, end) {
		var _this = this;
		this.panel.setLoading();

		var onSuccess = function(sender, sessions){

			console.log(sessions);
			/** Parsing box to be showed on the calendar **/
			function parseContent(session){
				if (!session.beamlineOperator){
					session.beamlineOperator = "<span style='color:orange;'>Unknown</span>";
				}
				return (
						//"<div>" +
						"<span class='beamline_name'>{3}</span>"
						//"<span style='left : 10' class='shifts_count'>({2}) shifts on </span>" +
						//"<span class='beanline_name' >{0}</span>" +
						//"<br />" +
						//"<span class='proposal_title' >{4}</span>" +
						//"<br />" +
						//"<span class='local_contact' >{1}</span>" +
						//"<br />" +
            )
						//"</div>")
						.format([session.beamlineName,
						         session.beamlineOperator,
						         session.nbShifts,
						         (session.proposalVO.code + session.proposalVO.number),
						         session.proposalVO.title]);
			}


			function getGroups(){
				var groups = new vis.DataSet();
        var beamlines = EXI.credentialManager.getBeamlines();
				for (var i = 0; i < beamlines.length; i++) {
								groups.add({
									id 		    : beamlines[i],
									content   :  "<div style='color:green;font-weight:bold;'>" + beamlines[i] + "</div>"
								});
				}
				return groups;
			}


			var dataset = new vis.DataSet();
			for (var i = 0; i < sessions.length; i++) {
				if (_this.discarded[sessions[i].beamlineName ] != true ){
					dataset.add({
						start 		: moment(sessions[i].startDate, "MMM DD, YYYY h:mm:ss a "),
						end 		  : moment(sessions[i].endDate, "MMM DD, YYYY h:mm:ss a "),
						content 	: parseContent(sessions[i]),
						group 		: sessions[i].beamlineName,
						sessionId 	: sessions[i].sessionId,
						className	: sessions[i].beamlineName + "_session_box"
					});

				}
			}

			_this._load(dataset, moment(start, "YYYYMMDD").format("YYYY-MM-DD"), moment(end, "YYYYMMDD").format("YYYY-MM-DD"), getGroups());
			_this.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(start, end);
};
