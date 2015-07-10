/**
 * Created by bohaohan on 15/7/10.
 */
function checkCa(){
    console.log("start!")
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
            $("input[name='xdvfb']").val(data.result)
        }
    })
}
$(document).ready(function(){
    checkCa("111");
})
