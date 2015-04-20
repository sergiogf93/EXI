function ListPanel(){


}

ListPanel.prototype.render = function(targetId){
	this.targetId = targetId;
};


ListPanel.prototype.refresh = function(logs){
	$("#" + this.targetId ).empty();
	logs = logs.slice(0, LoggerUI.maxMethodDescriptionCount);
	function printpretty(params){
		try{
			var table = document.createElement("table");
			
			var object = JSON.parse(params);
			for(key in object){
					var tr = document.createElement("tr");
					var keyTd = document.createElement("td");
					var valueTd = document.createElement("td");
					
					//if (JSON.parse(object[key]) instanceof Array){
						//valueTd.innerHTML = (printpretty(object[key]));
					//}
					//else{
					var divValue = document.createElement("div");
					var divKey = document.createElement("div");

					if (object[key] == ""){
						divKey.setAttribute("class", "empty");
					}
					else{
						divKey.setAttribute("class", "key");
					}
					divValue.setAttribute("class", "value");

					
					if (object[key].length < 400){	
						divValue.appendChild(document.createTextNode(object[key]));
					}
					else{
						divValue.appendChild(document.createTextNode(object[key].slice(0, 400)));
						var readmore = document.createElement("div");
						readmore.setAttribute("class", "readmore");
						readmore.setAttribute("onclick", "console.log(" + JSON.stringify(object) + ")");
						readmore.appendChild(document.createTextNode("Read More"));
						divValue.appendChild(readmore);
					}
					valueTd.appendChild(divValue);
					
					divKey.appendChild(document.createTextNode(key));

					keyTd.appendChild(divKey);
					tr.appendChild(keyTd);
					tr.appendChild(valueTd);
					table.appendChild(tr);
			}
			return "<table>" + table.innerHTML + "</table>";
			return object;
		}
		catch(e){
			return params;
		}
	}

	function addColumn(tr, text, css, inlineText, cssInline){
				var td = document.createElement("td");
				var div = document.createElement("div");
				if (css != null){
					div.setAttribute("class", css);
				}
				div.appendChild(document.createTextNode(text));

				if (inlineText != null){
					var br = document.createElement("br");
					var inlineDiv = document.createElement("div");
					inlineDiv.setAttribute("class", cssInline);
					inlineDiv.appendChild(document.createTextNode(inlineText));

					div.appendChild(br);
					div.appendChild(inlineDiv);
				}
				td.appendChild(div);
				tr.appendChild(td);
			}
	function addAnchor(tr, text, css){
		var td = document.createElement("td");
		td.innerHTML = text;
		tr.appendChild(td);
	}

	function addParams(tr, text, css){
		var td = document.createElement("td");
		if (css != null){
			td.setAttribute("class", css);
		}
		td.innerHTML = (text);
		tr.appendChild(td);
	}

	var table = document.createElement("table");
	
	for (var i =0; i< logs.length; i++){
		var tr = document.createElement("tr");
		tr.setAttribute("class", "loggerRow");

		if (logs[i].TYPE == ("ERROR")){
			tr.setAttribute("class", "loggerRowError");
		}
		/** Date 
		var day = "UNKNOW";
		if (logs[i].DATE){
			var date = logs[i].DATE;
			var splited = date.split(" ");
			day = splited[2] + " " + splited[1] + " " + splited[5]
		}
		addColumn(tr, day, "date");**/

		/** TIME **/
		var time = "UNKWON";
		if (logs[i].DATE){
			var date = logs[i].DATE;
			var splited = date.split(" ");
			time = splited[3]
		}
		/* addColumn(tr, time, "time"); */


		/** method **/
		addColumn(tr, logs[i].METHOD, "method", time, "time");

		
		addColumn(tr, logs[i].TYPE, "None", logs[i].ID, "id");

		addParams(tr, printpretty(logs[i].PARAMS));

		
		addColumn(tr, logs[i].DURATION + "ms", "duration");
		table.appendChild(tr);
	}
	document.getElementById(this.targetId).appendChild(table);

};
