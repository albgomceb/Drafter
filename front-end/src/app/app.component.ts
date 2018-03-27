import { Component } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
 
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
  
  licenses:Array<Object> = [
    {num: 1, name: "Enterprise", price: 4.99},
    {num: 2, name: "Standalone", price: 3093.86}
];

  finalAmount: number = 1;

  selectedLicense:Object = {num: 0, name: "Choosing a license", price:null} ;

  ngOnInit(){
    this.selectedLicense;
  }

  select = this.licenses[0];
 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AfksXIAeg7LE2T5D8WIP3DAgd2oLCWK5PcF0fCVxvpGqLiaJFtpeDp8RX3iWbXfVsvQM_kxTqdXnJSI3',
      production: 'AQGSKxRh-u9Ms3C3xcvhWfDKdIcJw34-wErV19hfjs7nTiA4ksSf-Ni5VN1BzUkC5WFrnvN2epBhon-u'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'EUR' } }
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
