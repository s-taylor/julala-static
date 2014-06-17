module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //-----------
    // BUILD
    //-----------

    //clean the build directory
    clean: {
      //FOR BUILD
      build: {
        src: [ 'build' ]
      },
      scripts_not_app: {
        src: [ 'build/js/*', '!build/js/application.js' ]
      },
      //FOR DIST
      dist: {
        src: [ 'dist' ]
      },
      //FOR GRUNT WATCH
      sheets: {
        src: [ 'build/css/**' ]
      },
      scripts: {
        src: [ 'build/js/**' ]
      }
    },

    //copy files from the source directory to the build directory
    copy: {
      //FOR BUILD
      html: {
        cwd: 'source',
        src: [ '**/*.html' ],
        dest: 'build',
        expand: true
      },
      sheets: {
        cwd: 'source/css',
        src: [ '**','!**/*.scss' ],
        dest: 'build/css',
        expand: true
      },
      scripts: {
        cwd: 'source/js',
        src: [ '**','!**/*.coffee' ],
        dest: 'build/js',
        expand: true
      },
      lib: {
        cwd: 'source/lib',
        src: [ '**' ],
        dest: 'build/lib',
        expand: true
      },
      //FOR DIST
      dist: {
        cwd: 'build',
        src: [ '**/*.html', 'lib/**' ],
        dest: 'dist',
        expand: true
      },
    },

    //---------------------
    // JAVASCRIPT - MINIFY
    //---------------------

    //compile coffeescript (and move to the build directory)
    coffee: {
      build: {
        expand: true,
        cwd: 'source/js',
        src: [ '**/*.coffee' ],
        dest: 'build/js',
        ext: '.js'
      }
    },

    //combines multiple javascript files into a single file
    concat: {
      options: {
        //this creates a seperator between files with the filename in the comment
        process: function(src, filepath) {
          return '//####' + filepath + '\n' + src;
        }
      },
      scripts: {
        src: ['build/js/**/*.js'],
        dest: 'build/js/application.js'
      }
    },

    //minifies javascript
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        // compress: true
      },
      scripts: {
        files: {
          'dist/js/application.js': ['<%= concat.scripts.dest %>']
        }
      }
    },

    //-------------
    // CSS - BUILD
    //-------------

    //compile scss (and move to the build directory)
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'source/css',
          src: ['*.scss'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },

    //minifies and combines css files
    cssmin: {
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'dist/css/application.css': ['build/css/*.css']
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

  //file manipulation
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //javascript
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //css
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //auto update
  grunt.loadNpmTasks('grunt-contrib-watch');

  //allow updating of javascript files
  // grunt.registerTask(
  //   'scripts', 
  //   'Update javascript files in build', 
  //   [ 'clean:scripts', 'copy:scripts', 'concat', 'uglify' ]
  // );

  // //allow updating of javascript files
  // grunt.registerTask(
  //   'sheets', 
  //   'Update stylesheet files in build', 
  //   [ 'clean:sheets', 'copy:sheets', 'cssmin' ]
  // );

  //populate the build folder copying/compiling the latest source files
  grunt.registerTask(
    'build', 
    'generate the build directory', 
    [ 'clean:build', 'copy', 'coffee', 'sass', 'concat','clean:scripts_not_app' ]
  );

  grunt.registerTask(
    'dist', 
    'generate the dist directory', 
    [ 'clean:dist','cssmin','uglify', 'copy:dist' ]
  );

  grunt.registerTask('default', ['build','dist']);

};