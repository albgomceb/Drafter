import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';
import * as attachMediaStream from 'attachmediastream';
import { RealTimeService, WSResponseType } from '../../services/real-time.service';
import * as io from 'socket.io-adapter';

@Component({
    selector: 'videoconferences',
    templateUrl: './videoconferences.component.html',
    styleUrls: ['./videoconferences.component.scss']
})
export class VideoconferencesComponent implements OnInit{

    @Input() idRoomMeeting: number;
    room: number;

    constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService, private realTimeService: RealTimeService) { }

   
    ngOnInit() {



        //this.room = this.idRoomMeeting;
        console.log(window.location.pathname.split("/")[2]);
        this.room = parseInt(window.location.pathname.split("/")[2]);

        var scope = this;

        let constraints;

        let audioTracks: Array<MediaStreamTrack> = [];
        let videoTracks: Array<MediaStreamTrack> = [];
        let arrayTracks: Array<MediaStreamTrack> = [];
        let camStream: MediaStream;
        let remoteStream: MediaStream;
        let hostPC = new RTCPeerConnection(null);
        let clientPC: any = new RTCPeerConnection(null);
        let candidate: RTCIceCandidate;
        let servers = {
            iceServers: [
                {
                    'urls': 'stun:stun.l.google.com:19302'
                },
                {
                    'urls': 'turn:192.158.29.39:3478?transport=udp',
                    'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    'username': '28224511:1379330808'
                },
                {
                    'urls': 'turn:192.158.29.39:3478?transport=tcp',
                    'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    'username': '28224511:1379330808'
                },
                {
                    'urls': 'turn:turn.bistri.com:80',
                    'credential': 'homeo',
                    'username': 'homeo'
                }
            ]
        };
        let socket: any;
        this.realTimeService.register('video-offer', [], _oferta => {
            let oferta = _oferta.model;
            console.log(oferta, "id: ", oferta.peerId, "==", oferta.peerId == this.realTimeService.getUserUUID(), "===", oferta.peerId === this.realTimeService.getUserUUID());
            if (oferta && oferta.peerId == this.realTimeService.getUserUUID()) {
                console.log("HOST: ", hostPC);
                console.log("cam: ", camStream);


                hostPC.setRemoteDescription(new RTCSessionDescription({sdp:oferta.sdp,type:oferta.type}));
                hostPC.createAnswer().then(answer => {
                    hostPC.setLocalDescription(new RTCSessionDescription(answer));
                    this.realTimeService.send('/meeting/send-answer/', WSResponseType.SET, 'video-answer', { sdp: answer.sdp, type:answer.type,peerId: oferta.localId, localId: this.realTimeService.getUserUUID() });
                });

            }
        });
        this.realTimeService.register('video-answer', [], _respuesta => {
            let respuesta = _respuesta.model;
            if (respuesta && respuesta.peerId == this.realTimeService.getUserUUID()) {
                // hostPC.addStream(camStream);
                hostPC.setRemoteDescription(new RTCSessionDescription(new RTCSessionDescription({sdp:respuesta.sdp,type:respuesta.type})));
            }
        });
        this.realTimeService.register('video-available', [], _respuesta => {
            let respuesta = _respuesta.model;
            if (respuesta && respuesta.uuid != this.realTimeService.getUserUUID()) {
                console.log("NUEVO USUARIO: " + respuesta.uuid);
                hostPC.createOffer()
                    .then(offer => {
                        hostPC.setLocalDescription(new RTCSessionDescription(offer));
                        this.realTimeService.send('/meeting/send-offer/', WSResponseType.SET, 'video-offer', { sdp: offer.sdp, type:offer.type,peerId: respuesta.uuid, localId: this.realTimeService.getUserUUID() });

                    })
                    .catch(err => {
                        console.log('ERROOOR: ', err);

                    });
                hostPC.onaddstream = function (event) {
                    console.log("STREAMS (LOCAL): ", event.stream);
                    attachMediaStream(event.stream, remoteVideo);
                }
            }

        });


        //VARIABLES VIDEOCONFERENCIA
        console.log("Initializing; room = " + this.room);
        var localVideo = document.getElementById("localVideo");
        var remoteVideo = document.getElementById("remoteVideo");

        var sdpConstraints = {
            'mandatory': {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            }
        };

        constraints = {
            'OfferToReceiveAudio': 1,
            'OfferToReceiveVideo': 1
        };

        //EJECUCION DEL CODIGO
        start();


        //PEDIMOS PERMISO DE CAPTURA DE AUDIO Y VIDEO A LOS DISPOSITIVOS ACTIVOS
        function start() {
            console.log('Requesting local stream');
            //alert(navigator.userAgent);

            if (navigator.getUserMedia) {

                if (navigator.userAgent.search("IOS") !== -1) {
                    //alert("Solo disponible para Desktop(Chrome o Firefox) y Android");
                } else if (navigator.userAgent.search("Android") !== -1) {
                    //alert("Usas Android");
                    $("#buttonsAndroid").show();

                    $("#frontCam").click(function () {

                        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
                            .then(function (stream) {
                                console.log('Received local stream');
                                if (stream.getVideoTracks.length > 0)
                                    stream.getVideoTracks[0].stop();
                                camStream = stream;
                                doGetUserMedia();
                            })
                            .catch(function (e) {
                                console.log('getUserMedia() error: ', e);
                                alert('getUserMedia() error: ' + e)
                            });

                    });

                    $("#backCam").click(function () {

                        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                            .then(function (stream) {
                                console.log('Received local stream');
                                if (stream.getVideoTracks.length > 0)
                                    stream.getVideoTracks[0].stop();
                                camStream = stream;
                                doGetUserMedia();
                            })
                            .catch(function (e) {
                                console.log('getUserMedia() error: ', e);
                                alert('getUserMedia() error: ' + e)
                            });

                    });

                } else {
                    //alert("Usas Chrome o Firefox");
                    $("#buttonsAndroid").hide();

                    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                        .then(function (stream) {
                            console.log('Received local stream');
                            camStream = stream;
                            doGetUserMedia();
                        })
                        .catch(function (e) {
                            console.log('getUserMedia() error: ', e);
                            alert('getUserMedia() error: ' + e)
                        });



                }

                $("#hangUp").click(function () {
                    hangup();
                });


            } else {
                alert('Sorry, your browser does not support getUserMedia');
            }
        }


        function doGetUserMedia() {
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
                hostPC.addStream(camStream);
                scope.realTimeService.send('/meeting/send-available/', WSResponseType.SET, 'video-available', { uuid: scope.realTimeService.getUserUUID() });
                console.log('Waiting for peer...');
            } catch (e) {
                console.log("Failed to create PeerConnection, exception: " + e.message);
                alert("Cannot create RTCPeerConnection object; WebRTC is not supported by this browser.");
                return;
            }

        }

        //   this.realTimeService.registerOnJoinUser((name,uuid) => {


        //   });

        // This function would be called when receiving a remote connection
        //   function newClient() {
        //     clientPC = new RTCPeerConnection(servers);
        //     console.log('Creating local offer');
        //     hostPC.createOffer()
        //         .then(offer => {
        //             console.log("Offer SENT: ",offer);

        //             hostPC.setLocalDescription(offer);
        //             realtime.send(envia oferta)

        //         })
        //         .then(() => clientPC.setRemoteDescription(hostPC.localDescription))
        //         .then(() => clientPC.createAnswer())
        //         .then(answer => {
        //             console.log("Answer SENT: ",answer);
        //             clientPC.setLocalDescription(answer);
        //         })
        //         .then(() => hostPC.setRemoteDescription(clientPC.localDescription))
        //         .catch(function(err){
        //           console.log("CREATE OFFER: "+err);
        //         });
        //   }

        function hangup() {
            console.log('Ending calls');
            hostPC.close();

            hostPC = null;
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
