import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './container/layout/layout.component';

import { IntentsComponent } from './components/intents/intents.component';
import { IntentComponent } from './components/intent/intent.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChatComponent } from './components/chat/chat.component';



const routes: Routes = [
  { path: '', redirectTo: 'agent/default', pathMatch: 'full' },
	{
		path: 'agent/default',
    component: LayoutComponent,
		// loadChildren: './components/agent.module#AgentModule' 
		children: [
			{
				path: 'intents',
				component: IntentsComponent
			},
			{
				path: 'create-intent', component: IntentComponent,
			},
			// {
			// 	resolve: {
			// 		story: IntentResolverService,
			// 	},
			// 	path: 'edit-intent/:intent_id', component: IntentComponent,
			// },
			{
				path: 'entities', component: EntitiesComponent,
			},
			// {
			// 	resolve: {
			// 		entity: EntityResolverService,
			// 	},
			// 	path: 'edit-entity/:entity_id', component: EntityComponent,
			// },
			{
				path: 'settings', component: SettingsComponent,
			},
			{
				path: 'chat', component: ChatComponent,
			}

		]
	},
	{
		path: '**',
		redirectTo: 'agent/default'
	}
];

@NgModule({
	declarations: [LayoutComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
