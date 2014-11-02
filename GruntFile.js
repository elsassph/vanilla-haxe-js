module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'bin/<%= pkg.name %>.min.js': ['bin/<%= pkg.name %>.js']
        }
      }
    },
	
	haxe: {	
		app: {
			main: 'Main', /*startup class*/
			classpath: ['src'],
			output: 'bin/<%= pkg.name %>.js'
		}
		/*app: {
			hxml: 'build.hxml'
		}*/ 
	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-haxe');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['haxe', 'uglify']);

};