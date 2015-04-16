$(function() {

  var $menu			= $('#mb_menu'),
    $menuItems			= $menu.children('a'),
    $mbWrapper			= $('#mb_content_wrapper'),
    $mbClose			= $mbWrapper.children('.mb_close'),
    $mbContentItems		= $mbWrapper.children('.mb_content'),
    $mbContentInnerItems= $mbContentItems.children('.mb_content_inner');
    $mbPattern			= $('#mb_pattern'),
    $works				= $('#mb_imagelist > li'),
    $mb_bgimage			= $('#mb_background > img'),

    Menu		 		= (function(){

      var init		= function() {
          preloadImages();
          initPlugins();
          initPattern();
          initEventsHandler();
        },

      //preloads the images for the work area (data-bgimg attr)
        preloadImages	= function() {
          $works.each(function(i) {
            $('<img/>').attr('src' , $(this).children('img').data('bgimg'));
          });
        },
      //initialise the jScollPane (scroll plugin)
        initPlugins		= function() {
          $mbContentInnerItems.jScrollPane({
            verticalDragMinHeight: 40,
            verticalDragMaxHeight: 40
          });
        },
      /*
       draws 90 boxes on a specific area of the page.
       we randomly calculate the top, left, and rotation angle for each one of them
       */
        initPattern		= function() {
          for(var i = 0; i <32 ; ++i) {
            //random opacity, top, left, angle and color
            var colors = ['#82B1FF', '#448AFF','#2979FF','#2962FF', '#0D47A1'];
            var o		= (Math.random()/2),
              t		= Math.floor(Math.random()*80) + 15, // between 15 and 100
              l		= Math.floor(Math.random()*80) + 15, // between 10 and 100
              a		= Math.floor(Math.random()*101) - 50, // between -50 and 50
              c   = colors[Math.floor(Math.random()*5)];

            $el		= $('<div class="md_boxes">').css({
              opacity			: o,
              top				: t + '%',
              background: c,
              left			: l + '%'
            });

            //if (!$.browser.msie){
              $el.transform({'rotate'	: a + 'deg'});
            //}


            $el.appendTo($mbPattern);
          }
          $mbPattern.children().draggable(); //just for fun
        },
      /*
       when the User closes a content item, we move the boxes back to the original place,
       with new random values for top, left and angle though
       */
        disperse 		= function() {
          $mbPattern.children().each(function(i) {
            //random opacity, top, left and angle
            var colors = ['#82B1FF', '#448AFF','#2979FF','#2962FF', '#0D47A1'];
            var o		= (Math.random()/2),
              t		= Math.floor(Math.random()*80) + 15, // between 15 and 100
              l		= Math.floor(Math.random()*80) + 15, // between 10 and 100
              a		= Math.floor(Math.random()*101) - 50, // between -50 and 50
              c   = colors[Math.floor(Math.random()*5)];
            $el			= $(this),
              param		= {
                width	: '40px',
                height	: '40px',
                opacity	: o,
                background: c,
                top		: t + '%',
                left	: l + '%'
              };

            //if (!$.browser.msie) {
              param.rotate = a + 'deg';
            //}
            $el.animate(param, 1000, 'easeOutExpo');
          });
        },
        initEventsHandler	= function() {
          /*
           click a li nk in the menu
           */
          $menuItems.bind('click', function(e) {
            var $this	= $(this),
              pos		= $this.index(),
              speed	= $this.data('speed'),
              easing	= $this.data('easing');
            //if an item is not yet shown
            if(!$menu.data('open')){
              //if current animating return
              if($menu.data('moving')) return false;
              $menu.data('moving', true);
              $.when(openItem(pos, speed, easing)).done(function(){
                $menu.data({
                  open	: true,
                  moving	: false
                });
                showContentItem(pos);
                $mbPattern.children().fadeOut(300);
              });
            }
            else
              showContentItem(pos);
            return false;
          });

          /*
           click close makes the boxes animate to the top of the page
           */
          $mbClose.bind('click', function(e) {
            $menu.data('open', false);
            /*
             if we would want to show the default image when we close:
             changeBGImage('images/default.jpg');
             */
            $mbPattern.children().fadeIn(600, function() {
              $mbContentItems.hide();
              $mbWrapper.hide();
            });

            disperse();

            return false;
          });

          /*
           click an image from "Works" content item,
           displays the image on the background
           */
          $works.bind('click', function(e) {
            var source	= $(this).children('img').data('bgimg');
            changeBGImage(source);
            return false;
          });

        },
      /*
       changes the background zimage
       */
        changeBGImage		= function(img) {
          //if its the current one return
          if($mb_bgimage.attr('src') === img || $mb_bgimage.siblings('img').length > 0)
            return false;

          var $itemImage = $('<img src="'+img+'" alt="Background" class="mb_bgimage" style="display:none;"/>');
          $itemImage.insertBefore($mb_bgimage);

          $mb_bgimage.fadeOut(1000, function() {
            $(this).remove();
            $mb_bgimage = $itemImage;
          });
          $itemImage.fadeIn(1000);
        },
      /*
       This shows a content item when there is already one shown:
       */
        showContentItem		= function(pos) {
          $mbContentItems.hide();
          $mbWrapper.show();
          //$mbWrapper.draggable();
          $mbContentItems.eq(pos).show().children('.mb_content_inner').jScrollPane();
        },
      /*
       moves the boxes from the top to the center of the page,
       and shows the respective content item
       */
        openItem			= function(pos, speed, easing) {
          return $.Deferred(
            function(dfd) {
              $mbPattern.children().each(function(i) {

                var $el		= $(this),
                  param		= {
                    width	  : '100px',
                    height	: '100px',
                    top		: 90 + 100 * Math.floor(i/8),
                    left	: 100 + 100 * (i%8),
                    opacity	: 0.9
                  };
                  param.rotate	= '0deg';
                speed = "fast";
                easing = "linear";
                $el.animate(param, speed, easing, dfd.resolve);

              });
            }
          ).promise();
        };
      return {
        init : init
      };
    })();

  /*
   call the init method of Menu
   */
  Menu.init();
});
