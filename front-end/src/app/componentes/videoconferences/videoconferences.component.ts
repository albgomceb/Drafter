import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealTimeService, WSResponseType } from '../../services/real-time.service';
import { LoginService } from '../services/login.service';
declare var Meeting: any;

@Component({
    selector: 'videoconferences',
    templateUrl: './videoconferences.component.html',
    styleUrls: ['./videoconferences.component.scss']
})
export class VideoconferencesComponent implements OnInit, OnDestroy {

    @Input() idRoomMeeting: number;
    room: number;

    constructor(private activatedRoute: ActivatedRoute, private realTimeService: RealTimeService, private loginService:LoginService) { }

    public hostPC;
    public camStream: MediaStream;

    ngOnInit() {
        this.room = parseInt(window.location.pathname.split("/")[2]);
        var scope = this;
        var camName = "Not logged";
        let candidate: RTCIceCandidate;
        let servers = {
            iceServers: [
                { 'urls': 'stun:stun.l.google.com:19302' },
                { 'urls': 'stun:stun01.sipphone.com' },
                { 'urls': 'stun:stun.ekiga.net' },
                { 'urls': 'stun:stun.fwdnet.net' },
                { 'urls': 'stun:stun.ideasip.com' },
                { 'urls': 'stun:stun.iptel.org' },
                { 'urls': 'stun:stun.rixtelecom.se' },
                { 'urls': 'stun:stun.schlund.de' },
                { 'urls': 'stun:stun.l.google.com:19302' },
                { 'urls': 'stun:stun1.l.google.com:19302' },
                { 'urls': 'stun:stun2.l.google.com:19302' },
                { 'urls': 'stun:stun3.l.google.com:19302' },
                { 'urls': 'stun:stun4.l.google.com:19302' },
                { 'urls': 'stun:stunserver.org' },
                { 'urls': 'stun:stun.softjoys.com' },
                { 'urls': 'stun:stun.voiparound.com' },
                { 'urls': 'stun:stun.voipbuster.com' },
                { 'urls': 'stun:stun.voipstunt.com' },
                { 'urls': 'stun:stun.voxgratia.org' },
                { 'urls': 'stun:stun.xten.com' },
                {
                    'urls': 'turn:numb.viagenie.ca',
                    'credential': 'muazkh',
                    'username': 'webrtc@live.com'
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
                }

            ]
        };
        let socket: any;
        this.realTimeService.register('video-offer', [], _oferta => {
            let oferta = _oferta.model;
            if (oferta && oferta.peerId == this.realTimeService.getUserUUID()) {
                
                camName = _oferta.data['user'];
                //camName = "Not Logged";

                this.hostPC.setRemoteDescription(new RTCSessionDescription({ sdp: oferta.sdp, type: oferta.type }));
                this.hostPC.createAnswer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 })
                    .then(answer => {
                        //console.log("SENDING ANSWER: ", answer);
                        this.hostPC.setLocalDescription(new RTCSessionDescription(answer));
                        console.log("Video-offer received");
                        console.log("Sending video-answer...");
                        this.realTimeService.send('/meeting/send-answer/', WSResponseType.SET, 'video-answer', { sdp: answer.sdp, type: answer.type, peerId: oferta.localId, localId: this.realTimeService.getUserUUID() });
                    }).catch(err => { console.log("answer failed: ", err); });


            }
        });
        this.realTimeService.register('video-answer', [], _respuesta => {
            let respuesta = _respuesta.model;
            if (respuesta && respuesta.peerId == this.realTimeService.getUserUUID()) {

                camName = _respuesta.data['user'];

                console.log("Video-answer received");
                this.hostPC.setRemoteDescription(new RTCSessionDescription({ sdp: respuesta.sdp, type: respuesta.type })); 
                //console.log("Streams Remote: ", hostPC.getRemoteStreams());
                //console.log("Streams Local: ", hostPC.getLocalStreams());

            }

        });

        this.realTimeService.register('candidate', [], _respuesta => {
            //console.log("ENTRO A CANDIDATEEEEEEEEEEEEEEEEEEEEEEEEEE");
            let respuesta = _respuesta.model;
            if (respuesta) {

                try {

                    var candidate: any = JSON.parse(respuesta.candidate);
                    if(candidate!=null){
                        this.hostPC.addIceCandidate(new RTCIceCandidate(candidate));
                        console.log("Candidate Received",candidate);
                    }

                } catch (e) {
                    console.log("Error: Failure during addIceCandidate(). ", e);
                }
            }
        });

        this.realTimeService.register('video-available', [], _respuesta => {
            let respuesta = _respuesta.model;
            if (respuesta && respuesta.uuid != this.realTimeService.getUserUUID()) {

                this.hostPC.createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 })
                    .then(offer => {
                        //console.log("SENDING OFFER: ", offer);
                        this.hostPC.setLocalDescription(new RTCSessionDescription(offer));
                        console.log("Sending video-offer...");
                        this.realTimeService.send('/meeting/send-offer/', WSResponseType.SET, 'video-offer', { sdp: offer.sdp, type: offer.type, peerId: respuesta.uuid, localId: this.realTimeService.getUserUUID() });

                    })
                    .catch(err => {
                        console.log('ERROR: ', err);
                    });

            }

        });

        //VARIABLES VIDEOCONFERENCIA
        console.log("Initializing; room = " + this.room);
        var localVideo: any = document.getElementById("localVideo");
        var remoteVideo: any = document.getElementById("remoteVideo");
        // var loading = document.getElementById("loading");
        remoteVideo.style.visibility = "hidden";

        var constraintsPC:MediaStreamConstraints = {
            audio: true,
            video: {
              width: 320,
              height: 240
           }
        }

        var constraintsPhoneFace:MediaStreamConstraints = {
            audio: true,
            video: {
                width: 320,
                height: 180,
                facingMode: "user"
           }
        }

        var constraintsPhoneEnv:MediaStreamConstraints = {
            audio: true,
            video: {
                width: 320,
                height: 180,
                facingMode: "environment"
           }
        }


        //EJECUCION DEL CODIGO
        start();

        //PEDIMOS PERMISO DE CAPTURA DE AUDIO Y VIDEO A LOS DISPOSITIVOS ACTIVOS
        function start() {
            console.log('Requesting local stream');

            if (navigator.getUserMedia) {

                if (navigator.userAgent.search("IOS") !== -1) {
                    
                    //IOS

                    localVideo.style.width = "20%";
                    localVideo.style.position = "absolute";
                    localVideo.style.top = "0";
                    localVideo.style.left = "0";
                    localVideo.style.zIndex = "300002";

                    remoteVideo.style.width = "100%";
                    remoteVideo.style.position = "absolute";
                    remoteVideo.style.top = "0";
                    remoteVideo.style.left = "0";
                    remoteVideo.style.zIndex = "300000";

                    var name = document.getElementById("localName");
                    name.style.visibility = "hidden";

                    $("#buttonsAndroid").hide();

                    navigator.mediaDevices.getUserMedia(constraintsPhoneFace)
                        .then(function (stream) {
                            scope.camStream = stream;
                            doGetUserMedia();
                        })
                        .catch(function (e) {
                            console.log('getUserMedia() error: ', e);
                            alert('getUserMedia() error: ' + e)
                        });

                    // $("#buttonsAndroid").show();

                    // $("#frontCam").click(function () {

                    //     navigator.mediaDevices.getUserMedia(constraintsPhoneFace)
                    //         .then(function (stream) {
                    //             //hangup();
                    //             camStream = stream;
                    //             doGetUserMedia();
                    //         })
                    //         .catch(function (e) {
                    //             console.log('getUserMedia() error: ', e);
                    //             alert('getUserMedia() error: ' + e)
                    //         });

                    // });

                    // $("#backCam").click(function () {

                    //     navigator.mediaDevices.getUserMedia(constraintsPhoneEnv)
                    //         .then(function (stream) {
                    //             //hangup();
                    //             camStream = stream;
                    //             doGetUserMedia();
                    //         })
                    //         .catch(function (e) {
                    //             console.log('getUserMedia() error: ', e);
                    //             alert('getUserMedia() error: ' + e)
                    //         });

                    // });

                } else if (navigator.userAgent.search("Android") !== -1) {
                    
                    //ANDROID

                    localVideo.style.width = "20%";
                    localVideo.style.position = "absolute";
                    localVideo.style.top = "0";
                    localVideo.style.left = "0";
                    localVideo.style.zIndex = "300002";

                    remoteVideo.style.width = "100%";
                    remoteVideo.style.position = "absolute";
                    remoteVideo.style.top = "0";
                    remoteVideo.style.left = "0";
                    remoteVideo.style.zIndex = "300000";

                    var name = document.getElementById("localName");
                    name.style.visibility = "hidden";

                    $("#buttonsAndroid").hide();

                    navigator.mediaDevices.getUserMedia(constraintsPhoneFace)
                        .then(function (stream) {
                            scope.camStream = stream;
                            doGetUserMedia();
                        })
                        .catch(function (e) {
                            console.log('getUserMedia() error: ', e);
                            alert('getUserMedia() error: ' + e)
                        });
                    
                    //$("#buttonsAndroid").show();

                    // $("#frontCam").click(function () {

                    //     navigator.mediaDevices.getUserMedia(constraintsPhoneFace)
                    //         .then(function (stream) {
                    //             //hangup();
                    //             alert("weeeee");
                    //             camStream = stream;
                    //             doGetUserMedia();
                    //         })
                    //         .catch(function (e) {
                    //             console.log('getUserMedia() error: ', e);
                    //             alert('getUserMedia() error: ' + e)
                    //         });

                    // });

                    // $("#backCam").click(function () {

                    //     navigator.mediaDevices.getUserMedia(constraintsPhoneEnv)
                    //         .then(function (stream) {
                    //             //hangup();
                    //             camStream = stream;
                    //             doGetUserMedia();
                    //         })
                    //         .catch(function (e) {
                    //             console.log('getUserMedia() error: ', e);
                    //             alert('getUserMedia() error: ' + e)
                    //         });

                    // });

                } else {

                    //DESKTOP (CHROME O FIREFOX)

                    $("#buttonsAndroid").hide();

                    navigator.mediaDevices.getUserMedia(constraintsPC)
                        .then(function (stream) {
                            scope.camStream = stream;
                            doGetUserMedia();
                        })
                        .catch(function (e) {
                            console.log('getUserMedia() error: ', e);
                            alert('getUserMedia() error: ' + e)
                        });

                }

                // $("#hangUp").click(function () {
                //     hangup();
                // });

            } else {
                alert('Sorry, your browser does not support getUserMedia');
            }
        }


        function doGetUserMedia() {
            //console.log("User has granted access to local media.");
            localVideo.muted = true;
            localVideo.srcObject = scope.camStream;


            // Caller creates PeerConnection.
            if (scope.camStream) {
                //console.log("cam: ", camStream);
                createPeerConnection();
            }
        }

        //LLEVAMOS A CABO LA LLAMADA
        function createPeerConnection() {
            try {
                // Create an RTCPeerConnection
                scope.hostPC = new RTCPeerConnection(servers);
                console.log('Creating RTCPeerConnnection', scope.hostPC);
                scope.hostPC.addStream(scope.camStream);

                scope.hostPC.onaddstream = function (event) {
                    //console.log("ON TRACK: ", event);

                    console.log("Streams Remote: ", scope.hostPC.getRemoteStreams());
                    //console.log("Streams Local: ", hostPC.getLocalStreams());
                    // remoteVideo.srcObject = event.streams[0];

                    var remoteVideo: any = document.getElementById("remoteVideo");
                    // console.log("Tracks: ",event.streams.getVideoTracks());
                    //console.log("Receivers: ", hostPC.getReceivers());
                    // loading.style.visibility = "hidden";                   
                    remoteVideo.srcObject = event.stream
                    remoteVideo.style.visibility = "visible";
                    var camRemota = document.getElementsByClassName("camRemota")[0];
                    var p = document.createElement("p");
                    p.style.display ="block";
                    p.style.color = "#222";
                    p.style.fontWeight = "bold";
                    p.style.position = "absolute";
                    p.style.top = "0";
                    p.style.left = "0";
                    p.style.padding = "5px";
                    p.style.width = "100%";
                    p.style.backgroundColor = "rgba(250, 250, 250, 0.65)";
                    p.style.zIndex = "300001";
                    p.innerHTML = capitalizeFirstLetter(camName);
                    camRemota.appendChild(p);

                }

                scope.hostPC.onicecandidate = function (event) {
                    

                    if (event.candidate != null) {
                        console.log("Enviando candidato",event.candidate);
                        console.log("Tipo", event.candidate.type);
                        scope.realTimeService.send('/meeting/send-candidate/', WSResponseType.SET, 'candidate', { candidate: JSON.stringify(event.candidate) });
                    }
                }


                console.log('Waiting for peer...');
                scope.realTimeService.send('/meeting/send-available/', WSResponseType.SET, 'video-available', { uuid: scope.realTimeService.getUserUUID() });
                
            } catch (e) {
                console.log("Failed to create PeerConnection, exception: " + e.message);
                alert("Cannot create RTCPeerConnection object; WebRTC is not supported by this browser.");
                return;
            }

        }

        // function hangup() {
        //     console.log('Ending calls');
        //     document.getElementById("loading").style.visibility = "hidden";
        //     scope.hostPC.close();
        //     $("#hangUp").hide();
        // }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

    }

    ngOnDestroy(){
        console.log('Ending calls');
        this.hostPC.close();
        this.hostPC = null;
        let tracks = this.camStream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
          });

    }

}
