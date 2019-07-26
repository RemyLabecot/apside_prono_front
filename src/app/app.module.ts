import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './site/home/home.module';
import { PronosticsModule } from './site/pronostics/pronostics.module';
import { ResultatsModule } from './site/resultats/resultats.module';
import { AdminModule } from './site/admin/admin.module';
import { ErrorsModule } from './site/errors/errors.module';
import { SharedModule } from './site/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './site/material/material.module';
import { LoginModule } from './site/login/login.module';

import { CustomMaterialModule } from './site/custom-material/custom-material.module';
import {MatDialogModule} from '@angular/material/dialog';

import { LOCALE_ID } from '@angular/core';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { PlayerModule } from './site/player/player.module';
import { PlayerService } from './services/player/player.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventModule } from './site/event/event.module';
import { EventService } from './services/event/event.service';
import { ContestModule } from './site/contest/contest.module';

registerLocaleData(fr);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    LoginModule,
    SharedModule,
    MatDialogModule,
    HomeModule,
    PronosticsModule,
    ResultatsModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    PlayerModule,
    EventModule,
    ContestModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ErrorsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "fr-CA"}, PlayerService, EventService],
  bootstrap: [AppComponent]
})

export class AppModule { }
