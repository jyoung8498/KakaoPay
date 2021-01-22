;(function($,window,document,undefined){
   var kakao ={
    init: function(){
        var that = this;
        
            that.headerFn();
            that.pageResizeFn();
            that.s1MainSlideFn();
            that.mouseMoveFn();

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
                    $(this).children('.m-submenu-box').slideDown(300);
                }
            });
            $('.moblie-menu').mouseleave(function(){
                if(!$('.m-submenu-box').is(':animated')){
                $(this).children('.m-submenu-box').slideUp(600);
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


        var cnt = 0;

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
    s1MainSlideFn:function(){
        var win = $(window);
        var n = $('.slide').length-1;
        var cnt =0;
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
            mainNextSlideFn()
        }

        function prevFn(){
            cnt--;
            if(cnt<0){cnt=n}
            mainPrevSlideFn()
        }

        function mainNextSlideFn(){
            $('.slide').css({zIndex:1});
            $('.slide').eq(cnt==0 ?n : cnt-1 ).css({zIndex:2});
            $('.slide').eq(cnt).css({zIndex:3}).animate({opacity:0}, 0).animate({opacity:1},1000);
        }   
        function mainPrevSlideFn(){
            $('.slide').css({zIndex:1}).animate({opacity:1}, 0);
            $('.slide').eq(cnt).css({zIndex:2});
            $('.slide').eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1}, 0).animate({opacity:1},1000);
        }   
        

        function timmer(){
            setInterval(nextFn,3000);
        }

        setTimeout(timmer,100);

        $('.slide img').swipe({
            swipeLeft:function(){
                nextFn();
            },
            swipeRight:function(){
                prevFn();
            }
        });

    },
    mouseMoveFn:function(){
     /*     $('#wrap').on({
            mousemove:function(event){
               console.log(event.clientX);
                console.log(event.clientY);
                $('.mousepointer').stop().animate({top:event.clientY+5,left:event.clientX}, 200, 'swing');
            }
        }); */
    }
}
    kakao.init();
})(jQuery,window,document);