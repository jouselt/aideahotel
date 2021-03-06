angular.module('website', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial', 'ngMdIcons', 'angular-flexslider'])
    .controller('MainCtrl', function ($scope) {
        $scope.slides = [
            {image: '../../assets/images/image00.jpg', description: 'Image 00'},
            {image: '../../assets/images/image01.jpg', description: 'Image 01'},
            {image: '../../assets/images/image02.jpg', description: 'Image 02'},
            {image: '../../assets/images/image03.jpg', description: 'Image 03'},
            {image: '../../assets/images/image04.jpg', description: 'Image 04'},
            {image: '../../assets/images/image05.jpg', description: 'Image 04'},
            {image: '../../assets/images/image06.jpg', description: 'Image 04'},
            {image: '../../assets/images/image07.jpg', description: 'Image 04'},
            {image: '../../assets/images/image08.jpg', description: 'Image 04'},
            {image: '../../assets/images/image09.jpg', description: 'Image 04'},
            {image: '../../assets/images/image10.jpg', description: 'Image 04'},
        ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    })
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    })
    .config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');
});
