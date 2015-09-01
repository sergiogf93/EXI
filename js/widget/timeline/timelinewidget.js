function TimeLineWidget() {
	this.targetId = "timeline" + BUI.id();
	this.width = 1000;
	
	this.onSelected = new Event(this);
}


//data = [{  'start': new Date(2010,7,23),	 'content': 'Text'	 }]
TimeLineWidget.prototype.load = function(data) {
	var _this = this;
	this.data = data;
	if (document.getElementById(this.targetId)){
		// specify options
		var options = {
			'width' : '100%',
			'height' : '700px',
			 'cluster': true,
			  'axisOnTop': true,
              // groupsWidth : "200px",
              'groupsChangeable' : true,
              'groupsOnRight': false,
			'editable' : false, // enable dragging and editing events
			'style' : 'box' };
	
		// Instantiate our timeline object.
		var timeline = new links.Timeline(document.getElementById(this.targetId), options);
		function onSelect() {
			var sel = timeline.getSelection();
			  if (sel.length) {
			    if (sel[0].row != undefined) {
			    	_this.onSelected.notify(_this.data[sel[0].row]);
			    }
			  }
		}
		// attach an event listener using the links events handler
		links.events.addListener(timeline, 'select', onSelect);
		// Draw our timeline with the created data and options
		timeline.draw(data);
	}
};

TimeLineWidget.prototype.getPanel = function(data) {
	var _this =this;
	this.panel = Ext.create('Ext.container.Container', {
		layout : {
			type : 'fit' 
		},
		width : this.width,
		height : 710,
		cls : 'border-grid',
		flex : 1,
		margin : this.margin,
		items : [ {
			html : '<div style="height:800px;width:' + this.width +'px;" id="' + this.targetId + '"></div>',
			id : this.id, } ] 
		});

	
	this.panel.on("afterrender", function(){
		_this.load(_this.data);
	});
	
	return this.panel;
};

// var timeline;
// var data;
//
// // Called when the Visualization API is loaded.
// function drawVisualization() {
// // Create a JSON data table
// data = [
// {
// 'start': new Date(2010,7,23),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,23),
// 'content': 'Conversation<'
// }, {
// 'start': new Date(2010,7,23),
// 'content': 'Conversation<'
// }, {
// 'start': new Date(2010,7,23),
// 'content': 'Conversation<'
// }, {
// 'start': new Date(2010,7,23),
// 'content': 'Conversation<'
// }, {
// 'start': new Date(2010,7,23),
// 'content': 'Conversation<'
// }, {
// 'start': new Date(2010,7,23),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,24),
// 'content': 'Conversation<'
// },
// {
// 'start': new Date(2010,7,23,23,0,0),
// 'content': 'Mail from boss<br><img src="img/mail-icon.png" style="width:32px;
// height:32px;">'
// },
// {
// 'start': new Date(2010,7,24,16,0,0),
// 'content': 'Report'
// },
// {
// 'start': new Date(2010,7,26),
// 'end': new Date(2010,8,2),
// 'content': 'Traject A'
// },
// {
// 'start': new Date(2010,7,28),
// 'content': 'Memo<br><img src="img/notes-edit-icon.png" style="width:48px;
// height:48px;">'
// },
// {
// 'start': new Date(2010,7,29),
// 'content': 'Phone call<br><img src="img/Hardware-Mobile-Phone-icon.png"
// style="width:32px; height:32px;">'
// },
// {
// 'start': new Date(2010,7,31),
// 'end': new Date(2010,8,3),
// 'content': 'Traject B'
// },
// {
// 'start': new Date(2010,8,4,12,0,0),
// 'content': 'Report<br><img src="img/attachment-icon.png" style="width:32px;
// height:32px;">'
// }
// ];
//
// // specify options
// var options = {
// 'width': '100%',
// 'height': '300px',
// 'editable': false, // enable dragging and editing events
// 'style': 'box'
// };
//
// // Instantiate our timeline object.
// timeline = new links.Timeline(document.getElementById('mytimeline'),
// options);
//
// function onRangeChanged(properties) {
// document.getElementById('info').innerHTML += 'rangechanged ' +
// properties.start + ' - ' + properties.end + '<br>';
// }
//
// // attach an event listener using the links events handler
// links.events.addListener(timeline, 'rangechanged', onRangeChanged);
//
//    // Draw our timeline with the created data and options
//    timeline.draw(data);
//}
//drawVisualization();