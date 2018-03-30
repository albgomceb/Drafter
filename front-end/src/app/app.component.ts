import { Component } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import * as $ from 'jquery';
 
declare let paypal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

  title = 'app';

  addScript: boolean = false;
  paypalLoad: boolean = true;
  
  licenses:Array<License> = [
    new License("Enterprise", "4.99"),
    new License("Standalone","3093.86")
];

  finalAmount: number = 1;

  selectedLicense = null;

  ngOnInit(){
    this.selectedLicense;

    $(document).ready(function(){
      $('.selectpicker').change(function(){
        $('.selectpicker').css('color','white').css('background-color','#333');
        $('.selectpicker option').css('color','black').css('background-color','white').css('text-align','left');
        $('.selectpicker optgroup').css('color','black').css('background-color','rgb(240,240,240)').css('text-align','left');
      });
    });

  }

  

  getLicense() {
    this.selectedLicense = $('.selectpicker').val();
    console.log(this.selectedLicense);
    return this.selectedLicense;
  }

  
 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AfksXIAeg7LE2T5D8WIP3DAgd2oLCWK5PcF0fCVxvpGqLiaJFtpeDp8RX3iWbXfVsvQM_kxTqdXnJSI3',
      production: 'AQGSKxRh-u9Ms3C3xcvhWfDKdIcJw34-wErV19hfjs7nTiA4ksSf-Ni5VN1BzUkC5WFrnvN2epBhon-u'
    },
    commit: true,

    payment: (data, actions) => {

      alert(this.getLicense())

      return actions.payment.create({
        payment: {
          transactions: [
            { amount: 
              { 
              total: this.finalAmount, 
              currency: 'EUR' 
              } 
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        alert("CONGRATULATIONS");
      })
    }
  };
 
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}

class License {
  name:string;
  price:string;

  constructor(name,price){this.name=name,this.price=price}

}
