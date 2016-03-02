function TimeLineWidget() {
	this.id = "test";
	this.targetId = "timeline" + BUI.id();
	this.width = 1000;
	
	this.color = {
			
		'BM29' : '#D0F5A9',
		'ID23-1' : '#81DAF5',
		'ID23-2' : '#A9D0F5',
		'ID23-3' : '#58ACFA',
		'ID30'   : '#F7819F',
		'ID29'   : '#FAAC58',
		'ID30A-1' : '#DF01D7',
		'ID30B' : '#D7DF01'
			
	};
	
	this.onSelected = new Event(this);
}

TimeLineWidget.prototype.getStartDate = function(data) {
	if (data != null){
		var starts = [];
		for (var i = 0; i < data.length; i++) {
			starts.push(data[i].start);
		}
		return starts.reduce(function (a, b) { return a < b ? a : b; }); 
	}
};

TimeLineWidget.prototype.getEndDate = function(data) {
	if (data != null){
		var starts = [];
		for (var i = 0; i < data.length; i++) {
			starts.push(data[i].start);
		}
		return starts.reduce(function (a, b) { return a > b ? a : b; }); 
	}
};



TimeLineWidget.prototype.load = function(data, startDate, endDate) {
	var _this = this;
	this.data = data;


	if (document.getElementById(this.targetId)){
		/*
		 $('#' + this.targetId).fullCalendar({
			 dayClick: function(date, jsEvent, view) {

			 },
			 weekends: true,
			 height : 600,
			 slotEventOverlap : true,
			 allDaySlot : false,
			 border : 0,
			 //defaultDate: '2010-01-01',
			 //events: 'http://lindemaria:8082/EXI/tmp/test.json',
			 eventSources: [

			                // your event source
			                {
			                    //url: 'http://lindemaria:8082/EXI/tmp/test.json',
			                    //url : 'https://wwws.esrf.fr/ispyb/ispyb-ws/rest/876c61ea7243ae70fab8c1bc5b2a489a88451640/proposal/session/list?startdate=20160228&enddate=20160306',
			                	url : EXI.getDataAdapter().proposal.session.getSessionsByDateURL(moment($('#' + this.targetId).fullCalendar('getView').intervalStart).format("YYYYMMDD"), "20160401"),
			                    type: 'GET',
			                    data: {
			                    },
			                    success : function(data){
			                    	console.log(EXI.getDataAdapter().proposal.session.getSessionsByDateURL(
			                    			moment($('#' + this.targetId).fullCalendar('getView').intervalStart).format("YYYYMMDD"), 
			                    			moment($('#' + this.targetId).fullCalendar('getView').intervalEnd).format("YYYYMMDD"))
			                    			);
			                    	
			                    	for (var i = 0; i < data.length; i++){
			                    		data[i].id = data[i].sessionId;
			                    		data[i].title = data[i].beamlineName; //+ data[i].beamlineOperator;
			                    		data[i].start = $.fullCalendar.moment(moment(data[i].startDate).toISOString())
			                    		data[i].end = $.fullCalendar.moment(moment(data[i].startDate).add('seconds', 30000).toISOString())
			                    		data[i].color = _this.color[data[i].beamlineName ];
			                    		data[i].allDay = false;
			                    	}
			                    	
			                    },
			                    error: function() {
			                        alert('there was an error while fetching events!');
			                    },
			                    //,
			                    //color: 'yellow',   // a non-ajax option
			                    textColor: 'black' // a non-ajax option
			                }

			                // any other sources...

			            ],
			 customButtons: {
			        myCustomButton: {
			            text: 'custom!',
			            click: function() {
			                alert('clicked the custom button!');
			                $('#' + this.targetId).prevYear();
			            }
			        }
			    },
			    header: {
			        left: 'prev,next today myCustomButton',
			        center: 'title',
			        right: 'month,agendaWeek,agendaDay'
			    }
		 });*/
		var options = {
			width : '100%',
			height : '1100px',
			cluster: false,
			axisOnTop: true,
            groupsChangeable : true,
            groupsOnRight: false,
			editable : false,
			style : 'box',
			groupMinHeight : 14,
			end : endDate,
			max : endDate,
			start : startDate,
			min : startDate
		};

		document.getElementById(this.targetId).setAttribute("width", this.panel.getWidth() + "px");
		
		var timeline = new links.Timeline(document.getElementById(this.targetId), options);

		
		function onSelect() {
			var sel = timeline.getSelection();
			  if (sel.length) {
			    if (sel[0].row != undefined) {
			    	_this.onSelected.notify(_this.data[sel[0].row]);
			    }
			  }
		}
		
		links.events.addListener(timeline, 'select', onSelect);
		timeline.draw(data);
	}
};

TimeLineWidget.prototype.getTopBar = function() {
	return null;
};

TimeLineWidget.prototype.getPanel = function() {
	var _this =this;
	
	this.panel = Ext.create('Ext.panel.Panel', {
		id :  this.id,
		/*layout : {
			type : 'fit' 
		},*/
		height : 1100,
		cls : 'border-grid',
		flex : 1,
		margin : this.margin,
		items : [ 
		          {
		        	  html : '<div style="height: 1100;overflow-y: scroll; " id="' + this.targetId + '"></div>'
		          } 
		] 
		});

	
	this.panel.on("afterrender", function(){
		_this.load(_this.data);
	});
	
	this.panel.on("afterlayout", function(){
		_this.load(_this.data);
	});
	
	return this.panel;
};

