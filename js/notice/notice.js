;(function($,window,document,undefined){
   var notice ={
        init:function(){
            var that = this;
            that.ajaxFn();
            that.fontSizeFn();
        },
        ajaxFn:function(){
            var a = [];
            var tot = a.length;
            var list = 10;
            var pageNumber = Math.ceil(tot/list);
            var txt = '';

            var pageIndex = 0;
            var startPageNum = pageIndex * list;
            var endPageNum = startPageNum + list;
            if(endPageNum>tot){
                endPageNum=tot;
            } 

            var groupNum = 0;
            var groupList = 5;
            var groupStart = groupNum * groupList;
            var groupEnd = groupStart + groupList;

            if(groupEnd > pageNumber){
                groupEnd = pageNumber;
            }
            
            setTimeout( ajaxProcessFn, 100 );

            function ajaxProcessFn(){
                tot = a.length;
                pageNumber = Math.ceil(tot/list);

                $.ajax({
                    url:'./data/json/notice.json',
                    type:'POST',
                    dataType:'JSON',
                    success:function(result){
                        $.each(result.공지사항,function(i,obj){
                            a[i] = [];

                            a[i][0] = obj.NO;
                            a[i][1] = obj.NOTICE;
                            a[i][2] = obj.DATE;
                        });

                        tot = a.length;
                        list = 10;
                        groupList = 5;
                        pageNumber = Math.ceil(tot/list);

                        var imsi = '';
                        for(var i=0; i<a.length; i++){
                            for(var j=i+1; j<a.length; j++){
                                if(a[i][2] < a[j][2]){
                                    for(var k=0; k<=2; k++){
                                        imsi = a[i][k];
                                        a[i][k] = a[j][k];
                                        a[j][k] = imsi;
                                    }
                                }
                            }
                        }
                        bindBoardListFn();
                        function bindBoardListFn(){
                            startPageNum = pageIndex * list;
                            endPageNum = startPageNum + list;

                            if(endPageNum>tot){
                                endPageNum=tot;
                            } 

                            for(var i=startPageNum; i<endPageNum; i++){
                                txt += '<tr>';
                                txt += '<td>' + a[i][0] + '</td>';
                                txt += '<td><a href="#" class="ntc">' + a[i][1] + '</a></td>';
                                txt += '<td>' + a[i][2] + '</td>';
                                txt += '</tr>';
                            }
                            $('table tbody').html(txt);
                            txt = '';

                        }


                        pagenationFn();
                        function pagenationFn(){
                            groupList = 5;
                            pageIndex = groupNum * groupList;
                            bindBoardListFn();
                            groupStart = groupNum * groupList;
                            groupEnd = groupStart + groupList;
                            
                            
                            if(groupEnd>pageNumber){
                                groupEnd=pageNumber;
                                $('.next-btn-wrap').stop().hide(0);
                            }else{
                                $('.next-btn-wrap').stop().show(0);
                            }
                            
                            
                            if(groupNum > 0){
                                $('.prev-btn-wrap').stop().show(0);
                            }else{
                                $('.prev-btn-wrap').stop().hide(0);
                            }
                            
                            for(var i = groupStart; i<groupEnd; i++){
                                if(0 == (i%groupList)){
                                    txt+= '<li><a href="#" class="page-btn addpageBtn">'+ (i+1) +'</a></li>';
                                } else{
                                    txt+= '<li><a href="#" class="page-btn">'+ (i+1) +'</a></li>';
                                }
                            }
                            
                            $('.page-gap ul').html(txt);
                            txt='';
                        }

                        $(document).on('mouseenter','.page-btn', function(){
                            $('.page-btn').each(function(){
                                $(this).on({
                                    click:function(event){
                                        event.preventDefault();
                                        pageIndex = Number($(this).text())-1;
                                        $('.page-btn').removeClass('addpageBtn');
                                        $(this).addClass('addpageBtn');
                                        bindBoardListFn();
                                    }
                                });
                            });
                        });

                        $('.next-btn').on({
                            click:function(event){
                                event.preventDefault();
                                groupNum ++;
                                if(groupNum>5){
                                    groupNum=5;
                                }
                                pagenationFn();
                            }
                        });
                        $('.prev-btn').on({
                            click:function(event){
                                event.preventDefault();
                                if(groupNum<0){
                                    groupNum=0;
                                }
                                groupNum--;
                                pagenationFn();
                            }
                        });

                    },  
                    error:function(){
                        alert('AJAX Error !!!');
                    }
                });
            }
        },
        fontSizeFn:function(){
            var win = $(window);
            var winW = $(window).width();
            var tdW =$('td:nth-child(2)');
            var tdFontRate = 0.009626955;
            var tdA = $('.ntc'); 

            setTimeout(resizeFn(), 100);

            function resizeFn(){
                winW = $(window).width();
                tdW =$('td:nth-child(2)');
                tdFontRate = 0.009626955;
                tdA = $('.ntc');
                
                tdA.css({fontSize:winW *tdFontRate + 'px'});
            }

            win.resize(function(){
                resizeFn();
            });
        }
    }
    notice.init();
})(jQuery,window,document);