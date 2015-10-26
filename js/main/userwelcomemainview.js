UserWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
UserWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

function UserWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;
	
	
	this.proposalGrid = new ProposalGrid({
		height : 300
	});
	
	var _this = this;
	this.proposalGrid.onSelected.attach(function(sender, proposal){
		_this.panel.setLoading(true);
		_this.activeProposal(proposal);
		_this.panel.setLoading(false);
	});
	
	this.todaySessionsGrid = new SessionGrid(
			{
				width : null,
				height : 125,
				title : "You have got sessions scheduled for today",
				hiddenGoColumn : false
			}
	);
	
	this.futureSessionsGrid = new SessionGrid(
			{
				width : null,
				height : 450,
				title : "Next scheduled sessions",
				margin : "20 0 0 00",
			}
	);
	
	this.previousSessionsGrid = new SessionGrid(
			{
				width : null,
				height : 450,
				title : "Previous sessions",
				margin : "20 0 0 10",
				hiddenGoColumn : false
			}
	);
	
}

UserWelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber);
	EXI.proposalManager.get(true);
};

UserWelcomeMainView.prototype.getContainer = function() {
//	var x = '<div id="cal">' +
//	'<div class="header">' +
//		'<span class="left button" id="prev"> &lang; </span>' +
//		'<span class="left hook"></span>' +
//		'<span class="month-year" id="label"> June 2010 </span>' +
//		'<span class="right hook" id=""></span>' +
//		'<span class="right button" id="next"> &rang; </span>' +
//		'</div>' +
//		'<table id="days">' +
//		'<tr>' +
//			'<td>sun</td>' +
//			'<td>mon</td>' +
//			'<td>tue</td>' +
//			'<td>wed</td>' +
//			'<td>thu</td>' +
//			'<td>fri</td>' +
//			'<td>sat</td>' +
//		'</tr>' +
//		'</table>' +
//		'<div id="cal-frame">' +
//		'<table class="curr">' +
//			'<tr><td class="nil"></td><td class="nil"></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>' +
//			'<tr><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td class="today">11</td><td>12</td></tr>' +
//			'<tr><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr>' +
//			'<tr><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td></tr>' +
//			'<tr><td>27</td><td>28</td><td>29</td><td>30</td><td class="nil"></td><td class="nil"></td><td class="nil"></td></tr>' +
//		'</table>' +
//'</div>' +
//'</div>';
	
	
		this.panel =  Ext.createWidget('tabpanel',
		{
			plain : true,
			margin : '20 10 10 10',
			items : [
//				{
//					tabConfig : {
//						title : 'Welcome'
//					},
//					items : [ {
//						xtype : 'container',
//						layout : 'fit',
//						padding : 20,
//						cls : 'border-grid',
//						items : [ 
//						        
//						         {
//						        	 html : '<div class="welcome-title"><h2>Welcome to ExiSAXS</h2></div>'
//						         },
//						         {
//						        	 html : '<div class="welcome-title">If you are new on ISPyB these are the main actions you may be interested in doing </div>'
//						         },
//						         {
//						        	xtype : 'container',
//						        	layout : 'hbox',
//						        	cls : 'option-bar-menu',
//						        	items :[
//						        	        {
//									        	 xtype : 'button',
//									        	 cls : 'square-option',
//									        	 maxWidth : 200,
//									        	 minWidth : 200,
//									        	 height : 100,
//									        	 text : '<div class="square-option-text"; >Create Your Samples <br />and send them to the <br/>beamline</div>',
//									        	 icon : '../images/icon/shipping.png',
//									        	 iconAlign : 'top',
//									        	 handler : function(){
//									        		 location.hash = '/prepare/shipmentpreparation';
//									        	 }
//									        		 
//									        	 
//									         },
//									         {
//									        	 xtype : 'button',
//									        	 cls : 'square-option',
//									        	 maxWidth : 200,
//									        	 minWidth : 200,
//									        	 margin : '0 0 0 50',
//									        	 height : 100,
//									        	 text : '<div class="square-option-text"; >Planify your experiment</div>',
//									        	 icon : '../images/icon/edit.png',
//									        	 iconAlign : 'top',
//									        	 handler : function(){
//									        		 alert("To be imlemented");
//									        	 }
//									         },
//									         {
//									        	 xtype : 'button',
//									        	 cls : 'square-option',
//									        	 maxWidth : 200,
//									        	 minWidth : 200,
//									        	 margin : '0 0 0 50',
//									        	 height : 100,
//									        	 text : '<div class="square-option-text"; >Explore your data</div>',
//									        	 icon : '../images/icon/sessions.png',
//									        	 iconAlign : 'top',
//									        	 handler : function(){
//									        		 alert("To be imlemented");
//									        	 }
//									         }]
//						         }
//						       
//						        
//						]
//					}
//				
//					]
//				},
					
				{
					tabConfig : {
						title : 'Sessions',
						
					},
					listeners : {
						afterrender : function(){
//							var cal = CALENDAR();
//							cal.init();
						}
					},
					items : [ {
						xtype : 'container',
						id : this.id + "sessions",
						layout : 'fit',
						padding : 10,
						style : {
							borderColor : 'gray',
							borderStyle : 'solid',
							borderWidth : '1px',
							'background-color' : 'white' 
						},
						items : [
						         {
									 	html : "<div>Where is my beamline? <a target='blank' href='http://www.esrf.eu/files/live/sites/www/files/UsersAndScience/Experiments/Beamlines/beamlines-2015.jpg'>Here there is a map</a></div>",
									 	height : 20
							     },
						         {
						        	 xtype : 'container',
						        	 layout : 'hbox',
						        	 items : [
						        	          		this.futureSessionsGrid.getPanel(),
						        	          		this.previousSessionsGrid.getPanel()
				        	          ]
						         }
						      
						]
					}

					]
				},
				{
					tabConfig : {
						title : 'Proposals',
						
					},
					items : [ {
						xtype : 'container',
						layout : 'fit',
						height : 700,
						padding : 20,
						style : {
							borderColor : 'gray',
							borderStyle : 'solid',
							borderWidth : '1px',
							'background-color' : 'white' 
						},
						items : [ 
						         
						         this.proposalGrid.getPanel()
						]
					}

					]
				}
		]});
		
		this.panel.on("afterrender", function(){
		});
		return this.panel;
};

