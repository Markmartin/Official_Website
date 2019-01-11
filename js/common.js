$(function(){
     //判断浏览器类型
     var ua = navigator.userAgent;
     var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
     isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
     isAndroid = ua.match(/(Android)\s+([\d.]+)/),
     isMobile = isIphone || isAndroid || ipad;
    
    
    $('#getITC').click(function () {
        window.open('https://bounty.iotchain.io/')
    })

    $('#telegramMenu').click(function () {
        window.open('https://t.me/IoTChain')
    })

    $('#telegramMenuKn').click(function () {
        window.open('https://t.me/IoTChain_Korea')
    })

    $('#twitterMenu').click(function () {
        window.open('https://twitter.com/IoT_Chain')
    })

    $('#twitterMenuKn').click(function () {
        window.open('https://twitter.com/itc_korea')
    })

    /**$('#facebookMenu').click(function () {
        window.open('https://www.facebook.com/IoTChain/')
    })**/
    $('#youtubeMenu').click(function () {
        window.open('https://www.youtube.com/channel/UCJPaVb7NlxhfCHRkz6yuXBw')
    })

    $('#mediumMenu').click(function () {
        window.open('https://medium.com/iot-chain')
    })
    
    $('#steemitMenu').click(function () {
        window.open('https://steemit.com/@iot-chain')
    })


    

    

    if (isMobile) { 
        $('.weixin').click(function () {
            $('#ewmceng').show();
        })

        $(document).click(function () {
            $('#ewmceng').hide();
        })

        $('#ewmceng').click(function (event) {
            return false;
        })

        $('.weixin').click(function (event) {
            return false;
        })
    } else {
        $('.weixin').hover(function () {
            $(this).find('.weixin2').show();
        }, function () {
            $(this).find('.weixin2').hide();
        })
    }

    /*底部Subscribe */
    $('#subscribeBtn').click(function () {
        var email = $('#subscribeEmail').val();
        if (email == '') {
            alert('Please enter your email address')
            return;
        }
        if (validateEmail(email) == false) {
            alert('Please enter a correct email address ')
            return;
        }
        var param = {
            mailAddr: email,
        }

        httpRequest('POST', 'https://api.iotchain.io/subscribe', param, successSubscribe, errorSubscribe);
    });

    function validateEmail(email) {
        var mailRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (mailRegex.test(email)) {
            return true;
        } else {
            return false;
        }
    }


    function httpRequest(requestType, url, param, successHandle, errorHandle) {
        $.ajax({
            type: requestType,
            url: url,
            data: param,
            async: true,
            success: successHandle,
            error: errorHandle,
        });
    }

    function successSubscribe(data) {
        if (data.code == 200) {
            alert(data.msg);
        } else {
            alert(data.msg);
        }
    }

    function errorSubscribe() {
        alert('Network is busy...');
    }
})