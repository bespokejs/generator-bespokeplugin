'use strict';

var util = require('util'),
  path = require('path'),
  yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  GitHubApi = require('github');

var github = new GitHubApi({
    version: '3.0.0'
  }),
  githubUserInfo = function (user, callback) {
    github.user.getFrom({ user: user }, function (err, res) {
      if (err) { throw err; }
      callback(JSON.parse(JSON.stringify(res)));
    });
  };

var BespokepluginGenerator = module.exports = function BespokepluginGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'], bower: false });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BespokepluginGenerator, yeoman.generators.Base);

BespokepluginGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
    "\n" +
    chalk.cyan.bold("\noooooooooo.                                          oooo                          o8o          ") +
    chalk.cyan.bold("\n`888'   `Y8b                                         `888                          `\"'          ") +
    chalk.cyan.bold("\n 888     888  .ooooo.   .oooo.o oo.ooooo.   .ooooo.   888  oooo   .ooooo.         oooo  .oooo.o ") +
    chalk.cyan.bold("\n 888oooo888' d88' `88b d88(  \"8  888' `88b d88' `88b  888 .8P'   d88' `88b        `888 d88(  \"8 ") +
    chalk.cyan.bold("\n 888    `88b 888ooo888 `\"Y88b.   888   888 888   888  888888.    888ooo888         888 `\"Y88b.  ") +
    chalk.cyan.bold("\n 888    .88P 888    .o o.  )88b  888   888 888   888  888 `88b.  888    .o .o.     888 o.  )88b ") +
    chalk.cyan.bold("\no888bood8P'  `Y8bod8P' 8\"\"888P'  888bod8P' `Y8bod8P' o888o o888o `Y8bod8P' Y8P     888 8\"\"888P' ") +
    chalk.cyan.bold("\n                                 888                                               888          ") +
    chalk.cyan.bold("\n                                o888o                                          .o. 88P          ") +
    chalk.cyan.bold("\n                                                                               `Y888P           ") +
    "\n" +
    chalk.green.bold("Thanks for writing a Bespoke.js plugin! :)   -@markdalgleish") +
    "\n";

  console.log(welcome);

  var prompts = [
    {
      name: 'githubUser',
      message: 'What is your GitHub username?',
      default: 'someuser'
    },
    {
      name: 'pluginName',
      message: 'What is the name of your plugin?',
      default: 'myplugin'
    },
    {
      name: 'pluginDescription',
      message: 'What is the description of your plugin?',
      default: 'Some feature for Bespoke.js'
    }
  ];

  this.prompt(prompts, function (props) {
    this.githubUser = props.githubUser;
    this.pluginName = this._.slugify(props.pluginName).replace(/^bespoke-/, '').toLowerCase();
    this.pluginNameCamelized = this._.camelize(this.pluginName);
    this.pluginFullName = 'bespoke-' + this.pluginName;
    this.pluginDescription = props.pluginDescription;

    cb();
  }.bind(this));
};

BespokepluginGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  if (this.githubUser.toLowerCase() !== '') {
    githubUserInfo(this.githubUser, function (res) {
      this.realName = res.name;
      this.githubUrl = res.html_url;
      if (res.email) this.email = res.email;
      done();
    }.bind(this));
  } else {
    this.realName = '';
    this.githubUrl = '';
    done();
  }
};

BespokepluginGenerator.prototype.app = function app() {
  this.mkdir('lib');
  this.template('lib/name.js', 'lib/' + this.pluginFullName + '.js');

  this.mkdir('test');
  this.mkdir('test/spec');
  this.template('test/spec/nameSpec.js', 'test/spec/' + this.pluginFullName + 'Spec.js');

  this.mkdir('demo');
  this.template('demo/index.html', 'demo/index.html');
  this.template('demo/demo.js', 'demo/demo.js');
  this.copy('demo/style.css', 'demo/style.css');
};

BespokepluginGenerator.prototype.setupProjectFiles = function setupProjectFiles() {
  this.template('gulpfile.js', 'gulpfile.js');

  this.template('CONTRIBUTING.md', 'CONTRIBUTING.md');
  this.template('LICENSE', 'LICENSE');
  this.template('README.md', 'README.md');

  this.copy('_editorconfig', '.editorconfig');
  this.copy('_gitattributes', '.gitattributes');
  this.copy('_gitignore', '.gitignore');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_travis.yml', '.travis.yml');
  this.copy('karma.conf.js', 'karma.conf.js');
};

BespokepluginGenerator.prototype.setupPackageJson = function setupPackageJson() {
  var packageJson = {
    'name': this.pluginFullName,
    'version': '0.0.0',
    'description': this.pluginDescription,
    'homepage': this.githubUrl + '/' + this.pluginFullName,
    'bugs': this.githubUrl + '/' + this.pluginFullName + '/issues',
    'author': {
      'name': this.realName,
      'url': this.githubUrl
    },
    'main': './lib/' + this.pluginFullName + '.js',
    'repository': {
      'type': 'git',
      'url': 'git://github.com/' + this.githubUser + '/' + this.pluginFullName + '.git'
    },
    'scripts': {
      'test': 'gulp',
      'coveralls': 'gulp coveralls'
    },
    'peerDependencies': {
      'bespoke': '>=1.0.0'
    },
    'devDependencies': {
      'bespoke': '^1.0.0',
      'bespoke-classes': '^1.0.0',
      'bespoke-keys': '^1.0.0',
      'bespoke-touch': '^1.0.0',
      'browserify': '^4.1.5',
      'function-bind': '^0.1.0',
      'gulp': '^3.5.1',
      'gulp-clean': '^0.2.4',
      'gulp-coveralls': '^0.1.0',
      'gulp-header': '^1.0.2',
      'gulp-jshint': '^1.3.4',
      'gulp-karma': '0.0.2',
      'gulp-rename': '^1.2.0',
      'gulp-uglify': '^0.3.0',
      'istanbul': '^0.2.11',
      'jshint-stylish': '^0.1.5',
      'karma': '^0.10.9',
      'karma-browserify': '^0.2.1',
      'karma-coverage': '^0.1.5',
      'karma-jasmine': '^0.1.5',
      'karma-phantomjs-launcher': '^0.1.4',
      'lodash': '^2.4.1',
      'vinyl-buffer': '0.0.0',
      'vinyl-map': '^1.0.1',
      'vinyl-source-stream': '^0.1.1'
    },
    'engines': {
      'node': '>=0.10.0'
    },
    'licenses': [
      {
        'type': 'MIT'
      }
    ],
    'keywords': [
      'bespoke-plugin'
    ]
  };

  if (this.email) {
    packageJson.author.email = this.email;
  }

  this.write('package.json', JSON.stringify(packageJson, null, 2));
};

BespokepluginGenerator.prototype.setupBowerJson = function setupBowerJson() {
  var bowerJson = {
    'name': this.pluginFullName,
    'version': '0.0.0',
    "main": "./dist/" + this.pluginFullName + ".js",
    "ignore": [
      "**/.*"
    ],
    'dependencies': {
      'bespoke.js': '>=1.0.0'
    }
  };
  this.write('bower.json', JSON.stringify(bowerJson, null, 2));
};
