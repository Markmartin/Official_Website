$(document).ready(function() {
    $('#iosApplyBtn').click(showApplyForm)
    $('#applyLink').click(showApplyForm)
    $('#join').click(joinTest)

    function showApplyForm() {
        // $('.stepOne').fadeOut(function() {
        //     $('#wallet').height(700);
        //     $('.stepTwo').fadeIn();
        // })
        window.open('https://testflight.apple.com/join/sueJ20be')
    }

    function joinTest() {
        $('.stepTwo').fadeOut(function() {
            $('.stepThree').fadeIn();
        })
    }

    //判断浏览器类型
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid || ipad;


    $('.showmenu').click(function () {
        $('.top ul').toggleClass('showmenu');
    });

    $('#m2').click(function() {
        var url = "index.html" + "?scroll=" + "m22";
        window.location = url;
    });

    $('#m4').click(function() {
        var url = "index.html" + "?scroll=" + "m44";
        window.location = url;
    });

    $('#m5').click(function() {
        var url = "index.html" + "?scroll=" + "m55";
        window.location = url;
    });

    if (isMobile) {
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