import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IntentService } from '../../services/intent.service';
import { UtilsService } from '../../services/utils.service';
import { UserService } from '../../user.service';
import { User } from "../User";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";





//import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeValue, SafeHtml, SafeStyle, SafeScript} from '@angular/platform-browser';

@NgModule({ imports: [ CommonModule ] })

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.scss']
})
export class IntentComponent implements OnInit {

  intent: any;
  intentForm: FormGroup;
  intentFormFields: any;


  //------- smh--------------------
  contacts:Array<Contact>;
  speechs:Array<Speech>;

  TBtalk:User[];
  


  intentTypes;
  intentTypesArray;
  message;
  resJsonResponse: any;
 // downloadJsonHref: SafeUrl;
 user: User = new User();
 
  constructor(
    public fb: FormBuilder,
    public coreService: UtilsService,
    public intentService: IntentService,
    public userService: UserService,
    private activeModal: NgbActiveModal,
    private _activatedRoute: ActivatedRoute, private _router: Router,
   ) {



      this.intentTypes = IntentService.intentTypes;
      this.intentTypesArray = Object.keys(this.intentTypes);

      //---------------- new elements------------
      this.contacts=[];
      this.speechs=[];
      this.user.userTalk=[];
  }

  /*generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.resJsonResponse);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
} */

  deleteExample(name){
    this.contacts.splice(name,1)
  }
  deletespeech(talk){
    this.speechs.splice(talk,1)
  }

   
  addContact(name){ 
    let contact = new Contact(name); 
    console.log(contact);
    this.contacts.push(contact);
    console.log("============================",this.contacts);
    this.user.userTalk = this.contacts;
    console.log(this.user);
    // this.user.userTalk = null; 
  }

  addResponse(talk){ 
      let speech = new Speech(talk); 
      this.speechs.push(speech);
      this.user.botTalk = this.speechs;
      console.log(this.user);
      // this.user.botTalk = null; 
      console.log( JSON.stringify(this.user) );
    }


  loadForm(){
    this.intentFormFields = {
      id: [],
      IntentName: ['', Validators.required],
      userTalk: ['', Validators.required],
      botTalk: ['', Validators.required],
      _id: [''],
      name: [''],
      intentId: [''],
      userDefined: [true],
      speechResponse: [''],
      apiTrigger: [false],
      apiDetails: this.initApiDetails(),
      parameters: this.fb.array(
        this.intent && this.intent.parameters ? this.intent.parameters.map(n => {
          return this.initParameter(n);
        }) : []
      )
    };
    this.intentForm = this.fb.group(this.intentFormFields);
  }

  ngOnInit() {
    this.loadForm()

    this._activatedRoute.params.subscribe((params: Params) => {
      console.log("active agent reached " + params['intent_id'])
    });


    this._activatedRoute.data
      .subscribe((data:{story:any}) => {
        console.log("selected intent =>>")
        console.log(data.story)
        this.intent = data.story;
        this.loadForm();
        this.coreService.setDataForm(this.intentForm, this.intentFormFields, this.intent);
    });   


    this.userService.getAll().subscribe(data =>{
      this.TBtalk=data;
    });

  
  

  }


  createUser(user): void {
    this.activeModal.close(user)
    this.userService.createUser(this.user)
        .subscribe( data => {
          alert("intent created successfully.");
        });

  };



  addParameter() {
    const control = <FormArray>this.intentForm.controls['parameters'];
    control.push(this.initParameter());
  }
 intentText : String;
  initParameter(parameter = null) {
    const fields = {
      name: ['', Validators.required],
      type: ['', Validators.required],
      required: [false],
      prompt: [''],

    };
    //new variable--------------------------------
    
    //--------------------------------------------
    const g = this.fb.group(fields);
    if (parameter) {
      // setdataform
    }
    return g;
  }


  

  deleteParameter(i) {
    const control = <FormArray>this.intentForm.controls['parameters'];
    control.removeAt(i);
  }


  initApiDetails(parameter = null) {
    const fields = {
      isJson: [false],
      url: [''],
      headers: this.fb.array(
        this.intent && this.intent.apiTrigger ? this.intent.apiDetails.headers.map(n => {
        return this.initApiHeaders();
      }) : []),
      requestType: [''],
      jsonData: ['']
    };
    const g = this.fb.group(fields);
    if (parameter) {
      // setdataform
    }
    return g;
  }
  initApiHeaders() {
    const fields = {
      headerKey: ['', Validators.required],
      headerValue: ['', Validators.required],
    };
    const g = this.fb.group(fields);
    return g;
  }

  addHeader(){
    const header = <FormArray>this.intentForm.controls["apiDetails"]["controls"]["headers"];
    header.push(this.initApiHeaders());

  }
  deleteHeader(j) {
    const control = <FormArray>this.intentForm.controls["apiDetails"]["controls"]["headers"];
    control.removeAt(j);
  }
  save() {
    const form = this.intentForm.value;
    if (form._id && form._id.$oid) {
      form._id = form._id.$oid;
    }
    if (!this.apiTrigger()) {
      delete form.apiDetails;
    }

    this.intentService.saveIntent(form)
      .then(c => {
        this.message = 'Intent created!';
        this._router.navigate(["/agent/default/edit-intent", c["_id"]])
      })
  }

  apiTrigger() {
    return this.intentForm.value.apiTrigger;
  }

}


//------- new class--------------
export class Contact{ 
  name: string;  
  constructor(name){ 
    this.name = name; 
   
     }
         }
export class Speech{ 
  talk: string;  
  constructor(talk){ 
      this.talk = talk; 
      }
     }


