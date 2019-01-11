$(document).ready(function(){

    //判断浏览器类型
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid || ipad;

    
     $("#topBack").click(function(){
        window.location = "../../news.html";
        /**window.history.back();
        return false;**/
       
    })
    if (isMobile) {
        $(window).scroll(function () {
            var windowTop = $(window).scrollTop();
            if (windowTop >= 50) { 
                $('.top').addClass('topbg');
            } else {
                $('.top').removeClass('topbg');
            }
        });
      
    } else {
        $(window).scroll(function () {
            var windowTop = $(window).scrollTop();
            if (windowTop >= 80) { 
                $('.topmenu').addClass('menubg');
            } else {
                $('.topmenu').removeClass('menubg');
            }
        });
    }
})