import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IntentsComponent} from './intents/intents.component'
import {IntentComponent} from './intent/intent.component';

import {SettingsComponent} from './settings/settings.component';
import {ChatComponent} from './chat/chat.component';
import {EntitiesComponent} from './entities/entities.component'
import {EntityComponent} from './entity/entity.component'
import {EntityResolverService} from '../services/entities.service'
import {IntentResolverService} from '../services/intent-resolver.service';
import { LayoutComponent } from '../container/layout/layout.component';

const routes: Routes = [
  {
    path: 'intents', component: IntentsComponent,
  }/* ,
  {
    path: 'create-intent', component: IntentComponent,
  },
  {
    resolve: {
			story: IntentResolverService,
		},
    path: 'edit-intent/:intent_id', component: IntentComponent,
  },
  {
    path: 'entities', component: EntitiesComponent,
  },
  {
    resolve: {
			entity: EntityResolverService,
		},
    path: 'edit-entity/:entity_id', component: EntityComponent,
  },
  {
    path: 'settings', component: SettingsComponent,
  },
  {
    path: 'chat', component: ChatComponent,
  } */
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
