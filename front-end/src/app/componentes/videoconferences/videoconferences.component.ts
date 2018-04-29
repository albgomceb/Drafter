import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';
import * as attachMediaStream from 'attachmediastream';

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

    this.room = this.idRoomMeeting;

    let constraints;

    let audioTracks:Array<MediaStreamTrack>=[];
    let videoTracks:Array<MediaStreamTrack>=[];
    let arrayTracks:Array<MediaStreamTrack>=[];
    let camStream:MediaStream;
    let remoteStream:MediaStream;
    let pc:RTCPeerConnection;

    //VARIABLES VIDEOCONFERENCIA
    console.log("Initializing; room = "+this.room);
    var localVideo = document.getElementById("localVideo");
    var miniVideo = document.getElementById("miniVideo");
    var remoteVideo = document.getElementById("remoteVideo");

    var sdpConstraints = {'mandatory': {
        'OfferToReceiveAudio':true, 
        'OfferToReceiveVideo':true }};

    constraints = {
        'OfferToReceiveAudio':true, 
        'OfferToReceiveVideo':true };

    //EJECUCION DEL CODIGO
    start();


    //PEDIMOS PERMISO DE CAPTURA DE AUDIO Y VIDEO A LOS DISPOSITIVOS ACTIVOS
    function start() {
        console.log('Requesting local stream');
        //alert(navigator.userAgent);

        if (navigator.getUserMedia) {

            if(navigator.userAgent.search("IOS")!== -1){
                //alert("Solo disponible para Desktop(Chrome o Firefox) y Android");
            }else if( navigator.userAgent.search("Android")!== -1){
                //alert("Usas Android");
                $("#buttonsAndroid").show();

                $("#frontCam").click(function() {

                navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
                .then(function(stream){
                    console.log('Received local stream');
                    if(stream.getVideoTracks.length>0)
                        stream.getVideoTracks[0].stop();
                        camStream = stream;
                        stream.getAudioTracks().forEach(e => audioTracks.push(e));
                        stream.getVideoTracks().forEach(e => videoTracks.push(e));
                        stream.getTracks().forEach(e => arrayTracks.push(e));
                        doGetUserMedia();
                })
                .catch(function(e) {
                    console.log('getUserMedia() error: ', e);
                    alert('getUserMedia() error: '+ e)
                });

                });

                $("#backCam").click(function() {

                    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                    .then(function(stream){
                        console.log('Received local stream');
                        if(stream.getVideoTracks.length>0)
                            stream.getAudioTracks[0].stop();
                            camStream = stream;
                            stream.getAudioTracks().forEach(e => audioTracks.push(e));
                            stream.getVideoTracks().forEach(e => videoTracks.push(e));
                            stream.getTracks().forEach(e => arrayTracks.push(e));
                            doGetUserMedia();
                    })
                    .catch(function(e) {
                        console.log('getUserMedia() error: ', e);
                        alert('getUserMedia() error: '+ e)
                    });

                    });

            }else{
                //alert("Usas Chrome o Firefox");
                $("#buttonsAndroid").hide();

                navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                .then(function(stream){
                    console.log('Received local stream');
                    camStream = stream;
                    stream.getAudioTracks().forEach(e => audioTracks.push(e));
                    stream.getVideoTracks().forEach(e => videoTracks.push(e));
                    stream.getTracks().forEach(e => arrayTracks.push(e));
                    doGetUserMedia();
                })
                .catch(function(e) {
                    console.log('getUserMedia() error: ', e);
                    alert('getUserMedia() error: '+ e)
                });

                $("#hangUp").click(function() {
                    hangup();
                });

            }

            

        }else{
            alert('Sorry, your browser does not support getUserMedia');
        }
    }


      function doGetUserMedia(){
        console.log("User has granted access to local media.");
        // Call the polyfill wrapper to attach the media stream to this element.
        attachMediaStream(camStream, localVideo);
        localVideo.style.opacity = "1";
        // Caller creates PeerConnection.
        maybeStart();
      }

      function maybeStart() {
        if (camStream) {
          // ...
          createPeerConnection();
          // ...
          pc.addStream(camStream);
          // Caller initiates offer to peer.
          doCall();
        }
      }

      //LLEVAMOS A CABO LA LLAMADA
      function createPeerConnection() {
        try {
            // Create an RTCPeerConnection

            var servers = {iceServers: [
                {
                    url: 'stun:23.21.150.121', // Old WebRTC API (url)
                    urls: [                    // New WebRTC API (urls)
                    'stun:23.21.150.121',
                    'stun:stun.l.google.com:19302',
                    'stun:stun.services.mozilla.com',
                    ],
                },
            ]};
            //var servers = null
            pc = new RTCPeerConnection(servers);
            pc.onicecandidate = iceCallback;
            console.log('Created RTCPeerConnnection');
            console.log("CAM-STREAM: ",camStream);
        } catch (e) {
            console.log("Failed to create PeerConnection, exception: " + e.message);
            alert("Cannot create RTCPeerConnection object; WebRTC is not supported by this browser.");
            return;
        }

        pc.onaddstream = function(event) {
            attachMediaStream(event.stream, remoteVideo);}
        pc.onremovestream = onRemoteStreamRemoved;
  
      }

      function doCall() {
        console.log("Sending offer to peer.");
        pc.createOffer().then(function(offer) {
            return pc.setLocalDescription(offer);
          })
          .then(function() {
            sendToServer({
              name: 'user' + Math.round(Math.random() * 999999999) + 999999999,
              target: "local",
              type: "video-offer",
              sdp: pc.localDescription
            });
          })
          .catch(function(reason) {
            // An error occurred, so handle the failure to connect
          });
      }

      function sendToServer(msg) {
        var msgJSON = JSON.stringify(msg);
      
        //Esta conexion es de websocket
        //connection.send(msgJSON);
      }

      function doAnswer() {
        console.log("Sending answer to peer.");
        pc.createAnswer(setLocalAndSendMessage, null);
      }

      function setLocalAndSendMessage(sessionDescription) {
        // Set Opus as the preferred codec in SDP if Opus is present.
        console.log("DESCRIPTION: " + JSON.stringify(sessionDescription));
        pc.setLocalDescription(sessionDescription);
      }

      function onRemoteStreamAdded(event) {
        // ...
        console.log("HOLA");
        attachMediaStream(event.stream, remoteVideo);
        remoteStream = event.stream;
      }

      function onRemoteStreamRemoved(event) {
        console.log("Remote stream removed.");
      }

      function hangup() {
        console.log('Ending calls');
        pc.close();
        pc.close();
        pc = null;
        console.log('Hung calls');
      }

      function iceCallback(event) {
        if (event.candidate) {
            var message = {type: 'candidate',
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate};
              var msgString = JSON.stringify(message);
              console.log('C->S: ' + msgString);
          } else {
            console.log("End of candidates.");
          }
      }

}

  public getLoginService(): LoginService {
    return this.loginService;
  }

}
