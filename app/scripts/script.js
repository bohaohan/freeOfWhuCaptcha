var dbg=0;
if(dbg){
    var baseUrl='http://cloudtest1233.applinzi.com/';
}else{
    var baseUrl='http://cloudtest1233.applinzi.com/';
}

var versionSrc=baseUrl+'version.php';
var userscriptSrc='http://cloudtest1233.applinzi.com/'+'userscript.js';
var styleSrc=baseUrl+'style.css';

var main={

    init:function(){

        main.getLatestVersion().done(function(version){
            main.loadCss(styleSrc+'?v='+version);
            main.loadJs(userscriptSrc+'?v='+version);



        });
    },

    getConfig:function(key){
        if(!localStorage[key]){
            return '';
        }
        return localStorage[key];
    },

    setConfig:function(key,value){
        localStorage[key]=value;
    },

    getLatestVersion:function(opt){

        return {
            done:function(cb){
                if(!cb){
                    return false;
                }
                $.ajax({
                    url:versionSrc,
                    success:function(version){
                        main.setConfig('whujwVersion',version);
                        cb(version);
                    },
                    error:function(e){
                        cb();
                    }
                });
            }
        }
    },

    loadJs:function(src){
        var script=document.createElement('script'); 
        script.setAttribute('src',src);
        script.setAttribute('type','text/javascript'); 
        document.getElementsByTagName('body')[0].appendChild(script); 
    },

    loadCss:function(src){
        var link=document.createElement('link');
        link.rel='stylesheet';
        link.type='text/css';
        link.href=src;
        document.getElementsByTagName('head')[0].appendChild(link);
    }


}

main.init();