var jwBaseList=['http://210.42.121.134/','http://210.42.121.241/'];

function inArray(stringToSearch,arrayToSearch){
    for(s=0;s<arrayToSearch.length;s++){
        thisEntry = arrayToSearch[s].toString();
        if(thisEntry == stringToSearch){
            return true;
        }
    }
    return false;
}

chrome.webRequest.onHeadersReceived.addListener(function (details) {
    var yeniheaderlar =
        [{
            name : "Content-Security-Policy",
            value : "sil"
        }, {
            name : "Content-Security-Policy-Report-Only",
            value : "sil"
        }, {
            name : "X-Content-Security-Policy",
            value : "sil"
        }, {
            name : "X-WebKit-CSP",
            value : "sil"
        }, {
            name : "X-Frame-Options",
            value : "sil"
        }, {
            name : "X-XSS-Protection",
            value : "sil"
        }, {
            name : "Access-Control-Allow-Origin",
            value : "*"
        }, {
            name : "Access-Control-Allow-Methods",
            value : "POST, GET, OPTIONS, DELETE, PUT"
        }, {
            name : "Access-Control-Allow-Headers",
            value : "*"
        }
    ];
    for (z = 0; z < yeniheaderlar.length; z++) {
        var zamazingo = false;
        for (i = 0; i < details.responseHeaders.length; i++) {
            if (details.responseHeaders[i].name.toLowerCase() == yeniheaderlar[z].name.toLowerCase()) {
                if (yeniheaderlar[z].value == "sil") {
                    details.responseHeaders.splice(i, 1);
                } else {
                    details.responseHeaders[i].value = yeniheaderlar[z].value; ;
                }
                zamazingo = true;
            }
        }
        if (!zamazingo && (yeniheaderlar[z].value != 'sil')) {
            details.responseHeaders.push(yeniheaderlar[z]);
        }
    }
    return {
        responseHeaders : details.responseHeaders
    };
}, {
    urls : ["<all_urls>"],
    types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
},
    ["blocking", "responseHeaders"]);

chrome.webRequest.onBeforeRequest.addListener(function(details){
    console.log('1111');
    return {
        redirectUrl:details.url+'stu/stu_index.jsp'
    }

},{
    urls:jwBaseList
},[
    "blocking"
]);

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    for(i=0,len=details.requestHeaders.length;i<len;i++){
        if(details.requestHeaders[i].name=='X-Requested-With') {
            details.requestHeaders.splice(i, 1);
            break;
        }
    }
    return {
        requestHeaders:details.requestHeaders
    }
},{
    urls:["<all_urls>"]
},[
    "blocking",
    "requestHeaders"
]);