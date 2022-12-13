import { Component, Input } from '@angular/core';
import { AdInfo } from 'src/app/model/Ad.model';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-info',
  templateUrl: './ad-info.component.html',
  styleUrls: ['./ad-info.component.scss']
})
export class AdInfoComponent {
  @Input() uniqueId:string = ''
  @Input() title: string = 'Ad info'
  @Input() adInfo!:AdInfo
  constructor(){}

  ngOnInit(){

  }
}
