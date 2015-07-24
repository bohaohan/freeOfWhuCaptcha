/**
 * Created by bohaohan on 15/7/10.
 */
function sleep(n) {
    var start = new Date().getTime();
    while(true)  if(new Date().getTime()-start > n) return true;
}
function checkCa(){
    isCheck = true;
    console.log("start!");
    var canvas = document.createElement('canvas');                        //新建一个canvas
    var ctx = canvas.getContext("2d");                                    //获取2D上下文
    var numbers = [];                                                     //存储数字模板的数组
    canvas.width = $("#captcha-img")[0].width;                                           //设置canvas的宽度
    canvas.height = $("#captcha-img")[0].height;                                         //设置canvas的高度
    ctx.drawImage($("#captcha-img")[0], 0, 0);
    var imagea = new Image();
    imagea.src = canvas.toDataURL("image/jpeg");
    var data = imagea.src;
    data = data.replace(/\//g,"*1*");
    data = data.replace(/\:/g,"*2*");
    data = data.replace(/\;/g,"*3*");
    data = data.replace(/\+/g,"*4*");
    data = data.replace(/\=/g,"*5*");
    var url = "http://fc.ziqiang.net.cn/login";
    //var url = " http://127.0.0.1:8000/login"
    $(document).ajaxSend(function(event, xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        function sameOrigin(url) {
            // url could be relative or scheme relative or absolute
            var host = document.location.host; // host + port
            var protocol = document.location.protocol;
            var sr_origin = '//' + host;
            var origin = protocol + sr_origin;
            // Allow absolute or scheme relative URLs to same origin
            return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
                (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
                // or any other URL that isn't scheme relative or absolute i.e relative.
                !(/^(\/\/|http:|https:).*/.test(url));
        }
        function safeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });
    $.ajax({
        type:"post",
        url:url,
        dataType:"json",
        data: {"img":data},
        success:function(data){
            console.log(data);
            $("input[name='xdvfb']").val(data.result);
            isCheck = false;
        },
        error:function(){
            isCheck = false;
            if(ca_retry < 7) {
                changeCap();
            }
            else {
                alert("好像服务器挂了~建议关闭验证码自动识别~~")
                isCheck = true;
            }
            ca_retry++;
        }
    })
}
function changeCap(){
    var cimg=document.getElementById("captcha-img");
    cimg.src="/servlet/GenImg?rdddd="+Math.random();
    isChange = true;
}

function checkChange(){
    if(isChange&&!isCheck&&isOn == "true"){
        isChange = false;
        checkCa();
    }else if(!isChange&&!isCheck&&isOn == "true"){
        ca_retry = 0;
    }
    if(isTry&&!isCheck&&isOn == "true"){
        isTry = false;
        retryTimes++;
        login();
    }else if(!isTry&&!isCheck&&isOn == "true"){
        retryTimes = 0;
    }
}
function login(){
    var id = $("#qxftest").val();
    var pwd = $("input[name = 'pwd']").val();
    var xdvfb = $("input[name = 'xdvfb']").val();
    localStorage.setItem("id",id);
    localStorage.setItem("pwd",pwd);
    var data = "id="+id+"&pwd="+pwd+"&xdvfb="+xdvfb;
    var url = "/servlet/Login";
    if(retryTimes>5){
        alert("仿佛服务器有些问题，建议关闭识别验证码~")
    }
    if(!isCheck&&retryTimes<6) {
        $.ajax({
            type: "post",
            url: url,
            data :data,
            async: false,
            success: function (data) { 
                a = data
                if (data[1] == "!") {
                    window.location = "/stu/stu_index.jsp";
                }else{
                    changeCap();
                    isTry = true;
                }
            },
            error: function () {
                alert("请检查网络。或者教务系统挂了。。")
            }
        });
    } else {
        alert("等待验证码识别~");
    }
}

function setOn(){
    if($(".isOn").attr("checked") == "checked"){
        localStorage.setItem("on","true");
        isOn = true;
        checkCa();
       // $("#captcha-img").parent().parent().parent().hide();
    }else{
        localStorage.setItem("on","false");
        isOn = false;
      //  $("#captcha-img").parent().parent().parent().show();
    }
}

$(document).ready(function(){
    isChange = false;
    isTry = false;
    isCheck = false;
    retryTimes = 0;
    ca_retry = 0;
    isOn = "true";
    try{
        var id = localStorage["id"];
        var pwd = localStorage["pwd"];
    }catch(e){
        id = ""
        pwd = ""
    }
    $("#qxftest").val(id);
    $("input[name = 'pwd']").val(pwd);
    try{
        isOn = localStorage["on"];
    }catch (e){
        isOn = true;
    }

    console.log(isOn);
    if (isOn == undefined) {
        isOn = "true";
    }
    console.log(isOn);
    if(isOn == "true") {
        checkCa();
    }
    $("td font").parent().parent().html("<div class='checkbox' style='position: absolute;left: 50%;margin-top: 20px;'><label class='is_on'><input class='isOn' type='checkbox' checked>自动识别验证码</label></div>");
    if(isOn == "false") {
        $(".isOn").attr("checked",false)
    }
    if(isOn == "true") {
       // $("#captcha-img").parent().parent().parent().hide();
    }
    $("#captcha-img").click(function(){
        isChange = true;
    });
    $(".change-captcha").click(function(){
        isChange = true;
    });
    $("#loginBtn").click(function(e){
        if(isOn == "true") {
            e.preventDefault();  //阻止事件冒泡
            login();
        }
    });
    $(".is_on").click(function(){
        setOn();
    })
    setInterval("checkChange()",500);
})






