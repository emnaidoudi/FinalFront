import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IntentService } from '../../services/intent.service';
import {TrainingService} from '../../services/training.service'
import { UtilsService } from '../../services/utils.service';
import { UserService } from '../../user.service';
import { User } from '../User';

import {first} from "rxjs/operators";
import { IntentComponent } from '../intent/intent.component';



@Component({
  selector: 'app-intents',
  templateUrl: './intents.component.html',
  styleUrls: ['./intents.component.scss']
})
export class IntentsComponent implements OnInit {
  panelOpenState: boolean = false;
  user: User;
  editForm: FormGroup;

  intents: any;
  TBtalk:Array<any>;
  private bodyText: string;
  constructor(public formBuilder: FormBuilder, public intentService: IntentService, private _activatedRoute: ActivatedRoute,
     private _router: Router,private trainingService:TrainingService, private coreService: UtilsService , public userService: UserService
     , private modalService: NgbModal) { }

  ngOnInit() {
    //this.bodyText = 'This text can be updated in modal 1';


    this.intentService.getIntents().then((s: any) => {
      this.intents = s;
    });

    this.userService.getAll().subscribe(data =>{
      this.TBtalk=data;
    });


    this.editForm = this.formBuilder.group({
      id: [],
      IntentName: ['', Validators.required],
      userTalk: ['', Validators.required],
      botTalk: ['', Validators.required]
    });
    
let id = this.user._id;
    this.userService.get(id)
    .subscribe( data => {
      this.editForm.setValue(data);
    });

  } 





  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate(['app-intents'])
        },
        error => {
          alert(error);
        });
  }



  deleteUser(user: User): void {
    console.log(user);
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.TBtalk = this.TBtalk.filter(u => u !== user);
      })
  };




  add() {
   
    // this._router.navigate(["/agent/default/create-intent"]) IntentComponent

    const modalRef: NgbModalRef = this.modalService.open(
      IntentComponent,
      {size: 'lg', windowClass: 'in'}
    );

    modalRef.componentInstance.input = 'Hello';
    modalRef.result.then(result => {
      console.log(result)
    })

  }

  edit(intent) {
    this._router.navigate(["/agent/default/edit-intent", intent._id.$oid])
  }

  // train(intent) {
  //   this._router.navigate(["/agent/default/train-intent", intent._id.$oid])
  // }

  delete(intent) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.intentService.delete_intent(intent._id.$oid).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

  // trainModels() {
  //   this.coreService.displayLoader(true);
  //   this.trainingService.trainModels().then((s: any) => {
  //     this.coreService.displayLoader(false);
  //   });
  // }
}
