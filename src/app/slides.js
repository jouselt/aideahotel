angular.module('website', ['ngAnimate', 'ngTouch'])

  .controller('SlideCtrl', function ($scope) {
    $scope.slides = [
      {image: 'assets/images/image00.jpg', description: 'Image 00'},
      {image: 'assets/images/image01.jpg', description: 'Image 01'},
      {image: 'assets/images/image02.jpg', description: 'Image 02'},
      {image: 'assets/images/image03.jpg', description: 'Image 03'},
      {image: 'assets/images/image04.jpg', description: 'Image 04'}
      //{image: 'assets/images/image05.jpg', description: 'Image 05'},
      //{image: 'assets/images/image06.jpg', description: 'Image 06'},
      //{image: 'assets/images/image07.jpg', description: 'Image 07'},
      //{image: 'assets/images/image08.jpg', description: 'Image 08'},
      //{image: 'assets/images/image09.jpg', description: 'Image 09'},
      //{image: 'assets/images/image10.jpg', description: 'Image 10'}
    ];

    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
      $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
      return $scope.currentIndex === index;
    };
  });
