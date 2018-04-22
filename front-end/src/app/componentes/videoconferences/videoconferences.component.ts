import { Component, OnInit } from '@angular/core';
import * as SimpleWebRTC from 'simplewebrtc';

@Component({
  selector: 'videoconferences',
  templateUrl: './videoconferences.component.html',
  styleUrls: ['./videoconferences.component.scss']
})
export class VideoconferencesComponent implements OnInit {

  

  constructor() { }
  

  ngOnInit() {

    this.callInit();

  }

  callInit(){

    var room = location.search && location.search.split('?')[1];

    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remotesVideo',
      // immediately ask for camera access
      nick: 'PabloGitu',
      autoRequestMedia: true,
      debug: false,
      detectSpeakingEvents: true
    });

    webrtc.on('readyToCall', function () {
      // you can name it anything
      if (room) webrtc.joinRoom(room);
    });

    function showVolume(el, volume) {
      if (!el) return;
      if (volume < -45) { // vary between -45 and -20
          //el.style.height = '0px';
          $("#localVolume").css('height','0px');
      } else if (volume > -20) {
          //el.style.height = '100%';
          $("#localVolume").css('height','100%');
      } else {
          //el.style.height = '' + Math.floor((volume + 100) * 100 / 25 - 220) + '%';
          $("#localVolume").css('height','' + Math.floor((volume + 100) * 100 / 25 - 220) + '%');
      }
    }

    webrtc.on('channelMessage', function (peer, label, data) {
      if (data.type == 'volume') {
          showVolume(document.getElementsByClassName('volume_' + peer.id), data.volume);
      }
    });

    webrtc.on('videoAdded', function (video, peer) {
      console.log('video added', peer);
      var remotes = document.getElementById('remotesVideo');
      console.log(webrtc.getDomId(peer));

      if (peer && peer.pc) {
        var connstate = document.createElement('div');
        connstate.className = 'connectionstate';
        remotes.appendChild(connstate);
        peer.pc.on('iceConnectionStateChange', function (event) {
            switch (peer.pc.iceConnectionState) {
            case 'checking':
                connstate.innerText = 'Connecting to peer...';
                break;
            case 'connected':
            case 'completed': // on caller side
                connstate.innerText = peer.nick;
                break;
            case 'disconnected':
                connstate.innerText = 'Disconnected.';
                break;
            case 'failed':
                break;
            case 'closed':
                connstate.innerText = 'Connection closed.';
                break;
            }
        });
      }   
      
      if (remotes) {
          var d = document.createElement('div');
          d.className = 'videoContainer';
          d.id = 'container_' + webrtc.getDomId(peer);
          d.appendChild(video);
          var vol = document.createElement('div');
          vol.id = 'volume_' + peer.id;
          vol.className = 'volume_bar';
          video.onclick = function () {
              video.style.width = video.videoWidth + 'px';
              video.style.height = video.videoHeight + 'px';
          };
          d.appendChild(vol);
          remotes.appendChild(d);
      }
    });

    webrtc.on('videoRemoved', function (video, peer) {
      console.log('video removed ', peer);
      var remotes = document.getElementById('remotesVideo');
      console.log(webrtc.getDomId(peer));
      var el = document.getElementById('container_' + webrtc.getDomId(peer));
      if (remotes && el) {
          remotes.removeChild(el);
      }
    });

    webrtc.on('volumeChange', function (volume, treshold) {
      //console.log('own volume', volume);
      showVolume(document.getElementById('localVolume'), volume);
    });

    function setRoom(name) {
        $('form').remove();
        $('h1').text(name);
        $('#subTitle').text('Link to join: ' + location.href);
        $('body').addClass('active');
    }

    if (room) {
      setRoom(room.toLowerCase().replace('=','').replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, ''));
    } else {
        $('form').submit(function () {
            webrtc.createRoom('34', function (err, name) {
                console.log(' create room cb', arguments);
                var newUrl = location.pathname + '?' + name;
                if (!err) {
                    history.replaceState({foo: 'bar'}, null, newUrl);
                    setRoom(name);
                } else {
                    console.log(err);
                }
            });
            return false;
        });
    }

  }

}
