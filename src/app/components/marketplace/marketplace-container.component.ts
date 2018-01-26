import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TrackMode } from '../../services/trackMode.service';
import { TrackCurrency} from '../../services/trackCurrency.service';
import { MarketplaceHttpService } from '../../services/marketplace-services/marketplace-http.service';
import { MarketplaceService } from '../../services/marketplace-services/marketplace.service';

@Component({
  selector: 'app-marketplace-container',
  templateUrl: './marketplace-container.component.html',
  styleUrls: ['./marketplace-container.component.css'],
  providers: [MarketplaceService, MarketplaceHttpService]
})
export class MarketplaceComponent implements OnInit {
  userMode: string = '';
  currencyType: string = '';
  isLoggedIn: boolean;

  constructor(private titleService: Title,
              private trackCurrency: TrackCurrency,
              private trackMode: TrackMode) {
    titleService.setTitle('Qchain – Marketplace');

    this.userMode = trackMode.mode;
    this.currencyType = trackCurrency.currency;

    //Subscribe to receive the mode selected in the header component
    trackMode.getMode().subscribe(
      returnedMode => {
        this.userMode = returnedMode;
      });

    //Subscribe to receive the currency selected in the header component
    trackCurrency.getCurrency().subscribe(
      returnedCurrency => {
        this.currencyType = returnedCurrency;
      });
  }

  isAdvertiser() {
    if (this.trackMode.mode == 'ADVERTISER')
      return true;
  }

  isPublisher() {
    if (this.trackMode.mode == 'PUBLISHER')
      return true;
  }

  ngOnInit() {}
}
