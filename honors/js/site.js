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
          { id: 'MATH 308', title: 'Matrix Algebra', instructor: 'Selim Tuncel' },
          { id: 'CSE 143', title: 'Computer Programming II (honors)', instructor: 'Stuart Reges', href: 'CSE143', tags: 'major' },
          { id: 'HONORS 100', title: 'Introduction to Honors Education', href: 'HONORS100', tags: 'honors' },
          { title: 'Computer Science Direct Admit Seminar', tags: 'major' },
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
