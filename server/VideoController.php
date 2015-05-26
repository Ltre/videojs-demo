<?php
/**
 * 需用phpbase自行搭建服务端
 */
class VideoController extends BaseController {

    public function actionOnPlay(){
        $this->_doLog('play');
    }

    public function actionOnPause(){
        $this->_doLog('pause');
    }

    public function actionOnLoadstart(){
        $this->_doLog('loadstart');
    }

    //高频事件，考虑节流
    public function actionOnSuspend(){
        $this->_doLog('suspend');
    }

    //高频事件，考虑节流
    public function actionOnProgress(){
        $this->_doLog('progress');
    }

    //高频事件，考虑节流
    public function actionOnTimeupdate(){
        $this->_doLog('timeupdate');
    }

    public function actionOnError(){
        $this->_doLog('error');
    }

    private function _doLog($playtype){
        $data = array(
            'vid'       => arg('vid'),
            'playtype'  => $playtype,
            'refer'     => $_SERVER['HTTP_REFERER'],
            'ua'        => $_SERVER['HTTP_USER_AGENT'],
            'ip'        => $_SERVER['REMOTE_ADDR'],
            'reptime'   => time(),          //上报时间
            'moment'    => arg('moment'),   //播放器时刻
        );
        $this->putjson(0, $data);
    }

}