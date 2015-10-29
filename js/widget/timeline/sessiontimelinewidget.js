
SessionTimeLineWidget.prototype.load = TimeLineWidget.prototype.load;
SessionTimeLineWidget.prototype.getPanel = TimeLineWidget.prototype.getPanel;
SessionTimeLineWidget.prototype.getStartDate = TimeLineWidget.prototype.getStartDate;
SessionTimeLineWidget.prototype.getEndDate = TimeLineWidget.prototype.getEndDate;


function SessionTimeLineWidget() {
	TimeLineWidget.call(this);
	this.week = moment().week();
}

SessionTimeLineWidget.prototype.changeWeek = function(increment) {
	this.week = Number(this.week) + Number(increment);
	Ext.getCmp(this.id + 'week').setValue(this.week);
	
	this.loadSessions(moment().week(this.week).startOf('week').format("YYYYMMDD"), moment().week(this.week).endOf('week').format("YYYYMMDD"));
};

SessionTimeLineWidget.prototype.getTopBar = function() {
	var _this = this;
	return Ext.create("Ext.toolbar.Toolbar", {
		    width   : 500,
		    items: [
		        {
		            text: '<<',
		            handler : function(){
		            	_this.changeWeek(-1);
		            	
		            }
		        },
		        "Week",
		        {
		        	id 			: this.id + 'week',
		            xtype    	: 'textfield',
		            name     	: 'field1',
		            fieldLabel  : 'Week',
		            labelWidth : 40,
		            width 		: 100,
		            value		: this.week,
		            listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == e.ENTER) {
								_this.week = field.getValue();
								_this.changeWeek(0);
							}
						} 
					} 
		        },
		        {
		            text: '>>',
		            handler : function(){
		            	_this.changeWeek(1);
		            	
		            }
		        }
		    ]
		});
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
				return ("<div style='font-size:12px;font-weight:bold;'>{0}<span style='font-size:10px;margin:5px;font-weight:normal;'>{1}</span><span style='color:gray; font-size:10px;'>{2} shifts</span></div>").format([session.beamlineName, session.beamlineOperator, session.nbShifts]);
			}
			var parsed = [];
			for (var i = 0; i < sessions.length; i++) {
				parsed.push({
					start :   moment(sessions[i].startDate).toDate(),
					end :  moment(sessions[i].endDate).toDate(),
					content : parseContent(sessions[i]),
					group : sessions[i].beamlineName,
					sessionId : sessions[i].sessionId
				});
			}
			

			
			_this.load(parsed, start, end);
			_this.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(start, end);
};