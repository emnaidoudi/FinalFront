import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
/* import { HttpClient } from '@angular/common/http'; */
/* import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; */

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


/* Material UI imports begins here */

/* Material UI imports ends here */


/* Project Components imports begins here */
import { UserService } from './user.service';
import {CommonsModule} from './commons/commons.module'


import { DashboardModule } from './container/dashboard.module';
//import { IntentsComponent } from './components/intents/intents.component';
import { IntentService } from './services/intent.service';
import { TrainingService } from './services/training.service';
//import { FlexLayoutModule } from '@angular/flex-layout';
/* Project Components imports ends here */
import { IntentsComponent } from './components/intents/intents.component';
import { IntentComponent   } from './components/intent/intent.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChatComponent     } from './components/chat/chat.component';
import { EntitiesService } from './services/entities.service';
import { AgentsService } from './services/agents.service';
import { ChatService } from './services/chat.service';



@NgModule({
  declarations: [
    AppComponent,
    IntentsComponent,
    IntentComponent,
    EntitiesComponent,
    SettingsComponent,
    ChatComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CommonsModule.forRoot(),
    DashboardModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    //FlexLayoutModule,
    /// BrowserAnimationsModule,
  ],
  entryComponents:[],
  providers: [UserService , IntentService, TrainingService, EntitiesService, AgentsService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }