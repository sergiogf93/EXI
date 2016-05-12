

/**
* This view shows a main plot with the spectrum and a grid with the elements
*
* @class XfeViewerMainView
* @constructor
*/
function XfeViewerMainView() {
	this.id= BUI.id();
	MainView.call(this);
    
    this.filters = ['channel','counts', 'Energy', 'fit', 'continuum', 'pileup'];	
	
}

XfeViewerMainView.prototype.getPanel = MainView.prototype.getPanel;

/**
* Makes an store and a grid where the labels of the csv will be shown 
*
* @method getGrid
* @return {Grid} Retuns a Ext.panel.Grid
*/
XfeViewerMainView.prototype.getGrid = function() {
     /** Store for labels */
    this.store =  Ext.create('Ext.data.Store', {
        fields:['name', 'value'],
        sorters : [{property : 'value', direction: 'DESC'}]
    });
    return  this.grid = Ext.create('Ext.grid.Panel', {
        title: 'Labels',
        store: this.store,
        cls : 'border-grid',
        margin : 2,
        width : 300,
        height : 450,
        columns: [
            { 
                    text: 'name',  
                    dataIndex: 'name',
                    flex : 1      
            },
            { 
                    text: 'value',  
                    dataIndex: 'value',
                    flex : 1
            }
        ]
    });
};

/**
* Returns the containers. There are four container 2xHbox(2xvbox)
*
* @method getContainer
* @return {Grid} Retuns a Ext.panel.Grid
*/
XfeViewerMainView.prototype.getContainer = function() {
    var _this = this;
   
    return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 10,
	    items: [
             {
                xtype : 'container',
                margin : '5 0 0 5',
                width : 300,
                items : [
                        
                        this.getGrid()
                       // this.getChart()
                ]
            },           
            {
                xtype : 'container',
                flex : 0.8,
                margin : '5 0 0 5',
                items : [
                       {
                            html : '<div style="width:100%"  id="plot' + _this.id +'"></div>',
                            cls : 'border-grid',
                            id   : this.id + 'containerLayout',
                            height : 700,
                            
                        },
                        {
                            html : 'Results produced by <a href="https://pypi.python.org/pypi/PyMca/">PyMCA</a>',
                            cls : 'border-grid',
                            margin : '2 0 0 0',
                            flex : 1,                        
                            height : 20
                        }
                ]
                
            }
           ]
	});
};

/**
* Convert the labels as array of string into json and load in the store
* labels = ["l1, "l1"]
* sum = [1, 2]
*
* 
* @method getSumForLabels
* @return {json} Retuns [{name:'l1', value:1}, {name:'l2', value:2}]
*/
XfeViewerMainView.prototype.getSumForLabels = function(labels, sum) {
    var _this = this;
      /** Loading grid of labels */
    try {
        function toJson(el){            
            return {
                name :el[0],
                value : el[1]
            };
        }
        /** This converts to arrays labels and sum in a single json array with name and value */
        var data = _.map(_.zip(labels, sum), toJson);
        data =  _.reject(data, function(o) { 
            return (_.indexOf(_this.filters, o.name) != -1); 
        });
       return data;
    }
    catch(err) {
        console.log(err);
    }
};



/**
* Sums the values for each columns 
*
* 
* @method sumByColums
* @return {Array} Retuns the value of sum for each column in an array
*/
XfeViewerMainView.prototype.sumByColums = function(data) {
    var sum = new Array(this.labels.length);
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (sum[j] == null){
                 sum[j] = 0;
            }
           sum[j] = sum[j] + data[i][j];
        }        
    }
    return sum;
};

/**
* Render the dygraph widget on a container that should exists with id = this.id
*
* 
* @method renderPlot
*/
XfeViewerMainView.prototype.renderPlot = function(labels, data) {
        /** Plotting */   
        new Dygraph(
                document.getElementById("plot"  + this.id),
                data, 
                {
                    legend: 'always',
                    title: 'XFE',
                    labels :   labels,
                    height: 600,
                    width : 800,
                    stackedGraph: true,
                    labelsDiv : document.getElementById(this.id + "_labels"),
                    labelsSeparateLines : true,
                    labelsDivWidth : 300,
                    labelsShowZeroValues : true,
                    highlightCircleSize: 2,
                    strokeWidth: 1,
                    strokeBorderWidth: true ? null : 1,
                    highlightSeriesOpts: {
                        strokeWidth: 3,
                        strokeBorderWidth: 1,
                        highlightCircleSize: 5
                    },
                    ylabel: 'Count'
            }
        );
};

/**
* Gets the csv data, parses it and plot it
*
* 
* @method plot
*/
  /*
XfeViewerMainView.prototype.getChart = function() {
   
     var chart =  Ext.create('Ext.chart.Chart', {
        
        width: 800,
        height: 600,
        animate: true,
        store: this.store,
        theme: 'White',
        axes: [{
            type: 'Numeric',
            position: 'bottom',
            fields: ['value'],
            label: 'test',
            title: 'Number of Hits'
        }, {
            type: 'Category',
            position: 'left',
            fields: ['name'],
            title: 'Month of the Year'
        }],
        series: [{
            type: 'bar',
            axis: 'bottom',
            xField: 'name',
            yField: 'value',
            highlight: true,
            label: {
                display: 'insideEnd',
                field: 'value',
                
                orientation: 'horizontal',
                color: '#333',
               'text-anchor': 'middle'
            }
        }]
    });
    debugger
    return chart;
    
};*/
/**
* Gets the csv data, parses it and plot it
*
* 
* @method plot
*/
XfeViewerMainView.prototype.plot = function() {
  var _this = this;
  $.ajax({
      
    url: EXI.getDataAdapter().mx.xfescan.getCSV(this.xfeFluorescenceSpectrumId),
    context: this
    
    }).done(function(csv) {
        if (csv){
            var lines = csv.split("\n");
            var labelsHeader = [];
            if (lines){
                if (lines[0]){
                   function remove(element) {
                          return  element.replace(new RegExp("\"", 'g'), "");
                    }
                    this.labels = _.map(lines[0].split(","), remove);
                }
                else{
                    /** No Lines */
                    EXI.setError("No labels on csv");
                    return;
                }

                function convertToNumber(element) {
                        var elements =  element.split(',');
                        function toNumber(el){
                            return Number(el);
                        }
                        elements =  _.map(elements, toNumber);
                        return elements;
                }
                 /** Parsing data it means remove labels, split by , and convert to number */
                this.data = _.map(_.slice(lines,1, lines.length -1), convertToNumber);
                
                /** Fills the labels grid */
                try{
                    var labelWithValuesArray =this.getSumForLabels(this.labels, this.sumByColums(_this.data)); 
                    this.store.loadData(labelWithValuesArray);
                }
                catch(e){
                    EXI.setError(e.message);
                }
                /*try{
                    
                    this.renderLabelsPlot(labelWithValuesArray);
                }
                catch(e){
                    EXI.setError(e.message);
                }*/
                try{
                    
                    this.renderPlot(this.labels, this.data);
                 }
                catch(e){
                    EXI.setError(e.message);
                } 
            }
        }
        else{
                /** No Lines */
                EXI.setError("CSV is empty");
                return;
            }
    });
};



XfeViewerMainView.prototype.load = function(xfeFluorescenceSpectrumId) {
	var _this = this;
	this.panel.setTitle("XFE Viewer");
	this.xfeFluorescenceSpectrumId = xfeFluorescenceSpectrumId;
    this.plot();
    
};
