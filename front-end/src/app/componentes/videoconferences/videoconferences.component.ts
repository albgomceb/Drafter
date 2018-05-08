import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealTimeService, WSResponseType } from '../../services/real-time.service';
declare var Meeting: any;

@Component({
    selector: 'videoconferences',
    templateUrl: './videoconferences.component.html',
    styleUrls: ['./videoconferences.component.scss']
})
export class VideoconferencesComponent implements OnInit {

    @Input() idRoomMeeting: number;
    room: number;

    constructor(private activatedRoute: ActivatedRoute, private realTimeService: RealTimeService) { }

    ngOnInit() {
        this.room = parseInt(window.location.pathname.split("/")[2]);
        var scope = this;
        let constraints;
        let audioTracks: Array<MediaStreamTrack> = [];
        let videoTracks: Array<MediaStreamTrack> = [];
        let arrayTracks: Array<MediaStreamTrack> = [];
        let camStream: MediaStream;
        let remoteStream: MediaStream;
        let hostPC;
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
                }

            ],
            optional: [{ DtlsSrtpKeyAgreement: true }]
        };
        let socket: any;
        this.realTimeService.register('video-offer', [], _oferta => {
            let oferta = _oferta.model;
            if (oferta && oferta.peerId == this.realTimeService.getUserUUID()) {
                hostPC.setRemoteDescription(new RTCSessionDescription({ sdp: oferta.sdp, type: oferta.type }));
                hostPC.createAnswer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 })
                    .then(answer => {
                        console.log("SENDING ANSWER: ", answer);
                        hostPC.setLocalDescription(new RTCSessionDescription(answer));
                        this.realTimeService.send('/meeting/send-answer/', WSResponseType.SET, 'video-answer', { sdp: answer.sdp, type: answer.type, peerId: oferta.localId, localId: this.realTimeService.getUserUUID() });
                    }).catch(err => { console.log("answer failed: ", err); });


            }
        });
        this.realTimeService.register('video-answer', [], _respuesta => {
            let respuesta = _respuesta.model;
            if (respuesta && respuesta.peerId == this.realTimeService.getUserUUID()) {
                console.log("Answer Received");
                hostPC.setRemoteDescription(new RTCSessionDescription({ sdp: respuesta.sdp, type: respuesta.type }));
                console.log("Streams Remote: ", hostPC.getRemoteStreams());
                console.log("Streams Local: ", hostPC.getLocalStreams());

            }
        });
        this.realTimeService.register('video-available', [], _respuesta => {
            let respuesta = _respuesta.model;
            if (respuesta && respuesta.uuid != this.realTimeService.getUserUUID()) {

                hostPC.createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 })
                    .then(offer => {
                        console.log("SENDING OFFER: ", offer);
                        hostPC.setLocalDescription(new RTCSessionDescription(offer));
                        this.realTimeService.send('/meeting/send-offer/', WSResponseType.SET, 'video-offer', { sdp: offer.sdp, type: offer.type, peerId: respuesta.uuid, localId: this.realTimeService.getUserUUID() });

                    })
                    .catch(err => {
                        console.log('ERROOOR: ', err);
                    });

            }

        });

        //VARIABLES VIDEOCONFERENCIA
        console.log("Initializing; room = " + this.room);
        var localVideo: any = document.getElementById("localVideo");
        var remoteVideo: any = document.getElementById("remoteVideo");


        //EJECUCION DEL CODIGO
        start();

        //PEDIMOS PERMISO DE CAPTURA DE AUDIO Y VIDEO A LOS DISPOSITIVOS ACTIVOS
        function start() {
            console.log('Requesting local stream');

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
            localVideo.srcObject = camStream;


            // Caller creates PeerConnection.
            if (camStream) {
                console.log("cam: ", camStream);
                createPeerConnection();
            }
        }

        //LLEVAMOS A CABO LA LLAMADA
        function createPeerConnection() {
            try {
                // Create an RTCPeerConnection
                hostPC = new RTCPeerConnection(servers);
                console.log('Creating RTCPeerConnnection', hostPC);
                hostPC.onicecandidate = function (event) {

                    hostPC.addIceCandidate(event.candidate);
                }

                hostPC.onaddstream = function (event) {
                    console.log("ON TRACK: ", event);


                    console.log("Streams Remote: ", hostPC.getRemoteStreams());
                    console.log("Streams Local: ", hostPC.getLocalStreams());
                    // remoteVideo.srcObject = event.streams[0];

                    var remoteVideo: any = document.getElementById("remoteVideo");
                    // console.log("Tracks: ",event.streams.getVideoTracks());
                    console.log("Receivers: ", hostPC.getReceivers());

                    remoteVideo.srcObject = event.stream
                    // var mediaControl: any = document.getElementById("remoteVideo");
                    // if ('srcObject' in mediaControl) {
                    //     mediaControl.srcObject = event.streams[0];
                    //     mediaControl.src = URL.createObjectURL(event.streams[0]);
                    // } else if (navigator.userAgent.search("Firefox") !== -1) {
                    //     mediaControl.mozSrcObject = event.streams[0];
                    // }

                }
                hostPC.addStream(camStream);
                scope.realTimeService.send('/meeting/send-available/', WSResponseType.SET, 'video-available', { uuid: scope.realTimeService.getUserUUID() });
                console.log('Waiting for peer...');
            } catch (e) {
                console.log("Failed to create PeerConnection, exception: " + e.message);
                alert("Cannot create RTCPeerConnection object; WebRTC is not supported by this browser.");
                return;
            }

        }

        function hangup() {
            console.log('Ending calls');
            hostPC.close();

            hostPC = null;
            console.log('Hung calls');
        }
    }

}
