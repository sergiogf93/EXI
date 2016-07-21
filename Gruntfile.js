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
				  'min/core.min.js' 		: ["js/dust/**/*js", "js/core/**/*js","js/controller/**/*js", "js/menu/**/*js"],
                  'min/lightbox.min.js' 		: ["bower_components/lightbox2/dist/js/lightbox.min.js"],

				  'min/widget.min.js' 		: [ "js/widget/timeline/timelinewidget.js", 
				                      		    "js/widget/addressform.js", 
				                      		    "js/widget/**/*.js"],
				  'min/navigation.min.js' 	: ["js/navigation/listview.js", "js/navigation/*.js", "js/navigation/*/*js","js/view/**/*js"],

				 'min/bower_components.min.js' : [ 
								                      "bower_components/jquery/dist/jquery.min.js",
                                                    "bower_components/jquery-lazy/jquery.lazy.min.js", 
                                                    "bower_components/dustjs-linkedin/dist/dust-full.min.js",
                                                    "bower_components/dustjs-helpers/dist/dust-helpers.min.js",
                                                    "bower_components/lodash/lodash.js",
                                                    'bower_components/lightbox2/dist/js/lightbox.js',
                                                    "bower_components/Snap.svg/dist/snap.svg-min.js",
                                                    "bower_components/vis/dist/vis.min.js",		  
                                                    "bower_components/dygraphs/dygraph-combined.js", 
                                                    "bower_components/handsontable/dist/handsontable.full.min.js",
                                                  
                                                    "bower_components/moment/min/moment.min.js",  
                                                    "bower_components/pathjs-amd/dist/path.min.js",
                                                    //"bower_components/threejs/build/three.min.js",
                                                    "bower_components/exi-ui-utils/min/exi-ui-utils.min.js",
                                                    "bower_components/ispyb-js-api/min/ispyb-js-api.min.js",
                                                    "bower_components/exi-ui-viz/min/exi-ui-viz.min.js"
                                                    //"bower_components/ez-plus/dist/jquery.ez-plus.js"
								  
								  
  								 
								],
				 'min/dependency.min.js' 		: [
                                                    //"dependency/glmol.js"
                                                    ]
			  }
		  }
	  },
	  uglify : {
		  prod:{
				
			  options: {
			  },
			  files : {
				  'min/exi.min.js' 		: [
								   //'min/bower_components.min.js', 
				                   		   'min/core.min.js', 
				                   		   'min/widget.min.js', 
				                   		   'min/navigation.min.js',
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
			                              	'bower_components/vis/dist/vis.css',
                                            'bower_components/handsontable/dist/handsontable.full.css',                                             
			                              	'css/dygraph-custom.css', 
			                              	'css/exi.css', 
			                              	'css/calendar.css', 
			                              	'css/menu/mainmenu.css', 
			                              	'css/override.css', 
                                              'css/grid.css', 
                                            'bower_components/lightbox2/dist/css/lightbox.css'
                                            
			                              	//'js/dependency/timeline/timeline.css'
                                            ]
			    }
		}
	},
	jshint: {
		 options: {
 		      reporter: require('jshint-stylish'),
		      jshintrc : '.jshintrc'
		 },
		 prod: [ 'js/core/**/*.js', 'js/controller/**/*.js', 'js/main/**/*.js', 'js/navigation/**/*.js']
	},
	plato: {
		options: {
		},
		prod: {
		  files : {'report' : ['js/**/*.js']}
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
	        'min/precompiled.templates.min.js': ['templates/**/*js']
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
  
  /** TASKS */
  grunt.task.registerTask('doc', ['yuidoc:compile']);
  grunt.task.registerTask('report', ['plato:prod']);
  grunt.task.registerTask('default', [ 'dustjs', 'jshint:prod' ,  'concat:prod', 'uglify:prod', 'cssmin:prod', 'yuidoc:compile']);
  grunt.task.registerTask('dev', ['dustjs','includeSource:dev', 'cssmin:prod', 'wiredep']);
  
};
