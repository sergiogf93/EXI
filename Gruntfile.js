/*jshint strict:false */
"use strict";

module.exports = function(grunt) {
   var config = {
		    dustjs: {},
   };
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      yuidoc: {
		    compile: {
		      name: '<%= pkg.name %>',
		      description: '<%= pkg.description %>',
		      version: '<%= pkg.version %>',
		      url: '<%= pkg.homepage %>',
		      options: {
			paths: 'js/',
			outdir: 'documentation'
		      }
		    }
	  },
	  concat : {
		  prod:{
			  files : {
				  'min/core.min.js' 		: ["js/core/**/*js"],
				  'min/widget.min.js' 		: [ "js/widget/timeline/timelinewidget.js", 
				                      		    "js/widget/addressform.js", 
				                      		    "js/widget/**/*.js"],
				  'min/navigation.min.js' 	: ["js/navigation/listview.js", 
				                          	   "js/navigation/*.js",
				                          	   "js/navigation/*/*js"],
				  'min/main.min.js' 		: [
				                    		   		"js/main/mainview.js", 
				                    		   		"js/main/puckmainview.js", 
				                    		   		"js/main/addressmainview.js", 
				                    		   		"js/main/userwelcomemainview.js", 
				                    		   		"js/main/managerwelcomemainview.js", 
				                    		   		"js/main/shippingmainview.js", 
				                    		   		"js/main/sessionmainview.js", 
				                    		   		"js/main/saxs/landing/*.js", 
				                    		   		"js/main/saxs/hplc/*.js",   
				                    		   		"js/main/landing/*.js", 
				                    		   		"js/main/saxs/prepare/*.js", 
				                    		   		"js/main/saxs/*.js", 
				                    		   		"js/main/mx/*.js", 
				                    		   		"js/main/mx/*/*.js", 
				                    		   		"js/main/tool/*.js", 
				                    		   		"js/main/run/*.js"],
				 'min/bower_components.min.js' : [
				                                   "bower_components/lodash/lodash.js",
												   "bower_components/Snap.svg/dist/snap.svg-min.js",
												   "bower_components/exi-ui-utils/min/exi-ui-utils.min.js",
												   "bower_components/exi-ui-viz/min/exi-ui-viz.min.js",
												   "bower_components/ispyb-js-api/min/ispyb-js-api-min.js",
				  								   "bower_components/vis/dist/vis.min.js",
				  								   "bower_components/dustjs-linkedin/dist/dust-full.min.js",
				                               	   "bower_components/dygraphs/dygraph-combined.js", 
				                               	   "bower_components/handsontable/dist/handsontable.full.js",
				                               	   "bower_components/jquery/dist/jquery.min.js",
												   "bower_components/jquery-lazy/jquery.lazy.js", 
												   "bower_components/moment/min/moment.min.js",  
												   //'bower_components/dustjs-helpers/dist/dust-helpers.min.js',
				 								   //"bower_components/fullcalendar/dist/fullcalendar.js",
				 								   "bower_components/pathjs-amd/dist/path.js",
				 								   "bower_components/threejs/build/three.min.js"
								],
				 'min/dependency.min.js' 		: [
				                         		   "dependency/glmol.js"]
			  }
		  }
	  },
	  uglify : {
		  prod:{
				
			  options: {
			  },
			  files : {
				  'min/exi.min.js' 		: ['min/bower_components.min.js', 
				                   		   'min/core.min.js', 
				                   		   'min/widget.min.js', 
				                   		   'min/navigation.min.js', 
				                   		   'min/main.min.js',
				                   		   'min/precompiled.templates.min.js'
				                   		   ]
			  }
		  }
	  },
	  cssmin: {
		 prod:{
			  options: {
			      shorthandCompacting: false,
			      roundingPrecision: -1
			  },
			    files: {
			          'min/exi.min.css': [  
			                              	'css/templatelist.css', 
			                              	'css/beamlinesessionbox.css', 
			                              	'bower_components/fullcalendar/dist/fullcalendar.css', 
			                              	'bower_components/vis/dist/vis.css', 
			                              	'css/dygraph-custom.css', 
			                              	'css/exi.css', 
			                              	'css/calendar.css', 
			                              	'css/menu/mainmenu.css', 
			                              	'css/override.css', 
			                              	'bower_components/handsontable/dist/handsontable.full.css', 
			                              	'js/dependency/timeline/timeline.css']
			    }
		}
	},
	jshint: {
		 options: {
 		      reporter: require('jshint-stylish'),
		      jshintrc : '.jshintrc'
		 },
		 prod: [ 'js/core/**/*.js', 'js/main/**/*.js', 'js/navigation/**/*.js']
	},
	plato: {
		options: {
		},
		prod: {
		  files : {'report' : ['js/core/**/*.js', 'js/widget/*/*.js', 'js/main/*/*.js', 'js/navigation/**/*.js']}
		}
        },
	includeSource: {
	    	options: {
		      basePath: '',
		      baseUrl: '../'
		},
		dev: {
		      files: [{
		    	  		'saxs/dev.html': 'saxs/index.tpl.html'
		      },{
		    	  		'mx/dev.html'  : 'saxs/index.tpl.html'
		      }]
		}
	},
	 wiredep: {
	      target: {
	        src: 'mx/dev.html' // point to your HTML file.
	      }
	},
	dustjs: {
	    compile: {
	      files: {
	        'min/precompiled.templates.min.js': ['templates/*js']
	      }
	    }
	  }


  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-include-source');  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-dustjs');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.task.registerTask('doc', ['yuidoc:compile']);
  grunt.task.registerTask('report', ['plato:prod']);
  grunt.task.registerTask('default', [ 'dustjs', 'jshint:prod' ,  'concat:prod', 'uglify:prod', 'cssmin:prod', 'yuidoc:compile']);
  grunt.task.registerTask('dev', ['dustjs','includeSource:dev', 'cssmin:prod', 'wiredep']);
  
};
