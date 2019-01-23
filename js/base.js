$(function () {
    //判断浏览器类型
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid || ipad;


    //var video = $('#topVideo');
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


    var screenWidth = 0;
    var screenHeight = 0;

    var timer = null;
    var topBox = document.getElementById('topBox');
    var scrollBox = document.getElementById('topScrollBox');
    scrollBox.innerHTML += scrollBox.innerHTML;
    var scrollItems = scrollBox.getElementsByTagName('li');
    var scrollBottomBox = document.getElementById('scrollBottomBox');
    var scrollCount = 0;
    var resizeWindowIng = false;
    var moveTimer = null;
    var iSpeed = 1;//正左负右
    var speedDis = 20;//移动的速度
    var moveDis = 0;

    getScreenWidth()
    setScroll()
    startScrollImage()

    topBox.addEventListener("mouseover", topBoxOnmouseover)
    topBox.addEventListener("mouseout", topBoxOnmouseout)

    function topBoxOnmouseover() {
        clearTimeout(timer)
    }
    function topBoxOnmouseout() {
        startScrollImage()
    }

    window.onresize = function () {
        resizeWindowIng = true;

        getScreenWidth()
        setScroll()

        var i = scrollCount % 2;
        if (i == 0) {
            //scrollCount = 1;
            scrollBox.style.left = 0 + 'px';
        } else {
            //scrollCount = 2;
            scrollBox.style.left = -screenWidth + 'px';
        }
        setScrollPoint()
        moveDis = 0;

        resizeWindowIng = false;
    }

    function startScrollImage() {
        clearTimeout(timer)
        clearInterval(moveTimer)
        
        topBox.addEventListener("mouseover", topBoxOnmouseover)
        topBox.addEventListener("mouseout", topBoxOnmouseout)
        scrollBottomBox.style.display="flex";


        iSpeed = 1;
        timer = setTimeout(scrollImage, 3000)
    }


    function setScroll() {
        //计算scrollBox的宽为所有scrollItem的宽的和 
        let topHeight = screenWidth / 1920 * 904 + 'px';
        let topWidth = screenWidth + 'px';
        topBox.style.height = topHeight;
        for (var i = 0; i < scrollItems.length; i++) {
            let div = scrollItems[i].getElementsByTagName('div')[0];
            div.style.height = topHeight;
            div.style.backgroundSize = topWidth;
            scrollItems[i].style.width = topWidth;
        }
        scrollBox.style.width = screenWidth * 4 + 'px';
        scrollBox.style.height = screenWidth / 1920 * 904 + 'px';
    }

    function scrollImage() {
        if (!resizeWindowIng) {
            clearTimeout(timer)
            scrollCount++;
            moveDis = 0;

            topBox.removeEventListener("mouseover", topBoxOnmouseover)
            topBox.removeEventListener("mouseout", topBoxOnmouseout)
            scrollBottomBox.style.display="none"
    
            moveTimer = setInterval(animationMove, 1)
            setScrollPoint()
        }
    }

    function setScrollPoint() {
        var i = scrollCount % 2;
        if (i == 0) {
            $('#scrollPoint1').removeClass('scrollPointUnSelect').addClass('scrollPointSelected');
            $('#scrollPoint2').removeClass('scrollPointSelected').addClass('scrollPointUnSelect');
        } else {
            $('#scrollPoint1').removeClass('scrollPointSelected').addClass('scrollPointUnSelect');
            $('#scrollPoint2').removeClass('scrollPointUnSelect').addClass('scrollPointSelected');
        }
    }


    function animationMove() {
        if (scrollBox.offsetLeft < -(scrollBox.offsetWidth / 2)) { //向左滚动，当靠左的图4移出边框时
            moveDis = 0;
            scrollBox.style.left = 0 + 'px';
        } else if (scrollBox.offsetLeft > 0) {//向右滚动，当靠右的图1移出边框时
            moveDis = 0;
            scrollBox.style.left = -(scrollBox.offsetWidth / 2) + 'px';
        }

        if (screenWidth - moveDis <= speedDis) {
            let dis = screenWidth - moveDis;
            scrollBox.style.left = scrollBox.offsetLeft - iSpeed * dis + 'px';
            startScrollImage()
        } else {
            moveDis = speedDis + moveDis;
            scrollBox.style.left = scrollBox.offsetLeft - iSpeed * speedDis + 'px';//正负为方向
        }
    }

    $("#scrollPointBtn1").click(function () {
        clearTimeout(timer)
        iSpeed = -1;//正左负右
        scrollCount = 1;
        scrollImage()
    });

    $("#scrollPointBtn2").click(function () {
        clearTimeout(timer)
        iSpeed = 1;//正左负右
        scrollCount = 2;
        scrollImage()
    });

    function getScreenWidth() {
        //获取窗口宽度
        if (window.innerWidth) {
            screenWidth = window.innerWidth;
        } else if (document.body && document.body.clientWidth) {
            screenWidth = document.body.clientWidth;
        }

        //获取窗口高度
        if (window.innerHeight) {
            screenHeight = window.innerHeight;
        } else if (document.body && document.body.clientHeight) {
            screenHeight = document.body.clientHeight;
        }

        //通过深入Document内部对body进行检测，获取窗口大小  
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            screenWidth = document.documentElement.clientWidth;
            screenHeight = document.documentElement.clientHeight;
        }
    }


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
        //console.log('urlParam为空');
    } else {
        var id = "#" + urlParam;
        if (isMobile) {
            $('html, body').animate({
                scrollTop: $(id).offset().top
            }, 1000, function () {
                $('.top ul').removeClass('showmenu');
            });
        } else {
            $('html, body').animate({
                scrollTop: $(id).offset().top - 80
            }, 1000);
        }
    }

    $('#lmoreA').click(function () {
        $('#solutionA').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemShow');
        $('#solutionB').addClass('solutionItemHide');
        $('#solutionC').addClass('solutionItemHide');
        $('#solutionD').addClass('solutionItemHide');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })
    $('#lmoreB').click(function () {
        $('#solutionB').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemHide');
        $('#solutionB').addClass('solutionItemShow');
        $('#solutionC').addClass('solutionItemHide');
        $('#solutionD').addClass('solutionItemHide');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })
    $('#lmoreC').click(function () {
        $('#solutionC').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemHide');
        $('#solutionB').addClass('solutionItemHide');
        $('#solutionC').addClass('solutionItemShow');
        $('#solutionD').addClass('solutionItemHide');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })
    $('#lmoreD').click(function () {
        $('#solutionD').removeClass('solutionItemHide');
        $('#solutionA').addClass('solutionItemHide');
        $('#solutionB').addClass('solutionItemHide');
        $('#solutionC').addClass('solutionItemHide');
        $('#solutionD').addClass('solutionItemShow');

        $('.dlgourp>dl').removeClass('onthisdl animated pulse');
        $(this).addClass('onthisdl animated pulse');

        solutionScrool()
    })

    function solutionScrool() {
        if (isMobile) {
            $('html, body').animate({
                scrollTop: $("#s1").offset().top - 60
            }, 1000, function () {
                // $('.top ul').removeClass('showmenu');
            });
        } else {
            $('html, body').animate({
                scrollTop: $("#s1").offset().top - 50
            }, 1000, function () {
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


    $('.showmenu').click(function () {
        $('.top ul').toggleClass('showmenu');
    });

    // $('#mNews').click(function () {
    //     window.location = 'news.html?language=' + getLanguage();
    // });

    $('#m8').click(function () {
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
        $("#m1").click(function () {
            $('html, body').animate({
                scrollTop: $("#m11").offset().top
            }, 1000, function () {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m2").click(function () {
            $('html, body').animate({
                scrollTop: $("#m22").offset().top
            }, 1000, function () {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m3").click(function () {
            $('html, body').animate({
                scrollTop: $("#m33").offset().top
            }, 1000, function () {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m4").click(function () {
            $('html, body').animate({
                scrollTop: $("#m44").offset().top
            }, 1000, function () {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m5").click(function () {
            $('html, body').animate({
                scrollTop: $("#m55").offset().top
            }, 1000, function () {
                $('.top ul').removeClass('showmenu');
            });
        });
        $("#m7").click(function () {
            $('html, body').animate({
                scrollTop: $("#m77").offset().top
            }, 1000, function () {
                $('.top ul').removeClass('showmenu');
            });
        });
        //判断滚动条高度大于110时改变导航背景颜色
        $(window).scroll(function () {
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
        $("#m1").click(function () {
            $('html, body').animate({
                scrollTop: $("#m11").offset().top
            }, 1000);
        });
        $("#m2").click(function () {
            $('html, body').animate({
                scrollTop: $("#m22").offset().top - 80
            }, 1000);
        });
        $("#m3").click(function () {
            $('html, body').animate({
                scrollTop: $("#m33").offset().top - 80
            }, 1000);
        });
        $("#m4").click(function () {
            $('html, body').animate({
                scrollTop: $("#m44").offset().top - 80
            }, 1000);
        });
        $("#m5").click(function () {
            $('html, body').animate({
                scrollTop: $("#m55").offset().top - 80
            }, 1000);
        });
        $("#m7").click(function () {
            $('html, body').animate({
                scrollTop: $("#m77").offset().top - 80
            }, 1000);
        });
        $(window).scroll(function () {
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