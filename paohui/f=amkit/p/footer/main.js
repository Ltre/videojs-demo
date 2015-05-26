/**
 * Created by Administrator on 15.5.25.
 */
seajs.config({moduleVersion: [["p/letv", "20140513"]]}), define("p/footer/main", ["p/letv/flash2video", "jquery", "p/letv/ua", "p/letv/mp4"], function (e) {
    e("p/letv/flash2video"), e.async("p/v-floatable/main")
});