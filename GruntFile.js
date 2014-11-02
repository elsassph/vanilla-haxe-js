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
		dist: {
			main: 'Main', /*startup class*/
			classpath: ['src'],
			misc: ['-debug', '-dce full'],
			output: 'bin/<%= pkg.name %>.js'
		}
		/*dist: {
			hxml: 'build.hxml'
		}*/ 
	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-haxe');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['haxe', 'uglify']);

};