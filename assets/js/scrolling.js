     $(function () {
         var $window = $(window), win_height_padded = $window.height() * 1.1, isTouch = Modernizr.touch;
         if (isTouch) {
             $('.revealOnScroll').addClass('animated');
         }
         $window.on('scroll', revealOnScroll);
         function revealOnScroll() {
            var scrolled = $window.scrollTop(), win_height_padded = $window.height() * 1.1;
             if ($(window).width() <= 1024 && scrolled > 1000) {
                 console.log(scrolled);
                 $('.newsletterPopup').css({display: 'block', 'animation-name': 'newsletterPopup'});

             } else if ($(window).width() <= 1024) {
                 $('.newsletterPopup').css({display: 'none'});

             }
            if (scrolled > 25) {
              //$('.header-new').css({ opacity: scrolled/700 });
              $('.header-new').addClass( "header-sticky" );

            } else {
              $('.header-new').removeClass( "header-sticky" );
            }

             $('.revealOnScroll:not(.animated)').each(function () {
                 var $this = $(this), offsetTop = $this.offset().top;
                 if (scrolled + win_height_padded > offsetTop) {
                  console.log("here");
                     if ($this.data('timeout')) {
                         window.setTimeout(function () {
                             $this.addClass('animated ' + $this.data('animation'));
                         }, parseInt($this.data('timeout'), 10));
                     } else {
                         $this.addClass('animated ' + $this.data('animation'));
                     }
                 }
             });
             $('.revealOnScroll.animated').each(function (index) {
                 var $this = $(this), offsetTop = $this.offset().top;
                 if (scrolled + win_height_padded < offsetTop) {
                     $(this).removeClass('animated fadeInUp zoomIn flipInX lightSpeedIn');
                 }
             });
         }
         revealOnScroll();
     });

     $(window).resize(function() {
         showOrHideCarousel($(window).width());
         checkRatioForBoxGifs();
     });

     $(document).ready(function() {
         showOrHideCarousel($(window).width());

         checkRatioForBoxGifs();

         if ( !!window.localStorage.getItem("newsletter") ) {
             $('.newsletterPopup').remove();

         } else {

             $('.closeField').click(function(){
                 window.localStorage.setItem("newsletter", true);
                 $('.newsletterPopup').remove();
             });
         }

         var navMain = $(".navbar-collapse a");
         navMain.on('click', function () {
             $('.navbar-collapse').collapse('hide');
         });


         if ($(window).width() > 1024) {

             var gif = $('.gif');

             var s = skrollr.init({
                 forceHeight: false,
                 smoothScrolling: false,
                 mobileDeceleration: 0.004,
                 render: function() {
                     if ( gif.hasClass('skrollable-after') ) {
                         var gifAfter = $('.gif.skrollable-after');
                         restartAnimation(gifAfter)
                     } else if (gif.hasClass('skrollable-before')) {
                         var gifBefore = $('.gif.skrollable-before');
                         restartAnimation(gifBefore)
                     }
                 }
             });

             $('body').scrollspy({target: '#navbar'});

         }

         $('a').click(function(){
             $('html, body').animate({
                 scrollTop: $( $.attr(this, 'href') ).offset().top
             }, 2000);
             return false;
         });
     });


     function showOrHideCarousel (width) {
         if ( width > 1024) {
             $(".browserBoxWrapper").hide();
             $(".article-wrapper").show();
         } else {
             $(".browserBoxWrapper").show();
             $(".article-wrapper").hide();

         }
     }

     function checkRatioForBoxGifs() {
         if ( ($(window).width()) > $(window).height() + 450) {
             $(".fixed").removeClass("vw").addClass("vh");

         } else {
             $(".fixed").removeClass("vh").addClass("vw");


         }
     }

     var resetHelperImages = {};

     function restartAnimation(elem) {
         elem = $(elem);
         for (var i = 0; i < elem.length; i++) {
             var element = elem[i];
             // code part from: http://stackoverflow.com/a/14013171/1520422
             var style = element.currentStyle || window.getComputedStyle(element, false);
             var bgImg = style.backgroundImage.slice(4, -1).replace(/"/g, '');
             var helper = resetHelperImages[bgImg]; // we cache our image instances
             if (!helper) {
                 helper = $('<img>')
                     .attr('src', bgImg)
                     .css({
                         position: 'absolute',
                         top: 0,
                         left: '-9000px'
                     }) // make it invisible, but still force the browser to render / load it
                     .appendTo('body')[0];
                 resetHelperImages[bgImg] = helper;
                 setTimeout(function() {
                     helper.src = bgImg;
                 }, 10);
                 // the first call does not seem to work immediately (like the rest, when called later)
                 // i tried different delays: 0 & 1 don't work. With 10 or 100 it was ok.
                 // But maybe it depends on the image download time.
             } else {
                 // code part from: http://stackoverflow.com/a/21012986/1520422
                 helper.src = bgImg;
             }
         }
         // force repaint - otherwise it has weird artefacts (in chrome at least)
         // code part from: http://stackoverflow.com/a/29946331/1520422
         elem.css("opacity", .99);
         setTimeout(function() {
             elem.css("opacity", 1);
         }, 20);
     }
