;(function($,window,document,undefined){
    var kakao ={
     init: function(){
         var that = this;
         
             that.headerFn();
             that.pageResizeFn();
             that.resizeHeaderFn();
             that.pageChangeFn();
             that.s56BtnFn();
             that.scrollEventFn();
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
         var s1H = 0.180505415;;
         var winW = win.innerWidth();
         var winH = win.innerHeight();
         var imgW = $('.slide').width();
         var imgH = imgW * 0.180505415;
         var conT = imgH/2;
         var conW = winW * 0.052083333;
         var playBtn = $('.play-btn');
         var conL = (winW+conW)/2;
         var s1H2 = $('.s1-wrap h2');
         var sImg = $('.imgwrap');
         var tH3 = 0.013838748; // 976/65 // 976/65
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

  
         // 반응형 
         function imgResizeFn(){
             winH = win.innerHeight();
             winW = win.innerWidth();
             imgW = $('.title-img img').width();
             imgS = $('.title-img img');
             imgH = imgW * 0.180505415;
             conT = imgH/2;
             conW = winW * 0.052083333;
             conL = (winW+conW)/2;
             s1H2 = $('.s1-wrap h2');
             s1 = $('#section1');
             s1H = 0.180505415;
           
             s1.css({height:winW*s1H});
             imgS.css({ height:imgH });
             playBtn.css({ top:conT, width:conW, left:conL });
             s1H2.css({fontSize:winW*0.022864019});
         }
         
         function smallResizeFn(){
             tH2 = 0.022864019; // 976/65
             tH3 = 0.013838748; // 976/65
             line= 1.739130435; //lineHeight
             sImg = $('.imgwrap');
             fLeftFont = 0.010830325;
             fsubFont = 0.008423586;
 
 
                 imgResizeFn();
 
                sImg.css({width:winW});
                $('.title h2').css({fontSize:winW*tH2});
                $('.title h3').css({fontSize:winW*tH3});
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
                $('.title h2').css({fontSize:38 +'px'});
                $('.title h3').css({fontSize:23 +'px'});
                $('.text-wrap > p').css({fontSize:16 + 'px'});
                $('.s4-text h4').css({fontSize: 40 + 'px'});
                $('.f-list1').css({fontSize:18 + 'px'});
                $('.f-sub-list').css({fontSize:14 + 'px'});
                sImg.css({width:550});
 
             }
             imgResizeFn();
         });
         
 
         // 페이지 시작때 페이드인

         
     },
     resizeHeaderFn:function(){
         var win = $(window);
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
 
 
 
     },
    pageChangeFn:function(){

        $('.page-btn').each(function(cnt){
                $(this).on({
                    click:function(event){
                        event.preventDefault();
                        $('.page-btn').removeClass('addPageBtn');
                        $(this).addClass('addPageBtn');
                        

                        if(cnt==0){
                            cnt=1;
                        }
                        $('.content-wrap').removeClass('addchanges');
                        $('.content-wrap').eq(cnt-1).addClass('addchanges');
                        $('.title-wrap').removeClass('addchanges');
                        $('.title-wrap').eq(cnt-1).addClass('addchanges');
                        $('.title-img').removeClass('addImgShow');
                        $('.title-img').eq(cnt-1).addClass('addImgShow');
                    }
                });
            });

    },
    s56BtnFn:function(){
        var cnt = 0;
        var z = 0;
        var x = 0;
        var v = 0;
        var m = 0;
        
        // section05
        setInterval(sendmoneyFn, 6000);
        setInterval(creditFn, 6000);
        setInterval(insuranceFn, 6000);
        setInterval(pfmFn, 6000);
        setInterval(membershipFn, 6000);

        function sendmoneyFn(){
            if(cnt>3){
                cnt = 0;
            }else{
                cnt++;
            }
            $('.sendmoney-wrap').find('.right img').stop().animate({opacity:0}, 200).animate({marginTop:-370.5*cnt}, 500).animate({opacity:1}, 400);
            $('.sendmoney-wrap').find('.text-box').removeClass('addColor');
            $('.sendmoney-wrap').find('.text-box').eq(cnt).addClass('addColor');
        }
        function creditFn(){
            if(z==1){
                z = 0;
            }else{
                z = 1;
            }
            $('.credit-wrap').find('.right img').stop().animate({opacity:0}, 200).animate({marginTop:-492.2345*z}, 500).animate({opacity:1}, 400);
            $('.credit-wrap').find('.text-box').removeClass('addColor');
            $('.credit-wrap').find('.text-box').eq(z).addClass('addColor');
        }
        function insuranceFn(){
            if(x==1){
                x = 0;
            }else{
                x = 1;
            }
            $('.insurance-wrap').find('.right img').stop().animate({opacity:0}, 200).animate({marginTop:-368.133*x}, 500).animate({opacity:1}, 400);
            $('.insurance-wrap').find('.text-box').removeClass('addColor');
            $('.insurance-wrap').find('.text-box').eq(x).addClass('addColor');
        }
        function pfmFn(){
            if(v==1){
                v = 0;
            }else{
                v = 1;
            }
            $('.pfm-wrap').find('.right img').stop().animate({opacity:0}, 200).animate({marginTop:-491.69*v}, 1000).animate({opacity:1}, 400);
            $('.pfm-wrap').find('.text-box').removeClass('addColor');
            $('.pfm-wrap').find('.text-box').eq(v).addClass('addColor');
        }
        function membershipFn(){
            if(m==2){
                m = 0;
            }else{
                m ++;
            }
            $('.membership-wrap').find('.right img').stop().animate({opacity:0}, 200).animate({marginTop:-371*m}, 1000).animate({opacity:1}, 400);
            $('.membership-wrap').find('.text-box').removeClass('addColor');
            $('.membership-wrap').find('.text-box').eq(m).addClass('addColor');
        }
 


        // section06
        $('.icon-show').on({
            click:function(event){
                event.preventDefault();
                $(this).addClass('addBtnHide');
                $('.icon-hide').removeClass('addBtnHide');
                $('.iconSlide').stop().slideDown(1000);
            }
        });
        $('.icon-hide').on({
            click:function(event){
                event.preventDefault();
                $(this).addClass('addBtnHide');
                $('.icon-show').removeClass('addBtnHide');
                $('.iconSlide').stop().slideUp(1000);
            }
        });
     },
     scrollEventFn:function(){
         var cnt = 0;

        $(window).scroll(function(){
        if( $(this).scrollTop() < $('#section1').offset().top-100 ){
            $('.text-wrap h4').stop().animate({marginLeft:-150, opacity:0},500);
            $('.text-wrap h5').stop().animate({marginLeft:-200, opacity:0},600);
            $('.text-wrap p').stop().animate({marginLeft:-250, opacity:0},700);
            $('.video-wrap').stop().animate({opacity:0},700);
        }else{
            $('.text-wrap h4').stop().animate({marginLeft:0, opacity:1}, 1000);
            $('.text-wrap h5').stop().animate({marginLeft:0, opacity:1}, 1400);
            $('.text-wrap p').stop().animate({marginLeft:0, opacity:1}, 1600);
            $('.video-wrap').stop().animate({opacity:1}, 1000);
        }
        if( $(this).scrollTop() < $('.section3').offset().top-100 ){
            $('.s4-wrap h3').stop().animate({marginBottom:150, opacity:0}, 500);
            $('.s4-wrap p').stop().animate({marginBottom:100, opacity:0}, 700);
        }else{
            $('.s4-wrap h3').stop().animate({marginBottom:0, opacity:1}, 1200);
            $('.s4-wrap p').stop().animate({marginBottom:0, opacity:1}, 1200);
        }
        if( $(this).scrollTop() < $('.section4').offset().top-100 ){
            $('.text-box').stop().animate({marginLeft:-150, opacity:0}, 500);
            $('.right').stop().animate({marginRight:-150, opacity:0}, 500);
        }else{
            $('.text-box').stop().animate({marginLeft:0, opacity:1}, 1000);
            $('.right').stop().animate({marginRight:0, opacity:1}, 1000);
        }
        if( $(this).scrollTop() > $('.section6').offset().top-300 ){
            s6Start(); 
        }
        
        });

        function s6Start(){
            if(cnt<56){
                cnt++;
                $('.icon').eq(0).stop().animate({opacity:1}, 500);
                $('.icon').eq(cnt).stop().animate({opacity:1}, 1000);
            }else{  
                clearInterval(s6Start);
            }
        }

     }
    
 }
     kakao.init();
 })(jQuery,window,document);