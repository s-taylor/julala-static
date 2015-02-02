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
      js_files: {
        src: [ 'build/js/*', '!build/js/application.js' ]
      },
      css_files: {
        src: [ 'build/css/*', '!build/css/application.css' ]
      },
      //FOR DIST
      dist: {
        src: [ 'dist' ]
      },
      //FOR GRUNT WATCH
      html: {
        src: [ 'build/*.html' ]
      },
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
      img: {
        cwd: 'source/img',
        src: [ '**' ],
        dest: 'build/img',
        expand: true
      },
      //FOR DIST
      dist: {
        cwd: 'build',
        src: [ '**/*.html', 'lib/**', 'img/**' ],
        dest: 'dist',
        expand: true
      }
    },

    //combines multiple javascript files into a single file
    concat: {
      sheets: {
        options: {
          //this creates a seperator between files with the filename in the comment
          process: function(src, filepath) {
            return '/*####' + filepath + '*/' + '\n' + src;
          }
        },
        src: ['build/css/**/*.css'],
        dest: 'build/css/application-noprefix.css'
      },
      scripts: {
        options: {
          //this creates a seperator between files with the filename in the comment
          process: function(src, filepath) {
            return '//####' + filepath + '\n' + src;
          }
        },
        src: ['build/js/**/*.js'],
        dest: 'build/js/application.js'
      }
    },

    //------------
    // JAVASCRIPT
    //------------

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

    //-----
    // CSS 
    //-----

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

    //add browser specific prefixes
    autoprefixer: {
      single_file: {
        src: 'build/css/application-noprefix.css',
        dest: 'build/css/application.css'
      },
    },

    //minifies and combines css files
    cssmin: {
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'dist/css/application.css': ['build/css/application.css']
        }
      }
    },

    //------------------------
    // WATCH FOR FILE CHANGES
    //------------------------

    //watch for changes to source folders and run specified task
    watch: {
      html: {
        files: 'source/*.html',
        tasks: [ 'html' ]
      },
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
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //auto update
  grunt.loadNpmTasks('grunt-contrib-watch');

  //-------------------------------------------------------------------------

  //allow updating of html files
  grunt.registerTask(
    'html', 
    'Update html files in build', 
    [ 'clean:html', 'copy:html' ]
  );

  //allow updating of javascript files
  grunt.registerTask(
    'scripts', 
    'Update javascript files in build', 
    [ 'clean:scripts', 'copy:scripts', 'coffee', 'concat:scripts', 'clean:js_files' ]
  );

  // //allow updating of javascript files
  grunt.registerTask(
    'sheets', 
    'Update stylesheet files in build', 
    [ 'clean:sheets', 'copy:sheets', 'sass', 'concat:sheets', 'autoprefixer', 'clean:css_files' ]
  );

  //-------------------------------------------------------------------------

  grunt.registerTask(
    'copy_build', 
    'perform copy operations for build (ignore dist copy)', 
    [ 'copy:html', 'copy:sheets', 'copy:scripts', 'copy:lib', 'copy:img' ]
  );

  grunt.registerTask(
    'build', 
    'generate the build directory', 
    [ 'clean:build', 'copy_build', 'coffee', 'sass', 'concat', 'autoprefixer', 'clean:js_files', 'clean:css_files' ]
  );

  grunt.registerTask(
    'dist', 
    'generate the dist directory', 
    [ 'clean:dist', 'copy:dist', 'cssmin','uglify' ]
  );

  grunt.registerTask('default', ['build','dist']);

};

//ADDONS TO EXPLORE/

//HTMLHint
//autoprefixer

// htmlhint: {
//   build: {
//     options: {
//       'tag-pair': true,
//       'tagname-lowercase': true,
//       'attr-lowercase': true,
//       'attr-value-double-quotes': true,
//       'doctype-first': true,
//       'spec-char-escape': true,
//       'id-unique': true,
//       'head-script-disabled': true,
//       'style-disabled': true
//     },
//     src: ['index.html']
//   }
// }
