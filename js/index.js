$(function(){
    //入口
   

    $("#send").on("click",function(){
        var msg=$("#msg").val().trim();
        if(msg.length<=0){
            return $("#msg").val("");
        }
        $("#msg-lists").append('<li><p class="p-right">'+msg+'</p>  <img class="right" src="./images/right.jpg" alt=""></li>');
        $("#msg").val("");
        getMsg(msg);
        
    })
    $("#msg").on("keyup",function(e){
        if(e.keyCode==13){
            $("#send").click();
            
        }
    })

    function getMsg(text){
        $.ajax({
            method:"GET",
            url:"http://www.liulongbin.top:3006/api/robot",
            data:{
                spoken:text
            },
            success:function(res){
                if(res.message=="success"){
                    var get=res.data.info.text;
                    $("#msg-lists").append('<li><img src="./images/left.jpg" alt=""><p class="p-left">'+get+'</p></li>' );
                    getVoice(get);
                }
            }

        }
        );
    }
    function getVoice(text){
        $.ajax({
            method:"GET",
            url:"http://www.liulongbin.top:3006/api/synthesize",
            data:{
                text:text
            },
            success:function(res){
                if(res.status==200){
                    $("#voice").attr("src",res.voiceUrl);
                }
            }

        }
        );
    }



    //函数
})