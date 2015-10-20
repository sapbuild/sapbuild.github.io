     $(function () {
         var $window = $(window), win_height_padded = $window.height() * 1.1, isTouch = Modernizr.touch;
         if (isTouch) {
             $('.revealOnScroll').addClass('animated');
         }
         $window.on('scroll', revealOnScroll);
         function revealOnScroll() {
            var scrolled = $window.scrollTop(), win_height_padded = $window.height() * 1.1;
            console.log(scrolled)
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


     //
     //$(document).ready(function() {
     //    showOrHideCarousel($(window).width());
     //});

     $(window).resize(function() {
         showOrHideCarousel($(window).width());
     });

     $(document).ready(function() {
         showOrHideCarousel($(window).width());


         var navMain = $(".navbar-collapse a");
         navMain.on('click', function () {
             $('.navbar-collapse').collapse('hide');
         });


         if ($(window).width() > 1024) {

             var s = skrollr.init({
                 forceHeight: false,
                 smoothScrolling: false,
                 mobileDeceleration: 0.004
             });

             $('body').scrollspy({target: '#navbar'});


         }
         //var $root = $('html, body');
         //$('#navbar a').click(function() {
         //    $root.animate({
         //        scrollTop: $( $.attr(this, 'href') ).offset().top
         //    }, 500);
         //    return false;
         //});

         $('a').click(function(){
             $('html, body').animate({
                 scrollTop: $( $.attr(this, 'href') ).offset().top
             }, 500);
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
