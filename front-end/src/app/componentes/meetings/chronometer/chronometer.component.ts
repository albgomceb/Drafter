import { RealTimeService, WSResponseType } from './../../../services/real-time.service';
import { timer } from 'rxjs/observable/timer';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { window } from 'rxjs/operators/window';
import { DynamicMeetingService } from '../../services/dynamic-meeting.service';

@Component({
  selector: 'chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.scss']
})
export class ChronometerComponent implements OnInit, OnDestroy {

  @Input() meetingId: number;
  private timer: number;
  private timeout: any;
  private isRunning: boolean;
  private binit: boolean;


  constructor(private dynamicMeetingService: DynamicMeetingService, private realTimeService: RealTimeService) { }


  ngOnInit() {
    this.timeout = null;
    this.isRunning = false;
    this.binit = false;

    this.dynamicMeetingService.getMeetingInfo(this.meetingId).subscribe(res => {
      this.timer = res.timer;
      var that = this;
      var tout = setTimeout(function() {
        that.binit = true;
        that.set();
      }, 5000);

      this.realTimeService.connect(this.meetingId, () => {

        this.realTimeService.register('set-running', [], obj => {
          if(obj.data.running) {
            this.timer = obj.data.timer;
            this._start();
          } else {
            this.timer = obj.data.timer;
            this._stop();
          }
        });
  
        this.realTimeService.register('req-init', [], obj => {
          if(this.binit)
            this.realTimeService.send('/chat/send/', WSResponseType.RUN, 'res-init', {}, {running: this.isRunning, timer: this.timer});
        });
  
        this.realTimeService.register('res-init', [], obj => {
          if(!this.binit) {
            this.binit = true;
            clearTimeout(tout);

            if(obj.data.running) {
              this.timer = obj.data.timer;
              this._start();
            } else {
              this.timer = obj.data.timer;
              this._stop();
            }
          }
        });
  
        this.init();
  
        this.realTimeService.subscribe();
      });
    });

  }

  ngOnDestroy() {
    this.stop();
  }


  public nextSecond() {
    this.timer++;
  }

  public format(): string {
    var s: number = this.timer;
    var m: number = Math.floor(this.timer/60);
    var h: number = Math.floor(m/60);

    m -= 60*h;
    s -= 3600*h + 60*m;

    var sm: string = ("00" + m).slice(-2);
    var ss: string = ("00" + s).slice(-2);

    return "" + h + ":" + sm + ":" + ss;
  }


  private _start() {
    var that = this;
    var internal = function() {
      if(!that.isRunning) {
        that.saveState();
        that.isRunning = true;
        that.timeout = setInterval(() => {
          that.nextSecond();
        }, 1000);
      }
    }

    this.toggle(internal);
  }

  private toggle(internal: Function) {
    if(!this.timer) {
      this.dynamicMeetingService.getMeetingInfo(this.meetingId).subscribe(res => {
        this.timer = res.timer;
        internal();
      });
    } else
      internal();
  }

  public start() {
    this.realTimeService.send('/chat/send/', WSResponseType.RUN, 'set-running', {}, {running: true, timer: this.timer});
  }


  private _stop() {
    var that = this;
    var internal = function() {
      if(that.timeout && that.isRunning) {
        clearInterval(that.timeout);
        that.isRunning = false;
        that.saveState();
      }
    }

    this.toggle(internal);
  }

  public stop() {
    this.realTimeService.send('/chat/send/', WSResponseType.RUN, 'set-running', {}, {running: false, timer: this.timer});
  }


  private saveState() {
    this.dynamicMeetingService.setTimer(this.meetingId, this.timer).subscribe();
  }

  private init() {
    this.realTimeService.send('/chat/send/', WSResponseType.RUN, 'req-init', {}, {});
  }

  private set() {
    this.realTimeService.send('/chat/send/', WSResponseType.RUN, 'set-running', {}, {running: this.isRunning, timer: this.timer});
  }
}