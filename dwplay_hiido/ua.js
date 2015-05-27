define(function() {
    var userAgent = window.navigator.userAgent.toLowerCase();

    var iphone = /iphone/.test(userAgent);
    var ipad = /ipad/.test(userAgent);
    var ipod = /ipod/.test(userAgent);

    return {
        ios: iphone || ipad || ipod,

        iphone: iphone,
        ipad: ipad,
        ipod: ipod,

        android: /android/.test(userAgent)
    };
});