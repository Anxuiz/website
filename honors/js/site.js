var app = angular.module('site', ['ui.router', 'angular.filter'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        title: 'Home',
      })
      .state('about', {
        url: '/about',
        templateUrl: 'partials/about.html',
        title: 'About',
      })
      .state('classes', {
        url: '/classes',
        templateUrl: 'partials/classes.html',
        title: 'Classes',
        controller: 'ClassesCtrl',
      })
      .state('schedule', {
        url: '/schedule',
        templateUrl: 'partials/schedule.html',
        title: 'Schedule',
        controller: 'ScheduleCtrl',
      })
      .state('research', {
        url: '/research',
        templateUrl: 'partials/research.html',
        title: 'Research',
      });

  $stateProvider
    .state('CSE143', {
      url: '/class/cse143',
      templateUrl: 'partials/class/CSE143.html',
      title: 'CSE 143',
      controller: 'CSE143Ctrl',
    })
    .state('HONORS100', {
      url: '/class/honors100',
      templateUrl: 'partials/class/HONORS100.html',
      title: 'HONORS 100',
    });
});

app.service('years', function() {
  var years = [
    {
      label: 'Freshman Year',
      start: 2014,
      end: 2015,
      classes: {
        'Autumn': [
          { id: 'ECON 200', title: 'Introduction to Microeconomics', instructor: 'Jagori Saha' },
          { id: 'MATH 308', title: 'Matrix Algebra', instructor: 'Selim Tuncel', tags: 'minor' },
          { id: 'CSE 143', title: 'Computer Programming II (honors)', instructor: 'Stuart Reges', href: 'CSE143', tags: 'major' },
          { id: 'HONORS 100', title: 'Introduction to Honors Education', href: 'HONORS100', tags: 'honors' },
          { title: 'Computer Science Direct Admit Seminar', tags: 'major' },
        ],
        'Winter': [
          { id: 'ENGL 111', title: 'Composition: Literature' },
          { id: 'MATH 307', title: 'Introduction to Differential Equations', tags: 'minor' },
          { id: 'CSE 331', title: 'Software Design & Implementation', instructor: 'John Perkins', tags: 'major' },
          { id: 'CSE 351', title: 'Hardware / Software Interface', instructor: 'Luis Ceze', tags: 'major' },
        ],
        'Spring': [
          { id: 'CSE 311', title: 'Foundations of Computing I', tags: 'major' },
          { id: 'CSE 333', title: 'Systems Programming', tags: 'major' },
          { id: 'CSE 341', title: 'Programming Languages', tags: 'major' },
          { id: 'MATH 309', title: 'Linear Analysis', tags: 'minor' },
          { id: 'MATH 324', title: 'Advanced Multivariable Calculus 1', tags: 'minor' },
        ],
      },
    },
    {
      label: 'Sophomore Year',
      start: 2015,
      end: 2016,
      classes: {
        'Autumn': [
          { id: 'CSE 332', title: 'Data Abstractions', tags: 'major' },
          { id: 'HONORS 230', title: 'Leadership, Democracy and A More Thoughtful Public', tags: 'honors' },
          { id: 'PHYS 121', title: 'Honors Mechanics', tags: 'honors' },
        ],
        'Winter': [
          { id: 'CSE 312', title: 'Foundations of Computing II', tags: 'major' },
          { id: 'CSE 401', title: 'Intro to Compiler Construction', tags: 'major' },
          { id: 'HONORS 240', title: 'Russian Crime Fiction', tags: 'honors' },
          { id: 'PHYS 122', title: 'Honors Electromagnetism', tags: 'honors' },
        ],
        'Spring': [
          { id: 'CSE 451', title: 'Intro to Operating Systems', tags: 'major' },
          { id: 'MATH 327', title: 'Intro to Real Analysis I', tags: 'minor' },
          { id: 'PHYS 123', title: 'Honors Waves', tags: 'honors' },
        ],
      },
    },
    {
      label: 'Senior Year',
      start: 2016,
      end: 2017,
      classes: {
        'Autumn': [
          { id: 'CSE 344', title: 'Intro to Database Management', tags: 'major' },
          { id: 'CSE 427', title: 'Computational Biology', tags: 'major' },
          { id: 'CSE 473', title: 'Intro to Artificial Intelligence', tags: 'major' },
          { id: 'HONORS 393', title: 'Rhetoric of Science', tags: 'honors' },
        ],
        'Winter': [
          { id: 'CSE 444', title: 'Database Internals', tags: 'major' },
          { id: 'HONORS 211', title: 'Ways of Meaning', tags: 'honors' },
          { id: 'HONORS 231', title: 'Islam and Muslims in Western Contexts', tags: 'honors' },
          { id: 'HONORS 496', title: 'Honors Core Integration', tags: 'honors' },
        ],
        'Spring': [
          { id: 'CSE 421', title: 'Introduction to Algorithms', tags: 'major' },
          { id: 'CSE 452', title: 'Distributed Systems', tags: 'major' },
          { id: 'CSE 457', title: 'Computer Graphics', tags: 'major' },
        ],
      },
    },
  ];

  return years;
});

app.service('classes', function(years) {
  return {
    getByTag: function(tag) {
      var classes = [];
      years.forEach(function(year) {
        for (var quarter in year.classes) {
          year.classes[quarter].forEach(function(klass) {
            if (klass.tags && klass.tags.indexOf(tag) !== -1) {
              classes.push(klass);
            }
          });
        }
      });
      return classes;
    },
  };
});

app.controller('MainCtrl', function($scope, $state) {
  $scope.$state = $state;
});

app.controller('ScheduleCtrl', function($scope, $state, years) {
  $scope.$state = $state;
  $scope.years = years;

  $scope.getFullQuarterName = function(abbr, startYear) {
    switch(abbr) {
    case 'AUT': return 'Autumn ' + startYear;
    case 'WIN': return 'Winter ' + (startYear + 1);
    case 'SPR': return 'Spring ' + (startYear + 1);
    case 'SUM': return 'Summer ' + (startYear + 1);
    default: return 'Unknown abbr: ' + abbr;
    }
  };
});

app.controller('ClassesCtrl', function($scope, $state, classes) {
  $scope.$state = $state;
  var hasHref = function(klass) { return klass.href; }
  $scope.classesMajor = classes.getByTag('major').filter(hasHref);
  $scope.classesHonors = classes.getByTag('honors').filter(hasHref);
  $scope.classesMinor = classes.getByTag('minor').filter(hasHref);
});

app.controller('CSE143Ctrl', function($scope) {
  var lines = [];
  $scope.render = function() {
    var maxLines = 15;
    if (lines.length > maxLines) {
      lines.splice(0, lines.length - maxLines);
    }
    $scope.output = lines.join('\n');
  };

  $scope.println = function(text) {
    lines.push(text);
    $scope.render();
  };

  $scope.num = 0;
  $scope.submit = function() {
    $scope.println("ok" + (++$scope.num));
    $scope.input = "";
  }
});