UserWelcomeMainView.prototype.loadUserView = function() {
	var _this = this;
	this.panel.setLoading("Loading Proposal");
	var onSuccess = function(sender, proposals){
		_this.proposalGrid.load(proposals);
		if (proposals.length == 1){
			_this.activeProposal( proposals[0]);
			function onSessions(sender, data){
				
				var olderSessions = [];
				var futureSessions = [];
				var todaySessions = [];
				
				
				for (var i = 0; i < data.length; i++) {
					/** Older **/
					data[i].diff = moment(data[i].startDate).diff(moment(), 'days');
					
					if (data[i].diff == 0){
						todaySessions.push(data[i]);
					}
					else{
						if (data[i].diff < 0){
							olderSessions.push(data[i]);
						}
						else{
							futureSessions.push(data[i]);
						}
					}
				}
				
				
				_this.panel.setLoading(false);
				
				futureSessions.sort(function(a, b){
					return a.diff - b.diff;
				});
				
				if (olderSessions.length > 0){
					_this.previousSessionsGrid.load(olderSessions);
				}
				
				if (futureSessions.length > 0){
					_this.futureSessionsGrid.load(futureSessions);
				}
				
				if (todaySessions.length > 0){
					Ext.getCmp(_this.id + "sessions").insert(0, _this.todaySessionsGrid.getPanel());
					_this.todaySessionsGrid.load(todaySessions);
				}
				
			}
			_this.panel.setLoading("Loading Sessions");
			EXI.getDataAdapter({onSuccess:onSessions}).proposal.session.getSessions();
		}
	};
	EXI.proposalManager.get();
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

UserWelcomeMainView.prototype.load = function(username) {
	var _this = this;
	this.username = username;
	/** Loading proposals depending on your role **/
	var credential = EXI.credentialManager.getCredentialByUserName(username);
	if (credential != null){
		if (credential.roles != null){
			if (credential.roles.length == 0){
				/** Assuming they are always users **/
				credential.roles.push("user");
			}
			if (credential.isManager()){
				alert("You are manager");
				return;
			}
			
			if (credential.isLocalContact()){
				alert("You are localContact");
				return;
			}
			this.loadUserView();
		}
	}
	
};



//
//var CALENDAR = function () {
//	var wrap, label, 
//			months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
//
//		function init(newWrap) {
//			wrap  = $(newWrap || "#cal");
//			label = wrap.find("#label");
//				
//			wrap.find("#prev").bind("click.calender", function () { switchMonth(false); });
//			wrap.find("#next").bind("click.calender", function () { switchMonth(true); });
//			label.bind("click.calendar", function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear() ); });			
//		}
//		
//		function switchMonth(next, month, year) {
//			var curr = label.text().trim().split(" "), calendar, tempYear = parseInt(curr[1], 10);
//
//			month = month || ((next) ? ((curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1) : ( (curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1) );
//			year  = year  || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear -1 : tempYear);
//				
//			console.profile("createCal");
//			calendar = createCal(year, month);
//			console.profileEnd("createCal");
//
//			$("#cal-frame", wrap)
//				.find(".curr")
//					.removeClass("curr")
//					.addClass("temp")
//				.end()
//				.prepend(calendar.calendar())
//				.find(".temp")
//					.fadeOut("slow", function () { $(this).remove(); });
//			label.text(calendar.label);
//		}
//		
//	function createCal(year, month) {
//		var day = 1, i, j, haveDays = true, 
//				startDay = new Date(year, month, day).getDay(),
//				daysInMonth = [31, (((year%4===0)&&(year%100!==0))||(year%400===0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
//				calendar = [];
//		if (createCal.cache[year]) {
//			if (createCal.cache[year][month]) {
//				return createCal.cache[year][month];
//			}
//		} else {
//			createCal.cache[year] = {};
//		}
//		i = 0;
//		while(haveDays) {
//			calendar[i] = [];
//			for (j = 0; j < 7; j++) {
//				if (i === 0) {
//					if (j === startDay) {
//						calendar[i][j] = day++;
//						startDay++;
//					}
//				} else if ( day <= daysInMonth[month]) {
//					calendar[i][j] = day++;
//				} else {
//					calendar[i][j] = "";
//					haveDays = false;
//				}
//				if (day > daysInMonth[month]) {
//					haveDays = false;
//				}
//			}
//			i++;
//		}	
//		
//		if (calendar[5]) {
//			for (i = 0; i < calendar[5].length; i++) {
//				if (calendar[5][i] !== "") {
//					calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>";
//				}
//			}
//			calendar = calendar.slice(0, 5);
//		}
//		
//		for (i = 0; i < calendar.length; i++) {
//			calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>";
//		}
//
//		calendar = $("<table>" + calendar.join("") + "</table").addClass("curr");
//
//		$("td:empty", calendar).addClass("nil");
//		if (month === new Date().getMonth()) {
//			$('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today");
//		}
//		
//		createCal.cache[year][month] = { calendar : function () { return calendar.clone(); }, label : months[month] + " " + year };
//
//		return createCal.cache[year][month];
//	}
//	createCal.cache = {};
//
//	return {
//		init : init,
//		switchMonth : switchMonth,
//		createCal : createCal
//	};
//
//};