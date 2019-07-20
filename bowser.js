/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2013
  */

function bowser(userAgent) {
  /**
    * navigator.userAgent =>
    * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
    * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
    * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
    * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
    * IE>=11:  "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; Media Center PC 6.0; rv:11.0) like Gecko"
    * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
    * iPhone:  "Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
    * iPad:    "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
    * Android: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
    * Touchpad: "Mozilla/5.0 (hp-tabled;Linux;hpwOS/3.0.5; U; en-US)) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/234.83 Safari/534.6 TouchPad/1.0"
    * PhantomJS: "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.5.0 Safari/534.34"
    */

  var ua = userAgent
    , t = true
    , ie = /(msie|trident)/i.test(ua)
    , chrome = /chrome/i.test(ua)
    , phantom = /phantom/i.test(ua)
    , safari = /safari/i.test(ua) && !chrome && !phantom
    , iphone = /iphone/i.test(ua)
    , ipad = /ipad/i.test(ua)
    , touchpad = /touchpad/i.test(ua)
    , android = /android/i.test(ua)
    , opera = /opera/i.test(ua) || /opr/i.test(ua)
    , firefox = /firefox/i.test(ua)
    , gecko = /gecko\//i.test(ua)
    , seamonkey = /seamonkey\//i.test(ua)
    , webkitVersion = /version\/(\d+(\.\d+)?)/i
    , firefoxVersion = /firefox\/(\d+(\.\d+)?)/i
    , o;

  function detect() {

    if (ie) return {
        msie: t
      , version: ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]
      };
    if (opera) return {
        opera: t
      , version: ua.match(webkitVersion) ? ua.match(webkitVersion)[1] : ua.match(/opr\/(\d+(\.\d+)?)/i)[1]
      };
    if (chrome) return {
        webkit: t
      , chrome: t
      , version: ua.match(/chrome\/(\d+(\.\d+)?)/i)[1]
      };
    if (phantom) return {
        webkit: t
      , phantom: t
      , version: ua.match(/phantomjs\/(\d+(\.\d+)+)/i)[1]
      };
    if (touchpad) return {
        webkit: t
      , touchpad: t
      , version : ua.match(/touchpad\/(\d+(\.\d+)?)/i)[1]
      };
    if (iphone || ipad) {
      o = {
        webkit: t
      , mobile: t
      , ios: t
      , iphone: iphone
      , ipad: ipad
      , version: (ua.match(/CPU iPhone OS ([0-9_]+) like Mac OS X/i)[1] || '1.1.1').replace('_', '.')
      };
      return o;
    }
    if (android) return {
        webkit: t
      , android: t
      , mobile: t
      , version: (ua.match(/Linux; Android ([0-9.]+)/i) || ua.match(firefoxVersion))[1]
      };
    if (safari) return {
        webkit: t
      , safari: t
      , version: ua.match(webkitVersion)[1]
      };
    if (gecko) {
      o = {
        gecko: t
      , mozilla: t
      , version: ua.match(firefoxVersion)[1]
      };
      if (firefox) o.firefox = t;
      return o
    }
    if (seamonkey) return {
        seamonkey: t
      , version: ua.match(/seamonkey\/(\d+(\.\d+)?)/i)[1]
      };
    return {};
  }

  var bowser = detect();

  // Graded Browser Support
  // http://developer.yahoo.com/yui/articles/gbs
  if ((bowser.msie && bowser.version >= 8) ||
      (bowser.chrome && bowser.version >= 10) ||
      (bowser.firefox && bowser.version >= 4.0) ||
      (bowser.safari && bowser.version >= 5) ||
      (bowser.opera && bowser.version >= 10.0)) {
    bowser.a = t;
  } else if ((bowser.msie && bowser.version < 8) ||
      (bowser.chrome && bowser.version < 10) ||
      (bowser.firefox && bowser.version < 4.0) ||
      (bowser.safari && bowser.version < 5) ||
      (bowser.opera && bowser.version < 10.0)) {
    bowser.c = t;
  } else bowser.x = t;

  return bowser;
}

// for chrome/edge/yandex/ie link is
// https://get.adobe.com/flashplayer
function checkFlashPlayerAvailable(userAgent){
    var browserData = bowser(userAgent);
    console.log("checkFlashPlayerAvailable().browserData.name: " + browserData.name);
    switch (browserData.name) {
        case 'Chrome':
            if (navigator.plugins.namedItem('Shockwave Flash') != null){
                console.log("checkFlashPlayerAvailable() browser name: Chrome");
                return true;
            }
            break;
        case 'Firefox':
        case 'Microsoft Edge':
            var i;
            for (i = 0; i < navigator.plugins.length; i++){
                if (navigator.plugins[i].name.indexOf('Shockwave Flash') >= 0){
                    console.log("checkFlashPlayerAvailable() browser name: Firefox or MS Edge");
                    return true;
                }
            }
            break;
        case 'Yandex Browser':
            if (navigator.plugins.namedItem('Shockwave Flash') != null){
                console.log("checkFlashPlayerAvailable() browser name: Yandex");
                return true;
            }
            break;
        case 'Internet Explorer':
            var playerVersion = swfobject.getFlashPlayerVersion();
            if (playerVersion.major != 0){
                console.log("checkFlashPlayerAvailable() browser name: MS IE");
                return true;
            }
            break;
        default:
            console.log("checkFlashPlayerAvailable() default browser name: -");
            return true;
    }
    return false;
}


var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
      {
          string: navigator.userAgent,
          subString: "Chrome",
          identity: "Chrome"
      },
      { string: navigator.userAgent,
          subString: "OmniWeb",
          versionSearch: "OmniWeb/",
          identity: "OmniWeb"
      },
      {
          string: navigator.vendor,
          subString: "Apple",
          identity: "Safari",
          versionSearch: "Version"
      },
      {
          prop: window.opera,
          identity: "Opera",
          versionSearch: "Version"
      },
      {
          string: navigator.vendor,
          subString: "iCab",
          identity: "iCab"
      },
      {
          string: navigator.vendor,
          subString: "KDE",
          identity: "Konqueror"
      },
      {
          string: navigator.userAgent,
          subString: "Firefox",
          identity: "Firefox"
      },
      {
          string: navigator.vendor,
          subString: "Camino",
          identity: "Camino"
      },
      {
          /* For Newer Netscapes (6+) */
          string: navigator.userAgent,
          subString: "Netscape",
          identity: "Netscape"
      },
      {
          string: navigator.userAgent,
          subString: "MSIE",
          identity: "Internet Explorer",
          versionSearch: "MSIE"
          },
      {
          string: navigator.userAgent,
          subString: "Gecko",
          identity: "Mozilla",
          versionSearch: "rv"
      },
      {
          /* For Older Netscapes (4-) */
          string: navigator.userAgent,
          subString: "Mozilla",
          identity: "Netscape",
          versionSearch: "Mozilla"
      }
    ],
    dataOS : [
      {
          string: navigator.platform,
          subString: "Win",
          identity: "Windows"
      },
      {
          string: navigator.platform,
          subString: "Mac",
          identity: "Mac"
      },
      {
          string: navigator.userAgent,
          subString: "iPhone",
          identity: "iPhone/iPod"
      },
      {
          string: navigator.platform,
          subString: "Linux",
          identity: "Linux"
      }
    ]
};
BrowserDetect.init();