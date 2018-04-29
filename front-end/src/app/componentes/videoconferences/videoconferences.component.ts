import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';
import * as attachMediaStream from 'attachmediastream';
import { RealTimeService } from '../../services/real-time.service';
import * as io from 'socket.io-adapter';

@Component({
  selector: 'videoconferences',
  templateUrl: './videoconferences.component.html',
  styleUrls: ['./videoconferences.component.scss']
})
export class VideoconferencesComponent implements OnInit {

    @Input() idRoomMeeting: number;
    room:number;

  constructor(private activatedRoute:ActivatedRoute, private loginService: LoginService, private realTimeService: RealTimeService) { }
  

  ngOnInit() {

    

    //this.room = this.idRoomMeeting;
    console.log(window.location.pathname.split("/")[2]);
    this.room =  parseInt(window.location.pathname.split("/")[2]);

    var scope = this;

    let constraints;

    let audioTracks:Array<MediaStreamTrack>=[];
    let videoTracks:Array<MediaStreamTrack>=[];
    let arrayTracks:Array<MediaStreamTrack>=[];
    let camStream:MediaStream;
    let remoteStream:MediaStream;
    let hostPC = new RTCPeerConnection(null);
    let clientPC = new RTCPeerConnection(null);
    let candidate:RTCIceCandidate;
    let servers = {iceServers: [
      {
          urls: [ 
          'stun:23.21.150.121',
          'stun:stun.l.google.com:19302',
          'stun:stun.services.mozilla.com'
          ],
      },
    ]};
    let socket:any;

    //VARIABLES VIDEOCONFERENCIA
    console.log("Initializing; room = "+this.room);
    var localVideo = $("#localVideo");
    var remoteVideo = $("#remoteVideo");

    var sdpConstraints = {'mandatory': {
        'OfferToReceiveAudio':true, 
        'OfferToReceiveVideo':true }};

    constraints = {
        'OfferToReceiveAudio':1, 
        'OfferToReceiveVideo':1 };

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
                    doGetUserMedia();
                })
                .catch(function(e) {
                    console.log('getUserMedia() error: ', e);
                    alert('getUserMedia() error: '+ e)
                });

                

            }

            $("#hangUp").click(function() {
              hangup();
            });

        }else{
            alert('Sorry, your browser does not support getUserMedia');
        }
    }


      function doGetUserMedia(){
        console.log("User has granted access to local media.");
        attachMediaStream(camStream, localVideo);
        // Caller creates PeerConnection.
        if (camStream)
          createPeerConnection();
      }

      //LLEVAMOS A CABO LA LLAMADA
      function createPeerConnection() {
        try {
            // Create an RTCPeerConnection
            console.log('Creating RTCPeerConnnection');
            hostPC = new RTCPeerConnection(servers);
            console.log('Adding Stream object');
            console.log("STREAM: ",camStream);
            hostPC.addStream(camStream);
        } catch (e) {
            console.log("Failed to create PeerConnection, exception: " + e.message);
            alert("Cannot create RTCPeerConnection object; WebRTC is not supported by this browser.");
            return;
        }

      }

      hostPC.onicecandidate = function(e){clientPC.addIceCandidate(e.candidate)}
      clientPC.onicecandidate = function(e){hostPC.addIceCandidate(e.candidate)}

      clientPC.onaddstream = function(event){
        console.log("STREAM REMOTO: "+event.stream);
        attachMediaStream(event.stream, remoteVideo);
      }

      this.realTimeService.registerOnJoinUser((name,uuid) => {
        console.log("NUEVO USUARIO: "+name+", "+uuid);
        newClient();
      });

      // This function would be called when receiving a remote connection
      function newClient() {
        clientPC = new RTCPeerConnection(servers);
        hostPC.createOffer()
            .then(offer => hostPC.setLocalDescription(offer))
            .then(() => clientPC.setRemoteDescription(hostPC.localDescription))
            .then(() => clientPC.createAnswer())
            .then(answer => clientPC.setLocalDescription(answer))
            .then(() => hostPC.setRemoteDescription(clientPC.localDescription))
            .catch(function(err){
              console.log("CREATE OFFER: "+err);
            });

            console.log('Received remote stream');
            clientPC.addStream(camStream);
      }

      function hangup() {
        console.log('Ending calls');
        hostPC.close();
        clientPC.close();
        hostPC = clientPC = null;
        console.log('Hung calls');
      }

      /*function iceCallback(event) {
        if (event.candidate) {
            var message = {type: 'candidate',
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate};
              var msgString = JSON.stringify(message);
              console.log('C->S: ' + msgString);
              var candidate = new RTCIceCandidate(event.candidate);
              pc.addIceCandidate(candidate).catch(function(reason) {
                // An error occurred, so handle the failure to connect
                console.log("ERROR: "+reason);
        });
          } else {
            console.log("End of candidates.");
          }
      }*/

}

  public getLoginService(): LoginService {
    return this.loginService;
  }

}
