import { Component, OnInit } from '@angular/core';
import {UtilsService} from './services/utils.service'
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'app';
  showLoader: boolean;
  TBtalk : Array<any>;
  constructor(
    private coreService: UtilsService,
    public userService : UserService) {
}
ngOnInit() {
  this.coreService.status.subscribe((val: boolean) => {
    console.log("value changed")
      this.showLoader = val;
  });
  

}
}

