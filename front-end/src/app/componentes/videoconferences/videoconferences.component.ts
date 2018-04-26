import { Component, OnInit, Input } from '@angular/core';
import * as SimpleWebRTC from 'simplewebrtc';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'videoconferences',
  templateUrl: './videoconferences.component.html',
  styleUrls: ['./videoconferences.component.scss']
})
export class VideoconferencesComponent implements OnInit {

    @Input() idRoomMeeting: string;
    room:string;

  constructor(private activatedRoute:ActivatedRoute, private loginService: LoginService) { }
  

  ngOnInit() {
    
    this.callInit();
  }

  callInit(){
    this.room = this.idRoomMeeting;

    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remotesVideo',
      // nickname of logged user
      nick: this.getLoginService().getPrincipal().username,
      //nick: 'PabloGitu',
      // immediately ask for camera access
      autoRequestMedia: true,
      debug: false,
      detectSpeakingEvents: true
    });

    webrtc.on('readyToCall', function () {
      // you can name it anything
      if (this.room) webrtc.joinRoom(this.room);
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
                console.log("NICK:" + peer.nick)
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
          video.style.width = '200px'
          video.style.height = '150px'
          video.onclick = function () {
              video.style.width = '100px';
              video.style.height = '100px';
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

    // listen for mute and unmute events
    webrtc.on('mute', function (data) { // show muted symbol
        webrtc.getPeers(data.id).forEach(function (peer) {
            if (data.name == 'audio') {
                $('#videocontainer_' + webrtc.getDomId(peer) + ' .muted').show();
            } else if (data.name == 'video') {
                $('#videocontainer_' + webrtc.getDomId(peer) + ' .paused').show();
                $('#videocontainer_' + webrtc.getDomId(peer) + ' video').hide();
            }
        });
    });
    webrtc.on('unmute', function (data) { // hide muted symbol
        webrtc.getPeers(data.id).forEach(function (peer) {
            if (data.name == 'audio') {
                $('#videocontainer_' + webrtc.getDomId(peer) + ' .muted').hide();
            } else if (data.name == 'video') {
                $('#videocontainer_' + webrtc.getDomId(peer) + ' video').show();
                $('#videocontainer_' + webrtc.getDomId(peer) + ' .paused').hide();
            }
        });
    });

    //botones para mutear y desmutear, hay que hacer que al principio el botón de desmutear no se muestre.
    $('#btn1').click(function() {
        webrtc.mute();
      });

    $('#btn2').click(function() {
        webrtc.unmute();
    });

  }

  public getLoginService(): LoginService {
    return this.loginService;
  }

}
