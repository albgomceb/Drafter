import { Component, OnInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit,AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  
  licenses:Array<License> = [
    new License("Enterprise", 4.99)
];

  showOverlay:boolean = false;

  amount: number = 0;

  constructor() { }

  ngOnInit() {

    this.showOverlay;

  }

  paypalConfig = {
    env: 'production',
    locale: 'en_US',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'rect',
      label: 'checkout',
      tagline: false,
      fundingicons: true
    },
    client: {
      sandbox: 'AfksXIAeg7LE2T5D8WIP3DAgd2oLCWK5PcF0fCVxvpGqLiaJFtpeDp8RX3iWbXfVsvQM_kxTqdXnJSI3',
      production: 'AQGSKxRh-u9Ms3C3xcvhWfDKdIcJw34-wErV19hfjs7nTiA4ksSf-Ni5VN1BzUkC5WFrnvN2epBhon-u'
    },
    commit: true,

    payment: (data, actions) => {
        this.amount = this.licenses[0].price;
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: 
                { 
                total: this.amount, 
                currency: 'EUR' 
                } 
              }
            ]
          }
        });
    },

    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        alert("CONGRATULATIONS. Payment finished succesfully!");
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

  toggleLicense(){
    if(this.showOverlay==false)
      this.showOverlay = true;
    else
    this.showOverlay = false;
  }


}

class License {
  name:string;
  price:number;

  constructor(name,price){this.name=name,this.price=price};
}
