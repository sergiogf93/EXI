
SessionTimeLineWidget.prototype.load = TimeLineWidget.prototype.load;
SessionTimeLineWidget.prototype.getPanel = TimeLineWidget.prototype.getPanel;
SessionTimeLineWidget.prototype.getStartDate = TimeLineWidget.prototype.getStartDate;
SessionTimeLineWidget.prototype.getEndDate = TimeLineWidget.prototype.getEndDate;
SessionTimeLineWidget.prototype.render = TimeLineWidget.prototype.render;


function SessionTimeLineWidget() {
	TimeLineWidget.call(this);
	this.week = moment().week();
	
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
	
	
	
}

SessionTimeLineWidget.prototype.changeWeek = function(increment) {
	this.week = Number(this.week) + Number(increment);
	Ext.getCmp(this.id + 'week').setValue(this.week);
	this.loadSessions(moment().week(this.week).startOf('week').format("YYYYMMDD"), moment().week(this.week).endOf('week').format("YYYYMMDD"));
};



SessionTimeLineWidget.prototype.loadSessions = function(start, end) {
		var _this = this;
		this.panel.setLoading();
		var onSuccess = function(sender, sessions){
			/** Parsing box to be showed on the calendar **/
			function parseContent(session){
				if (!session.beamlineOperator){
					session.beamlineOperator = "<span style='color:orange;'>Unknown</span>";
				}
				return (
						"<div>" +
						"<span class='beamline_name'>{3}</span>" +
						"<span style='left : 10' class='shifts_count'>({2}) shifts on </span>" +
						"<span class='beanline_name' >{0}</span>" +
						"<br />" +
						"<span class='proposal_title' >{4}</span>" +
						"<br />" +
						"<span class='local_contact' >{1}</span>" +
						"<br />" +
						
						"</div>")
						.format([session.beamlineName, 
						         session.beamlineOperator, 
						         session.nbShifts, 
						         (session.proposalVO.code + session.proposalVO.number),
						         session.proposalVO.title]);
			}
			
			
			function getGroups(){
				var groups = new vis.DataSet();
				var groups_key = {};
				for (var i = 0; i < sessions.length; i++) {
					if (sessions[i].beamlineName){
						if (_this.discarded[sessions[i].beamlineName ] != true ){
							if (!groups_key[sessions[i].beamlineName]){
								groups.add({
									id 		: sessions[i].beamlineName,
									content : sessions[i].beamlineName,
								})
								groups_key[sessions[i].beamlineName] = true;
							}
						}
					}
				}
				return groups;
			}

			var dataset = new vis.DataSet();
			for (var i = 0; i < sessions.length; i++) {
				if (_this.discarded[sessions[i].beamlineName ] != true ){
					dataset.add({
						start 		: moment(sessions[i].startDate, "MMM DD, YYYY h:mm:ss a "),
						end 		: moment(sessions[i].endDate, "MMM DD, YYYY h:mm:ss a "),
						content 	: parseContent(sessions[i]),
						group 		: sessions[i].beamlineName,
						sessionId 	: sessions[i].sessionId,
						className	: sessions[i].beamlineName + "_session_box"
					});
					
				}	
			}
			
			_this.load(dataset, null, null, getGroups());
			_this.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(start, end);
};