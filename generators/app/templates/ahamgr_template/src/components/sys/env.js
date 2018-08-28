/**
 * 初始化环境
 * 请勿依赖于其他业务模块，否则导致循环引用
 */
var Env = {
   processEnv: function () {
     var _api_hosts = {
      'prod': 'http://localhost:8082', 
      'dev': 'http://localhost:8082',
      'test': 'http://localhost:8082',
      'localhost': 'http://localhost:8082' 
     };
     var _root_hosts = {
       'prod': 'http://localhost:8080',
       'dev': 'http://localhost:8080',
       'test': 'http://localhost:8080',
       'localhost': 'http://localhost:8080'
     };

     var _hostname = Util.getHostName(window.location.href);
    //  console.log("hostname:"+_hostname);
     var _key, _val;

     if (!Env.flag) {
       for (_key in _root_hosts) {
         _val = _root_hosts[_key].replace(/^(?:https|http|ftp):\/\//i, '') 
        //  console.log("hostname:"+_hostname+"环境:"+_val);
         if (_val.indexOf(_hostname) >= 0) {
           Env.flag = _key;
           Env.apiHost = _api_hosts[_key];
           Env.rootHost = _root_hosts[_key];
           break;
         }
         Env.flag = 'prod';
         Env.apiHost = _api_hosts['prod'];
         Env.rootHost = _root_hosts['prod'];
       }

     } else {

       if (Env.flag != 'prod' && Env.flag != 'dev' && Env.flag != 'test') {
         Env.flag = 'prod';
       }

       Env.apiHost = _api_hosts[Env.flag];
       Env.rootHost = _root_hosts[Env.flag];

     }
   }
 }
 Env.processEnv();
 console.log("检查当前环境" + JSON.stringify(Env));
 module.exports = Env;