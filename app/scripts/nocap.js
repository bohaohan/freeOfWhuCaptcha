/**
 * Created by bohaohan on 15/7/10.
 */
<<<<<<< HEAD
function sleep(n) {
    var start = new Date().getTime();
    while(true)  if(new Date().getTime()-start > n) return true;
}
function checkCa(){
    isCheck = true;
    console.log("start!");
=======
function checkCa(){
    console.log("start!")
>>>>>>> develop
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
    var url = "http://127.0.0.1:8000/login";
    $.ajax({
        type:"get",
        url:url,
        dataType:"json",
        data: {"img":data},
        success:function(data){
            console.log(data);
<<<<<<< HEAD
            $("input[name='xdvfb']").val(data.result);
            isCheck = false;
        },
        error:function(){
            isCheck = false;
            $("#captcha-img").click();
        }
    })
}
function checkChange(){
    if(isChange&&!isCheck){
        isChange = false;
        checkCa();
    }
    if(isTry&&!isCheck){
        isTry = false;
        login();
    }
}
function login(){
    var id = $("#qxftest").val();
    var pwd = $("input[name = 'pwd']").val();
    var xdvfb = $("input[name = 'xdvfb']").val();
    var data = "?id="+id+"&pwd="+pwd+"&xdvfb="+xdvfb;
    var url = "/servlet/Login"
    if(!isCheck) {
        $.ajax({
            type: "post",
            url: url + data,
            success: function (data) {
                if (data[1] == "!") {
                    window.location = "/stu/stu_index.jsp";
                } else {
                    $("#captcha-img").click();
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

$(document).ready(function(){
    isChange = false;
    isTry = false;
    isCheck = false;
    checkCa();
    $("#captcha-img").click(function(){
        isChange = true;
    });
    $(".change-captcha").click(function(){
        isChange = true;
    });
    $("#loginBtn").click(function(e){
        e.preventDefault();  //阻止事件冒泡
        login();
    });
    setInterval("checkChange()",500);
=======
            $("input[name='xdvfb']").val(data.result)
        }
    })
}
$(document).ready(function(){
    checkCa("111");
>>>>>>> develop
})
