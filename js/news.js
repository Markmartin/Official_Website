$(document).ready(function() {
    //判断浏览器类型
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid || ipad;

    var language = getLanguage('language');
    showTopMenu();

    var page = 1; //第几页
    var count = 0; //之前加载的数据的总数量
    var preLast = 0; //上一次加载的数据中的最后一组有几个空的item
    var datas = new Array(); //所有已加载的数据

    dataRequest(); //请求数据

    function dataRequest() {
        var param = {
            page: page,
        }
        httpRequest('POST', 'https://api.iotchain.io/newsList', param, success, error);
    }


    function success(data) {
        if (data.code == 200) {
            if (data.data.finalPage == true) {
                $("#loadMoreBtn").css('display', 'none');
            }
            var dataLength = data.data.newsList.length;
            for (var i = 0; i < dataLength; i++) {
                datas.push(data.data.newsList[i]);
            }
            cal(data.data.newsList);


            /**if(preLast == 0){
                cal(data.data.newsList);
            }else{
                if(preLast < dataLength){
                    var last = preLast;
                    replacePreLast(data.data.newsList);
                    cal(getNewData(last,data.data.newsList));
                }else{
                    replacePreLast(data.data.newsList);
                }
            }**/

        } else {
            alert(data.msg);
        }
    }

    function error() {
        alert('Network is busy...');
    }

    var itemId1, itemId2, itemId3, itemId4;

    function cal(data) {
        var length = data.length; //加载的数据长度
        var groupNum = parseInt(length / 4); //4个数据一组,总共多少组
        var lastNum = length % 4; //最后一组有几个Item
        preLast = (4 - lastNum) == 4 ? 0 : (4 - lastNum);

        if (lastNum != 0) {
            groupNum = groupNum + 1;
        }

        var index;
        var data1, data2, data3, data4;
        for (var i = 0; i < groupNum; i++) {
            index = 4 * i + count;
            data1 = data[i * 4 + 0];
            if (i == (groupNum - 1) || lastNum == 0) { //最后一组 
                if (lastNum == 1) {
                    data2 = data1;
                    data3 = data1;
                    data4 = data1;
                } else if (lastNum == 2) {
                    data2 = data[i * 4 + 1];
                    data3 = data2;
                    data4 = data2;
                } else if (lastNum == 3) {
                    data2 = data[i * 4 + 1];
                    data3 = data[i * 4 + 2];
                    data4 = data3;
                } else {
                    data2 = data[i * 4 + 1];
                    data3 = data[i * 4 + 2];
                    data4 = data[i * 4 + 3];
                }
            } else {
                data2 = data[i * 4 + 1];
                data3 = data[i * 4 + 2];
                data4 = data[i * 4 + 3];
            }

            //4个item的id
            itemId1 = "newItem" + (index);
            itemId2 = "newItem" + (index + 1);
            itemId3 = "newItem" + (index + 2);
            itemId4 = "newItem" + (index + 3);

            addTr(itemId1, itemId2, itemId3, itemId4, data1, data2, data3, data4);

            // $("#" + itemId1).click(function() {
            //     toDetail(this)
            // })
            // $("#" + itemId2).click(function() {
            //     toDetail(this)
            // })
            // $("#" + itemId3).click(function() {
            //     toDetail(this)
            // })
            // $("#" + itemId4).click(function() {
            //     toDetail(this)
            // })
        }

        count = count + length;
        if (lastNum == 1) {
            $("#" + itemId2).css('display', 'none');
            $("#" + itemId3).css('display', 'none');
            $("#" + itemId4).css('display', 'none');
        } else if (lastNum == 2) {
            $("#" + itemId3).css('display', 'none');
            $("#" + itemId4).css('display', 'none');
        } else if (lastNum == 3) {
            $("#" + itemId4).css('display', 'none');
        }

    }

    function toDetail(element) {
        var itemId = element.id;
        var idNum = itemId.match(/[\d]+/);
        window.open(datas[idNum].newsLink);
        // window.open("./news/newsContent/201806221458.html")
        console.log(itemId);
        console.log(idNum[0]);

        console.log(datas.length);
    }

    $("#loadMoreBtn").click(function() {
        page++;
        dataRequest();

        /**if(preLast == 0){
            cal(d);
        }else{
            if(preLast < d.length){
                var last = preLast;//1
                replacePreLast(d);
                cal(getNewData(last,d));
            }else{
                replacePreLast(d);
            }
        }**/
    })

    function getNewData(last, data) {
        var dataLength = data.length;
        var newData;
        if (last == 1) {
            newData = data.slice(1, dataLength + 1)
        } else if (last == 2) {
            newData = data.slice(2, dataLength + 1)
        } else if (last == 3) {
            newData = data.slice(3, dataLength + 1)
        }
        return newData;
    }

    function replacePreLast(data) {
        var dataLength = data.length;
        var l = 0;
        if (preLast <= dataLength) {
            l = preLast;
        } else {
            l = dataLength;
        }
        if (l == 1) {
            if (preLast == 1) {
                replacePreLastAttr(itemId4, data[0]);
                preLast = 0;
            } else if (preLast == 2) {
                replacePreLastAttr(itemId3, data[0]);
                preLast = 1;
            } else if (preLast == 3) {
                replacePreLastAttr(itemId2, data[0]);
                preLast = 2;
            }
            count = count + 1;
        } else if (l == 2) {
            if (preLast == 2) {
                replacePreLastAttr(itemId3, data[0]);
                replacePreLastAttr(itemId4, data[1]);
                preLast = 0;
            } else if (preLast == 3) {
                replacePreLastAttr(itemId2, data[0]);
                replacePreLastAttr(itemId3, data[1]);
                preLast = 1;
            }
            count = count + 2;
        } else if (l == 3) {
            replacePreLastAttr(itemId2, data[0]);
            replacePreLastAttr(itemId3, data[1]);
            replacePreLastAttr(itemId4, data[2]);
            preLast = 0;
            count = count + 3;
        }
    }

    function replacePreLastAttr(itemId, data) {
        $("#" + itemId).css('display', 'inline-block');
        $("#img" + itemId).attr('src', data.newsImageLink);
        $("#desc" + itemId).innerHTML = data.newsTitle;
        $("#date" + itemId).innerHTML = data.created;
        $("#report" + itemId).innerHTML = data.newsType;
    }

    function addTr(itemId1, itemId2, itemId3, itemId4, data1, data2, data3, data4) {
        var itemIdList = [itemId1, itemId2, itemId3, itemId4];
        var dataList = [data1, data2, data3, data4];
        var totalHtml = "";
        for (var i = 0; i < itemIdList.length; i++) {
            if (i == 0) {
                totalHtml = totalHtml + "<div class='newsBox'>"
            }
            if (i % 2 == 0) {
                totalHtml = totalHtml + "<div class='newsRowBox'>"
            }
            totalHtml = totalHtml + "<a href='" + dataList[i].newsLink + "' target='_blank'><div class='newItem' id='" + itemIdList[i] + "'" + ">" +
                "<img class='newItemImg' id='img" + itemIdList[i] + "'" + "src='" + dataList[i].newsImageLink + "' />" +
                "<p class='newItemDesc' id='desc" + itemIdList[i] + "'" + ">" + dataList[i].newsTitle + "</p>" +
                "<div class='newItemBottom'>" +
                "<span class='newItemDate' id='date" + itemIdList[i] + "'" + ">" + dataList[i].created + "</span>" +
                "<span class='newItemReport' id='report" + itemIdList[i] + "'" + ">" + dataList[i].newsType + "</span>" +
                "</div>" +
                "</div>" +
                "</a>";
            if (i % 2 == 1) {
                totalHtml = totalHtml + "</div>"
            }
            if (i == 3) {
                totalHtml = totalHtml + "</div>"
            }
        }
        $("#news").append(totalHtml)

        // $("#news").append(
        //     "<div class='newsBox'>" +
        //     "<div class='newsRowBox'>" +
        //     "<div class='newItem' id='" + itemId1 + "'" + ">" +
        //     "<img class='newItemImg' id='img" + itemId1 + "'" + "src='" + data1.newsImageLink + "' />" +
        //     "<p class='newItemDesc' id='desc" + itemId1 + "'" + ">" + data1.newsTitle + "</p>" +
        //     "<div class='newItemBottom'>" +
        //     "<span class='newItemDate' id='date" + itemId1 + "'" + ">" + data1.created + "</span>" +
        //     "<span class='newItemReport' id='report" + itemId1 + "'" + ">" + data1.newsType + "</span>" +
        //     "</div>" +
        //     "</div>" +
        //     "<div class='newItem' id='" + itemId2 + "'" + ">" +
        //     "<img class='newItemImg' id='img" + itemId2 + "'" + "src='" + data2.newsImageLink + "' />" +
        //     "<p class='newItemDesc' id='desc" + itemId2 + "'" + ">" + data2.newsTitle + "</p>" +
        //     "<div class='newItemBottom'>" +
        //     "<span class='newItemDate' id='date" + itemId2 + "'" + ">" + data2.created + "</span>" +
        //     "<span class='newItemReport' id='report" + itemId2 + "'" + ">" + data2.newsType + "</span>" +
        //     "</div>" +
        //     "</div>" +
        //     "</div>" +
        //     "<div class='newsRowBox'>" +
        //     "<div class='newItem' id='" + itemId3 + "'" + ">" +
        //     "<img class='newItemImg' id='img" + itemId3 + "'" + "src='" + data3.newsImageLink + "' />" +
        //     "<p class='newItemDesc' id='desc" + itemId3 + "'" + ">" + data3.newsTitle + "</p>" +
        //     "<div class='newItemBottom'>" +
        //     "<span class='newItemDate' id='date" + itemId3 + "'" + ">" + data3.created + "</span>" +
        //     "<span class='newItemReport' id='report" + itemId3 + "'" + ">" + data3.newsType + "</span>" +
        //     "</div>" +
        //     "</div>" +
        //     "<div class='newItem' id='" + itemId4 + "'" + ">" +
        //     "<img class='newItemImg' id='img" + itemId4 + "'" + "src='" + data4.newsImageLink + "' />" +
        //     "<p class='newItemDesc' id='desc" + itemId4 + "'" + ">" + data4.newsTitle + "</p>" +
        //     "<div class='newItemBottom'>" +
        //     "<span class='newItemDate' id='date" + itemId4 + "'" + ">" + data4.created + "</span>" +
        //     "<span class='newItemReport' id='report" + itemId4 + "'" + ">" + data4.newsType + "</span>" +
        //     "</div>" +
        //     "</div>" +
        //     "</div>" +
        //     "</div> "
        // );
    }

    function showTopMenu() {
        if (language === "korean") {
            $('#kTopMenu').removeClass('topMenuHidden').addClass('topMenuShow')
        } else {
            $('#eTopMenu').removeClass('topMenuHidden').addClass('topMenuShow')
        }
    }

    function getLanguage(str) {
        var result = window.location.search.match(new RegExp("[\?\&]" + str + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }

    function returnUrl() {
        var url;
        if (language === "korean") {
            //url = "https://iotchain.io/korean.html";
            url = "korean.html";
        } else {
            //url = "https://iotchain.io";
            url = "index.html";
        }
        return url;
    }


    var m1, m2, m3, m4, m5, m7, m8;
    if (language === "korean") {
        m1 = 'km1';
        m2 = 'km2';
        m3 = 'km3';
        m4 = 'km4';
        m5 = 'km5';
        m7 = 'km7';
        m8 = 'km8';
    } else {
        m2 = 'm2';
        m4 = 'm4';
        m5 = 'm5';
        m7 = 'm7';
        m8 = 'm8';
    }

    //英文topMenu
    $('#' + m1).click(function() {
        var url = returnUrl() + "?scroll=" + "m11";
        window.location = url;
    });

    $('#' + m2).click(function() {
        var url = returnUrl() + "?scroll=" + "m22";
        window.location = url;
    });

    $('#' + m3).click(function() {
        var url = returnUrl() + "?scroll=" + "m33";
        window.location = url;
    });

    $('#' + m4).click(function() {
        var url = returnUrl() + "?scroll=" + "m44";
        window.location = url;
    });

    $('#' + m5).click(function() {
        var url = returnUrl() + "?scroll=" + "m55";
        window.location = url;
    });



    $('#' + m8).click(function() {
        window.open('https://medium.com/@IoT_Chain/itc-new-partnership-recruitment-5fc660a87c2c')
    });


    $('.showmenu').click(function() {
        if (language === "korean") {
            $('.ktop ul').toggleClass('showmenu');
        } else {
            $('.etop ul').toggleClass('showmenu');
        }
    });

    if (isMobile) {
        $('#' + m7).click(function() {
            $('html, body').animate({
                scrollTop: $("#m77").offset().top
            }, 1000, function() {
                if (language === "korean") {
                    $('.ktop ul').removeClass('showmenu');
                } else {
                    $('.etop ul').removeClass('showmenu');
                }
            });
        });
        //判断滚动条高度大于110时改变导航背景颜色
        $(window).scroll(function() {
            var windowTop = $(window).scrollTop();
            if (windowTop >= 10) { //判断小于则为向上滚动
                //showTopMenu();
                if (language === "korean") {
                    $('.ktop').addClass('ktopbg');
                } else {
                    $('.etop').addClass('etopbg');
                }
            } else {
                if (language === "korean") {
                    $('.ktop').removeClass('ktopbg');
                } else {
                    $('.etop').removeClass('etopbg');
                }
            }
        });
    } else {
        $('#' + m7).click(function() {
            $('html, body').animate({
                scrollTop: $("#m77").offset().top - 80
            }, 1000);
        });
        $(window).scroll(function() {
            var windowTop = $(window).scrollTop();
            if (windowTop >= 10) { //判断小于则为向上滚动
                if (language === "korean") {
                    $('.ktopmenu').addClass('kmenubg');
                } else {
                    $('.etopmenu').addClass('emenubg');
                }
            } else {
                if (language === "korean") {
                    $('.ktopmenu').removeClass('kmenubg');
                } else {
                    $('.etopmenu').removeClass('emenubg');
                }
            }
        });
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

})