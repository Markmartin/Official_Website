$(function() {
    //判断浏览器类型
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid || ipad;


    var video = $('#topVideo');
    //var video = document.getElementById("topVideo");
    /**video[0].addEventListener("canplay", function(){
        if(video[0].muted){
            video[0].muted = false;
        }
    });**/
    /** 
    点击视频暂停／开始播放
    $("#topVideo").click(function () {
        if(video[0].paused){
            video[0].play();
        }else{
            video[0].pause();
        }  
    });**/



    //获取上页面传达的参数  
    function getQueryString(str) {
        var result = window.location.search.match(new RegExp("[\?\&]" + str + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }
    /*news页面返回*/
    var urlParam = getQueryString('scroll');
    if (urlParam == '' || urlParam == undefined || urlParam == null) {
        console.log('urlParam为空');
    } else {
        var id = "#" + urlParam;
        if (isMobile) {
            $('html, body').animate({
                scrollTop: $(id).offset().top
            }, 1000, function() {
                $('.top ul').removeClass('showmenu');
            });
        } else {
            $('html, body').animate({
                scrollTop: $(id).offset().top - 80
            }, 1000);
        }
    }

    $('#lmoreA').click(function() {
        $('#solutionA').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemShow');
        $('#solutionB').addClass('solutionItemHide');
        $('#solutionC').addClass('solutionItemHide');
        $('#solutionD').addClass('solutionItemHide');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })
    $('#lmoreB').click(function() {
        $('#solutionB').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemHide');
        $('#solutionB').addClass('solutionItemShow');
        $('#solutionC').addClass('solutionItemHide');
        $('#solutionD').addClass('solutionItemHide');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })
    $('#lmoreC').click(function() {
        $('#solutionC').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemHide');
        $('#solutionB').addClass('solutionItemHide');
        $('#solutionC').addClass('solutionItemShow');
        $('#solutionD').addClass('solutionItemHide');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })
    $('#lmoreD').click(function() {
        $('#solutionD').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemHide');
        $('#solutionB').addClass('solutionItemHide');
        $('#solutionC').addClass('solutionItemHide');
        $('#solutionD').addClass('solutionItemShow');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })

    function solutionScrool(){
        if (isMobile) {
            $('html, body').animate({
                scrollTop: $("#s1").offset().top - 60
            }, 1000, function() {
                // $('.top ul').removeClass('showmenu');
            });
        } else {
            $('html, body').animate({
                scrollTop: $("#s1").offset().top - 50
            }, 1000, function() {
                // $('.top ul').removeClass('showmenu');
            });
        }
    }


    //点击触发选中事件
    /*$('.dlgourp>dl').click(function() {
        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');
        var pid = $(this).index();
        $('.solution>div').removeClass('solutionAshow solutionAshow fadeIn');
        $('.solution>div').eq(pid).addClass('solutionAshow solutionAshow fadeIn');
        if (isMobile) {
            $('html, body').animate({
                scrollTop: $("#s1").offset().top - 60
            }, 1000, function() {
                // $('.top ul').removeClass('showmenu');
            });
        } else {
            $('html, body').animate({
                scrollTop: $("#s1").offset().top - 50
            }, 1000, function() {
                // $('.top ul').removeClass('showmenu');
            });
        }
    })*/


    $('.showmenu').click(function() {
        $('.top ul').toggleClass('showmenu');
    });

    // $('#mNews').click(function () {
    //     window.location = 'news.html?language=' + getLanguage();
    // });

    $('#m8').click(function() {
        window.open('https://medium.com/@IoT_Chain/itc-new-partnership-recruitment-5fc660a87c2c')
    })

    // function getLanguage(){
    //     var url = window.location.href;//当前页面的url

    //     //var url = document.referrer; //来源页面的url
    //     var index = url .lastIndexOf("\/");  
    //     var lastStr  = url .substring(index + 1, url .length);
    //     var language ='';
    //     if(lastStr === 'index.html'|| lastStr === 'iotchain.io'){
    //         language = "english";
    //     }else if(lastStr === 'korean.html'){
    //         language = "korean";
    //     }
    //     return language;
    // }

    if (isMobile) {
        //滚动到指定位置
        $("#m1").click(function() {
            $('html, body').animate({
                scrollTop: $("#m11").offset().top
            }, 1000, function() {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m2").click(function() {
            $('html, body').animate({
                scrollTop: $("#m22").offset().top
            }, 1000, function() {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m3").click(function() {
            $('html, body').animate({
                scrollTop: $("#m33").offset().top
            }, 1000, function() {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m4").click(function() {
            $('html, body').animate({
                scrollTop: $("#m44").offset().top
            }, 1000, function() {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m5").click(function() {
            $('html, body').animate({
                scrollTop: $("#m55").offset().top
            }, 1000, function() {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m7").click(function() {
            $('html, body').animate({
                scrollTop: $("#m77").offset().top
            }, 1000, function() {
                $('.top ul').removeClass('showmenu');
            });
        });
        //判断滚动条高度大于110时改变导航背景颜色
        $(window).scroll(function() {
            var windowTop = $(window).scrollTop();
            //if (windowTop >= 110) { //判断小于则为向上滚动
            if (windowTop >= 0) { //判断小于则为向上滚动
                $('.top').addClass('topbg');
            } else {
                $('.top').removeClass('topbg');
            }
        });

    } else {
        //只针对PC缩放时产生刷新
        //		$(window).resize(function() {
        //			//页面缩放时触发刷新页面 解决canvas动画无法自动适配浏览器宽度
        //			window.location.reload();
        //		});
        //滚动条高度大于50px触发滚动特效
        //滚动到指定位置
        $("#m1").click(function() {
            $('html, body').animate({
                scrollTop: $("#m11").offset().top
            }, 1000);
        });
        $("#m2").click(function() {
            $('html, body').animate({
                scrollTop: $("#m22").offset().top - 80
            }, 1000);
        });
        $("#m3").click(function() {
            $('html, body').animate({
                scrollTop: $("#m33").offset().top - 80
            }, 1000);
        });
        $("#m4").click(function() {
            $('html, body').animate({
                scrollTop: $("#m44").offset().top - 80
            }, 1000);
        });
        $("#m5").click(function() {
            $('html, body').animate({
                scrollTop: $("#m55").offset().top - 80
            }, 1000);
        });
        $("#m7").click(function() {
            $('html, body').animate({
                scrollTop: $("#m77").offset().top - 80
            }, 1000);
        });
        $(window).scroll(function() {
            var windowTop = $(window).scrollTop();
            //if (windowTop >= 110) { //判断小于则为向上滚动
            if (windowTop >= 0) {
                $('.topmenu').addClass('menubg');
            } else {
                $('.topmenu').removeClass('menubg');
            }
        });
    }


})