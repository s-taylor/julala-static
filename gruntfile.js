module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //-----------
    // BUILD
    //-----------

    //clean the build directory
    clean: {
      build: {
        src: [ 'build' ]
      },
      sheets: {
        src: [ 'build/css/*.css' ]
      },
      scripts: {
        src: [ 'build/js/*.js' ]
      }
    },

    //copy files from the source directory to the build directory
    copy: {
      build: {
        cwd: 'source',
        src: [ '**' ],
        dest: 'build',
        expand: true
      },
      sheets: {
        cwd: 'source/css',
        src: [ '**' ],
        dest: 'build/css',
        expand: true
      },
      scripts: {
        cwd: 'source/js',
        src: [ '**' ],
        dest: 'build/js',
        expand: true
      }
    },

    //---------------------
    // JAVASCRIPT - MINIFY
    //---------------------

    //combines multiple javascript files into a single file
    concat: {
      options: {
        separator: ';'
      },
      scripts: {
        src: ['build/js/*.js'],
        dest: 'build/application.js'
      }
    },

    //minifies javascript
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      },
      scripts: {
        files: {
          'build/application.min.js': ['<%= concat.scripts.dest %>']
        }
      }
    },

    //-------------
    // CSS - BUILD
    //-------------

    //minifies and combines css files
    cssmin: {
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'build/application.min.css': ['build/css/*.css']
        }
      }
    },

    //------------------------
    // WATCH FOR FILE CHANGES
    //------------------------

    //watch for changes to source folders and run specified task
    watch: {
      sheets: {
        files: 'source/css/**',
        tasks: [ 'sheets' ]
      },
      scripts: {
        files: 'source/js/**',
        tasks: [ 'scripts' ]
      }
    }

  });

  //allows the tasks to be run individually
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //allow updating of javascript files
  grunt.registerTask(
    'scripts', 
    'Update javascript files in build', 
    [ 'clean:scripts', 'copy:scripts', 'concat', 'uglify' ]
  );

  //allow updating of javascript files
  grunt.registerTask(
    'sheets', 
    'Update stylesheet files in build', 
    [ 'clean:sheets', 'copy:sheets', 'cssmin' ]
  );

  grunt.registerTask('default', ['clean:build','copy:build','concat','uglify','cssmin']);

};