/*jshint strict:false */
"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
          pkg: grunt.file.readJSON('package.json'),
	  concat : {
		  prod:{
			  files : {
				  'min/core.min.js' 		: ["js/core/**/*js"],
				  'min/widget.min.js' 		: [ "js/widget/timeline/timelinewidget.js", "js/widget/addressform.js", "js/widget/*/*js", "js/widget/plot/*/*js", "js/widget/form/*/*js", "js/widget/mx/*/*js"],
				  'min/data.min.js' 		: ["js/core/data/*js", "js/core/data/*/*js"],
				  'min/navigation.min.js' 	: ["js/navigation/listview.js", "js/navigation/*.js","js/navigation/*/*js"],
				  'min/main.min.js' 		: ["js/main/mainview.js", "js/main/puckmainview.js", "js/main/addressmainview.js", "js/main/userwelcomemainview.js", 
								   "js/main/managerwelcomemainview.js", "js/main/shippingmainview.js", "js/main/sessionmainview.js", "js/main/saxs/landing/*.js", 
						  		   "js/main/saxs/hplc/*.js",   "js/main/landing/*.js", "js/main/saxs/prepare/*.js", "js/main/saxs/*.js", "js/main/mx/*.js", 
					                           "js/main/mx/*/*.js", "js/main/tool/*.js", "js/main/run/*.js"],
				 'min/bower_components.min.js' 	: ["bower_components/dygraphs/dygraph-combined.js", "bower_components/handsontable/dist/handsontable.full.js","bower_components/jquery/dist/jquery.min.js",
								   "bower_components/jquery-lazy/jquery.lazy.js", "bower_components/moment/min/moment.min.js"
								],
				 'min/dependency.min.js' 	: ["js/dependency/three49custom.js", "js/dependency/glmol.js","js/dependency/timeline/timeline.js", "js/dependency/pathjs/path.js"]
			  }
		  }
	  },
	  uglify : {
		  prod:{
				
			  options: {
			      beautify : true,
			      stripBanners: true,
                              drop_debugger : false,
			      compress: {
					drop_debugger : false,
					global_defs: {
					  "DEBUG": true
					},
					dead_code: true
			      },
			  },
			  files : {
				  'min/exi.min.js' 		: ['min/bower_components.min.js', 'min/core.min.js', 'min/widget.min.js', 'min/data.min.js', 'min/navigation.min.js', 'min/main.min.js']
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
			          'min/exi.min.css': [ 'css/dygraph-custom.css', 'css/exi.css', 'css/calendar.css', 'css/menu/mainmenu.css', 'css/override.css', 'bower_components/handsontable/dist/handsontable.full.css', 'js/dependency/timeline/timeline.css']
			    }
		}
	},
	jshint: {
		 options: {
// 		      reporter: require('jshint-stylish'),
		      jshintrc : '.jshintrc'
		 },
// //  		 ignore_warning: {
// 		      options: {
// // 			    "-W041": true
// 		      },
// 		      src: [,'js/core/data/dataadapter.js']
// 		  }, 
		 prod: [ 'js/core/**/*.js', 'js/main/**/*.js', 'js/navigation/**/*.js']
	},
	plato: {
		options: {
		  // Task-specific options go here. 
		},
		prod: {
		  files : {'report' : ['js/core/**/*.js', 'js/main/*/*.js', 'js/navigation/**/*.js']}
		}
      }

  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-plato');
  grunt.task.registerTask('default', ['jshint:prod' , 'plato:prod', 'concat:prod', 'uglify:prod', 'cssmin:prod']);
  
};
