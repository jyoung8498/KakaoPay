;(function($,window,document,undefined){
   var kakao ={
    init: function(){
        var that = this;
        
            that.headerFn();
            that.s1MainSlideFn();
            that.pageResizeFn();
            that.scrollEventFn();
            that.mouseMoveFn();
            that.mousewheelMoveFn();

    },
    headerFn:function(){
        var smooth = $('.smooth-btn');
        var htBody = $('html,body');
        var mainMenu = $('.main-menu');
        var win = $(window);
        var underline = $('.underline i');
        var headerBg = $('.header-bg');
        var subMenu = $('.submenu-box');
        var goTop = $('.goTop');  //goTop
        var quick = $('.quick'); //quick 
        var header = $('#header');
        var url = null;
        var z=0;

        smooth.on({
           click:  function(event){
               var that = $(this);
               event.preventDefault();
               url = that.attr('href');
               htBody.stop().animate({scrollTop: $( url ).offset().top  }, 600);
            }
        });

        win.scroll(function(){
            /* header, goTop */
            if( win.scrollTop() >= 30 ){
                header.addClass('addHeader');
                goTop.addClass('addGoTop');
                quick.addClass('addQuick');
                $('.w3c-box').addClass('addW3c');
            } else {
                header.removeClass('addHeader');
                goTop.removeClass('addGoTop');
                quick.removeClass('addQuick');
                $('.w3c-box').removeClass('addW3c');
            }      
        });
      

        mainMenu.each(function(idx){
            $(this).on({
                mouseover:function(){
                    underline.eq(idx).stop().animate({marginLeft:5}, 1000);
                    subMenu.stop().slideDown(800);
                    headerBg.stop().slideDown(800);
                },
                mouseleave:function(){
                    underline.eq(idx).stop().animate({marginLeft:-200}, 1000);
                    subMenu.stop().slideUp(1000);
                    headerBg.stop().slideUp(1000);

                }
            });
        });

        /*  모바일 메뉴  */
        function moblieMenuFn(){
            $('.moblie-menu').mouseover(function(){
                if(!$('.m-submenu-box').is(':animated')){
                    $(this).children('.m-submenu-box').slideDown(600);
                }
            });
            $('.moblie-menu').mouseleave(function(){
                if(!$('.m-submenu-box').is(':animated')){
                $(this).children('.m-submenu-box').slideUp(1000);
                }
            });
        }


        z=0;
        $('#moblie-nav').stop().animate({marginLeft:-100 + '%'});
        $('.moblie-menuBtn').on({
            click:function(){
                if( z==0 ){
                    $(this).addClass('addMenu');
                    $('#moblie-nav').stop().animate({marginLeft:0 + '%'});
                    z=1;

                } else if( z==1 ){
                    $(this).removeClass('addMenu');
                    $('#moblie-nav').stop().animate({marginLeft:-100 + '%'});
                    z=0;
                }
                
                moblieMenuFn();

            }
        });

            
    },
    s1MainSlideFn:function(){
        var win = $(window);
        var n = $('.slide').length-1;
        var cnt = 0;
        var imsi = null;
        var setId = 0;
        
        setTimeout(resizeFn() ,100);

        function resizeFn(){
            if(win.width() < 1024 ){
                $('#wrap').addClass('moblie');
                $('.header-right').hide();
                $('#moblie-nav').show();
            }else{
                $('#wrap').removeClass('moblie');
                $('.header-right').show();
                $('#moblie-nav').hide();
            }
        }
        
        win.resize(function(){
            resizeFn()
        });


        // 슬라이드

        function nextFn(){
            cnt++;
            if(cnt>n){cnt=0;}
            mainNextSlideFn();
        }

        function prevFn(){
            cnt--;
            if(cnt<0){cnt=n}
            mainPrevSlideFn();

        }

        function mainNextSlideFn(){
            $('.slide').css({zIndex:1});

            if(imsi !== null){
                $('.slide').eq(imsi).css({zIndex:2});
            }else{
                $('.slide').eq(cnt==0 ?n : cnt-1 ).css({zIndex:2});
            }
            $('.slide').eq(cnt).css({zIndex:3}).animate({opacity:0}, 0).animate({opacity:1},1500);
            pageBtnEventFn();
        }   
        function mainPrevSlideFn(){
            $('.slide').css({zIndex:1}).animate({opacity:1}, 0);
            $('.slide').eq(cnt).css({zIndex:2});
            if(imsi !==null){
                $('.slide').eq(imsi).css({zIndex:3}).animate({opacity:1}, 0).animate({opacity:0},1500);
            }else{
                $('.slide').eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1}, 0).animate({opacity:0},1500);
            }
            pageBtnEventFn();
        }   
        
        timmer();
        function timmer(){
           setId = setInterval(nextFn,3000);
        }


        $('.slide img').swipe({
            swipeLeft:function(){
                if( !$('.slide').is(':animated')){
                    nextFn();
                }
            },
            swipeRight:function(){
                if( !$('.slide').is(':animated')){
                    prevFn();
                }
            }
        });

        // 페이지 버튼
        function pageBtnEventFn(){
            $('.pageBtn').removeClass('addPage');
            $('.pageBtn').eq(cnt).addClass('addPage');
        }

        $('.pageBtn').each(function(idx){
            $(this).on({
                click:function(){

                    imsi = cnt;
                    cnt = idx;
                    
                if( imsi < idx ){
                    mainNextSlideFn();
                }else if(imsi > idx){
                    mainPrevSlideFn();
                }
                }
            });
        });

         /* 모달 업 */
         $('.slide-btn').on({
            click:function(){
                $('.modal').stop().fadeIn(300);
                $('html').addClass('addModal');
            }
        });
        $('.close').on({
            click:function(){
                $('.modal').stop().fadeOut(300);
                $('html').removeClass('addModal');
                var z= $('.modal-wrap video').attr('src','./img/services/ani/movie-high.mp4');
                clearInterval(z);
            }
        });
    },
    pageResizeFn:function(){
        var win = $(window);
        var s1 = $('#section1');
        var s1H = 0.524669073 ;
        var winW = win.innerWidth();
        var winH = win.innerHeight();
        var imgW = $('.slide').width();
        var imgH = imgW * 0.365824308;
        var conT = imgH/2;
        var conW = winW * 0.052083333;
        var playBtn = $('.play-btn');
        var conL = (winW+conW)/2;
        var s1H2 = $('.s1-wrap h2');
        var sImg = $('.imgwrap');
        var s1H2Rate = 0.046875;
        var tH23 = 0.039109507; // 976/65 // 976/65
        var tP = 0.013838748; // 470/23 
        var tH4 = 0.024067389;
        var line= 1.739130435; //lineHeight
        var fLeftFont = 0.010830325;
        var fsubFont = 0.008423586;

        setTimeout(function(){
            if(winW < 715){
                smallResizeFn();
            }else{
                imgResizeFn();
            }
        }, 100);
        setTimeout(showFn(), 100);
        setInterval(slideShow, 900)
 
        // 반응형 
        function imgResizeFn(){
            winH = win.innerHeight();
            winW = win.innerWidth();
            imgW = $('.slide img').width();
            imgS = $('.slide img');
            imgH = imgW * 0.316666667;
            conT = imgH/2;
            conW = winW * 0.052083333;
            conL = (winW+conW)/2;
            s1H2 = $('.s1-wrap h2');
            s2H2Rate = 0.046875;
            s1 = $('#section1');
            s1H = 0.524669073 ;
          
            s1.css({height:winW*s1H});
            imgS.css({ height:imgH });
            playBtn.css({ top:conT, width:conW, left:conL });
            s1H2.css({fontSize:winW*s1H2Rate});
        }
        
        function smallResizeFn(){
            tH23 = 0.039109507; // 976/65
            tP = 0.013838748; // 470/23 
            tH4 = 0.024067389;
            line= 1.739130435; //lineHeight
            sImg = $('.imgwrap');
            fLeftFont = 0.010830325;
            fsubFont = 0.008423586;


                imgResizeFn();

               sImg.css({width:winW});
               $('.title h2').css({fontSize:winW*tH23});
               $('.title h3').css({fontSize:winW*tH23});
               $('.text-wrap > p').css({fontSize:winW*tP});
               $('.s4-text h4').css({fontSize:winW*tH4});
               $('.f-list1').css({fontSize:winW*fLeftFont});
               $('.f-sub-list') .css({fontSize:win*fsubFont});

        }

        //폰트 리사이즈
        win.resize(function(){
            if(win.width() <  715){
                smallResizeFn();
            } else if( win.width() <  1145){
                $('.f-list1') .css({fontSize:14 + 'px'});
                $('.f-sub-list') .css({fontSize:12 + 'px'});

            } 
            else {
               $('.title h2').css({fontSize:65+'px'});
               $('.title h3').css({fontSize:65+'px'});
               $('.text-wrap > p').css({fontSize:23 + 'px'});
               $('.s4-text h4').css({fontSize: 40 + 'px'});
               $('.f-list1').css({fontSize:18 + 'px'});
               $('.f-sub-list').css({fontSize:14 + 'px'});
               sImg.css({width:550});

            }
            imgResizeFn();
        });
        

        // 페이지 시작때 페이드인
        function showFn(){
            $('.s1-wrap h2').addClass('addShow');
        }

        function slideShow(){
            $('.slide-wrap').addClass('addSlideShow');
              
        }
        
    },
    
    scrollEventFn:function(){
        var win = $(window);
        var s2 = $('#section2');
        var s3 = $('#section3');
        var s4 = $('#section4');
        var s2Title = $('.s2-title');
        var s2Text =  $('.s2-text');
        var s3Title = $('.s3-title');
        var s3Text =  $('.s3-text');
        var s3Img =  $('.s3-imgwrap');
        var s4Title = $('.s4-title');
        var s4Text =  $('.s4-text');
        var s4Img =  $('.s4-imgwrap');
        //var footer

      


        win.scroll(function(){
            

            // section2 
            if( $(this).scrollTop() > s2.offset().top-500 ){
                s2Title.stop().animate({ marginLeft:0, opacity:1 }, 1000);
                s2Text.stop().animate({ marginRight:30, opacity:1 }, 1200);
            } else {
                s2Title.stop().animate({ marginLeft:-300, opacity:0 }, 800);
                s2Text.stop().animate({ marginRight:-300, opacity:0 }, 800);
            }
            
            // section3 
            if( $(this).scrollTop() > s3.offset().top-500 ){
                s3Title.stop().animate({ marginLeft:0, opacity:1 }, 1000);
                s3Text.stop().animate({ marginLeft:0, opacity:1 }, 1000);
                s3Img.stop().animate({ marginRight:0, opacity:1 }, 1000);
            } else {
                s3Title.stop().animate({ marginLeft:-300, opacity:0 }, 800);
                s3Text.stop().animate({ marginLeft:-300, opacity:0 }, 800);
                s3Img.stop().animate({ marginRight:-300, opacity:0 }, 800);
            }    

             // section4 
             if( $(this).scrollTop() > s4.offset().top-500 ){
                s4Title.stop().animate({ marginLeft:0, opacity:1 }, 1000);
                s4Text.stop().animate({ marginLeft:0, opacity:1 }, 1000);
                s4Img.stop().animate({ marginRight:0, opacity:1 }, 1000);
            } else {
                s4Title.stop().animate({ marginLeft:-300, opacity:0 }, 800);
                s4Text.stop().animate({ marginLeft:-300, opacity:0 }, 800);
                s4Img.stop().animate({ marginRight:-300, opacity:0 }, 800);
            }    

        });    

    },
    mouseMoveFn:function(){
        $('#wrap').on({
            mousemove:function(event){
               
                $('.mousepointer').stop().animate({top:event.clientY+5,left:event.clientX}, 200, 'swing');
            }
        }); 
    },
    mousewheelMoveFn:function(){
        var _wheelDelta = null;
        var n = $('.section').length;

        $('.section').each(function(index){
            $(this).on('mousewheel DOMMouseScroll',function(event){
                event.preventDefault();

                if( event.detail ){
                    _wheelDelta = event.detail*(-1*40);
                 }
                 else{
                    _wheelDelta = event.originalEvent.wheelDelta;
                 }
            

                if(_wheelDelta < 0){
                    if(index < n-1){
                        if( index == n-2 ){
                            $('html, body').stop().animate({ scrollTop: $('#footer').offset().top+100},1000);
                        }else{
                            $('html, body').stop().animate({ scrollTop: $(this).next().offset().top+100 },1000);
                        }
                    }
                } else{
                    if(index > 0){
                        if(index == n-1 ){
                            $('html, body').stop().animate({ scrollTop: $('#section4').offset().top+100},1000);
                        }else{
                            $('html, body').stop().animate({ scrollTop: $(this).prev().offset().top+100},1000);
                        }
                    }
                } 
            });
        });
    }//마우스휠
}
    kakao.init();
})(jQuery,window,document);