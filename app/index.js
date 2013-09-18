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
    this.installDependencies({ skipInstall: options['skip-install'] });
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
  this.mkdir('src');
  this.template('src/name.js', 'src/' + this.pluginFullName + '.js');

  this.mkdir('spec');
  this.template('spec/nameSpec.js', 'spec/' + this.pluginFullName + 'Spec.js');

  this.mkdir('demo');
  this.template('demo/index.html', 'demo/index.html');
  this.template('demo/demo.js', 'demo/demo.js');
  this.copy('demo/style.css', 'demo/style.css');
};

BespokepluginGenerator.prototype.setupProjectFiles = function setupProjectFiles() {
  this.template('Gruntfile.js', 'Gruntfile.js');

  this.template('CONTRIBUTING.md', 'CONTRIBUTING.md');
  this.template('LICENSE', 'LICENSE');
  this.template('README.md', 'README.md');

  this.copy('editorconfig', '.editorconfig');
  this.copy('gitattributes', '.gitattributes');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
  this.copy('travis.yml', '.travis.yml');
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
    'main': './dist/' + this.pluginFullName + '.js',
    'repository': {
      'type': 'git',
      'url': 'git://github.com/' + this.githubUser + '/' + this.pluginFullName + '.git'
    },
    'scripts': {
      'test': 'grunt'
    },
    'peerDependencies': {
      'bespoke': '>=0.3.0'
    },
    'devDependencies': {
      'grunt-cli': '~0.1.9',
      'grunt': '~0.4.1',
      'grunt-contrib-jshint': '~0.6.4',
      'grunt-contrib-jasmine': '~0.5.2',
      'grunt-contrib-concat': '~0.3.0',
      'grunt-contrib-uglify': '~0.2.4',
      'grunt-contrib-clean': '~0.5.0',
      'grunt-contrib-watch': '~0.5.3',
      'grunt-micro': '~0.1.0',
      'bespoke': '>=0.3.0'
    },
    'engines': {
      'node': '>=0.8.0'
    },
    'licenses': [
      {
        'type': 'MIT'
      }
    ],
    'keywords': [
      'bespoke.js-plugin'
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
    'dependencies': {
      'bespoke.js': '>=0.3.0'
    }
  };
  this.write('bower.json', JSON.stringify(bowerJson, null, 2));
};
