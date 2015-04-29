// Generated on 2014-08-20 using generator-angular-feature 0.6.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.loadNpmTasks('grunt-inline');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-devcode');
	grunt.loadNpmTasks('grunt-auto-install');
	grunt.loadNpmTasks('grunt-build-number');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	// Define the configuration for all the tasks
	grunt.initConfig({

		buildnumber: {
			package : {}
		},

		// Config Less
		less: {
			development: {
				options: {
					paths: ['src/_styles/less'],
					sourceMap : true
				},
				files: [{
					'src/_styles/fe2.css': 'src/_styles/less/fe2.less'
				},{
					'src/_styles/fp2.css': 'src/_styles/less/fp2.less'
				}]
			},
			production: {
				options: {
					paths: ['src/_styles/less'],
					sourceMap : false
				},
				files: [{
					'src/_styles/fe2.css': 'src/_styles/less/fe2.less'
				},{
					'src/_styles/fp2.css': 'src/_styles/less/fp2.less'
				}]
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['devcode:server'],
				options: {
					livereload: true
				}
			},
			aspx: {
				files: ['src/**/*.aspx'],
				tasks: ['devcode:server','ngtemplates'],
				options: {
					livereload: true
				}
			},

			// styles: {
			// 	files: [
			// 		'src/_styles/{,*/}*.css'
			// 	],
			// 	tasks: ['newer:copy:styles'],
			// 	options: {
			// 		nospawn: true,
			// 		livereload: true
			// 	}
			// },
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'src/views/*.aspx',
					'.tmp/_styles/{,*/}*.css',
					'src/{,*/}*.js'
				],
				tasks: ['devcode:server', 'ngtemplates', 'livereload']
			}
		},

		ngtemplates: {
				SDCHART: {
						cwd:        'src',
						src:        '{,*/}*.aspx',
						dest:       'src/_scripts/templates.js',
						options: {
								htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true }
						}
				}
		},

		uglify: {
				options: {
						preserveComments: false,
						mangle: false
					  },
				my_target: {
				  files: {
					'dist/ks.sdchart.app.min.js': ['dist/ks.sdchart.app.js']
				  }
				}
			  },


		// The actual grunt server settings
		connect: {
			options: {
				port: 9002,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				// hostname: '127.0.0.1',
				livereload: 35729,
				middleware: function(connect, options) {
					return [
						// CORS support
						function(req, res, next) {
							res.setHeader('Access-Control-Allow-Origin', '*');
							res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
							res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
							next();
						},
						connect.static('.tmp'),
						connect.static('src')
					];
				}
			},
			livereload: {
				options: {
					// open: true,
					base: [
						'.tmp',
						'src'
					]
				}
			},
			test: {
				options: {
					port: 9000,
					base: [
						'.tmp',
						'test',
						'src'
					]
				}
			},
			dist: {
				options: {
					base: 'dist'
				}
			}
		},


		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'dist/*',
						'!dist/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		concat:   {
		    options: {
				separator: ';',
			},
			sdchart : {
				src:  [
					'src/_scripts/lib/es5-shim.min.js',
					'src/_scripts/lib/jquery-ui-1.10.4.custom.min.js',
					'src/_scripts/lib/ks_utils.js',
					'src/_scripts/lib/jshighcharts.js',
					'src/_scripts/lib/kurtosys.chart.js',
					'src/_scripts/lib/moment.js',
					'src/_scripts/lib/numeral_1.5.3.min.js',
					'src/_scripts/lib/kurtosys.chart.new.js',
					'src/_scripts/lib/kurtosys.chart.periodselector.js',
					'src/_scripts/lib/angular-route.js',
					'src/_scripts/lib/select2.js',
					'src/_scripts/sdchart.app.config.js',
					'src/_scripts/sdchart.app.angular-translation.js',
					'src/_scripts/sdchart.app.js',
					'src/_scripts/templates.js',
					'src/_scripts/sdchart.app.filters.js',
					'src/_scripts/sdchart.app.directives.js',
					'src/_scripts/sdchart.app.services.js',
					'src/_scripts/sdchart.app.controllers.js'
				],
				dest: 'dist/ks.sdchart.app.js',
				nonull: true
			},
			css: {
				src:  [
					'src/_styles/lib/font-awesome.min.css',
					'src/_styles/lib/select2.css',
					'src/_styles/sdchart.common.styles.css',
					'src/_styles/sdchart.static.styles.css',
					'src/_styles/sdchart.dynamic.styles.css'

				],
				dest: 'dist/ks.sdchart.styles.css'
			}
		},

		cssmin: {
			dist: {
				files: {
					'dist/ks.sdchart.styles.min.css': [
					'dist/ks.sdchart.styles.css'
			  		]
				}
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'src/_scripts',
					dest: 'dist',
					src: [
						'sdchart.widget.js'
					]
				}
				// , {
				// 	expand: true,
				// 	cwd: '.tmp/_images',
				// 	dest: 'dist/_images',
				// 	src: ['generated/*']
				// }
				]
			}
			// ,
			// styles: {
			// 	expand: true,
			// 	cwd: 'src/_styles/',
			// 	dest: '.tmp/styles/',
			// 	src: '{,*/}*.css'
			// }
		},




		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				// 'copy:styles'
			],
			test: [
				// 'copy:styles'
			],
			dist: [
				// 'copy:styles'
			]
		},

		devcode :
		{
			options :
			{
				html: true,        // html files parsing?
				js: true,          // javascript files parsing?
				css: true,         // css files parsing?
				aspx: true,
				clean: true,       // removes devcode comments even if code was not removed
				block: {
					open: 'devcode', // with this string we open a block of code
					close: 'endcode' // with this string we close a block of code
				},
				dest: 'dist'       // default destination which overwrittes environment variable
			},
			test : {           // settings for task used with 'devcode:server'
				options: {
						source: 'src/',
						dest: '.tmp/',
						env: 'development'
				}
			},
			server : {           // settings for task used with 'devcode:server'
				options: {
						source: 'src/',
						dest: '.tmp/',
						env: 'development'
				}
			},
			distuat : {             // settings for task used with 'devcode:dist'
				options: {
						source: '.tmp/',
						dest: '.tmp/',
						env: 'uat'
				}
			},
			distprod : {             // settings for task used with 'devcode:dist'
				options: {
						source: 'dist/',
						dest: 'dist/',
						env: 'production'
				}
			}
		},

		exec: {
			deploy_to_fundnet_uat: {
				command: 'phantomjs ddeploy.js cms_config_uat.js cms_user_uat.js'
			},
			deploy_to_fundnet_prod: {
				command: 'phantomjs ddeploy.js cms_config_prod.js cms_user_prod.js'
			},
			data: {
				command: 'casperjs app/tests/data-test.js'
			}
		},

		auto_install: {
			local: {},
			subdir: {
				options: {
					cwd: '',
					stdout: true,
					stderr: true,
					failOnError: true
				}
			}
		},

		pkg: grunt.file.readJSON('package.json'),

		'string-replace': {

			deploymentname: {
				files: [{
					expand: true,
					cwd: 'dist/',
					src: 'fe2_options.html',
					dest: 'dist/'
				}],
				options: {
					replacements: [{
						pattern: /__DEPLOYMENTNAME__/g,
						replacement: 'UAT'
					}]
				}
			},
			deploymenturl: {
				files: [{
					expand: true,
					cwd: 'dist/',
					src: ['styles/ks.fe2.style.css', 'scripts/ks.fe2.app.js'],
					dest: 'dist/'
				}],
				options: {
					replacements: [{
						pattern: /__DEPLOYMENTURL__/g,
						replacement: '' // TODO devcode!
					}]
				}
			},
			version: {
				files: [{
					expand: true,
					cwd: 'dist/scripts/',
					src: '*.js',
					dest: 'dist/scripts/'
				}],
				options: {
					replacements: [{
						pattern: /__VERSION__/g,
						replacement: '<%= pkg.version %>'
					}]
				}
			},
			buildnumber: {
				files: [{
					expand: true,
					cwd: 'dist/scripts/',
					src: '*.js',
					dest: 'dist/scripts/'
				}],
				options: {
					replacements: [{
						pattern: /__BUILDNUM__/g,
						replacement: '<%= pkg.build %>'
					}]
				}
			}

		}
	});


	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build-uat', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			// 'auto_install',
			'clean:server',
			'ngtemplates',
			'copy',
			// 'less',
			'devcode:server',
			'concurrent:server',
			// 'string-replace:dev',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});


	grunt.registerTask('ddeploy-uat', [
		'exec:deploy_to_fundnet_uat'
	]);

	grunt.registerTask('ddeploy-prod', [
		'exec:deploy_to_fundnet_prod'
	]);


	grunt.registerTask('build', [
		// 'auto_install',
		'clean:dist',
		'copy',
		// 'less',
		'ngtemplates',
		'concat',
		'cssmin',
		'devcode:distprod',
		'uglify',
	]);


};
