import { Component, OnInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit,AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  
  licenses:Array<License> = [
    new License("Enterprise", 4.99)
  ];

  amount: number = 0;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  paypalConfig = {
    //production, sandbox
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
        this.router.navigate(['success']);
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
  price:number;

  constructor(name,price){this.name=name,this.price=price};
}
