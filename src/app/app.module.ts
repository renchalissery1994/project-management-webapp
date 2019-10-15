import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { ContractorComponent } from './contractor/contractor.component';
import { FullTimeDeveloperComponent } from './full-time-developer/full-time-developer.component';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from './app.service';
import { ProjectManagerService } from './project-manager/project-manager.service';
import { ContractorService } from './contractor/contractor.service';
import { FullTimeDeveloperService } from './full-time-developer/full-time-developer.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AddSkillComponent } from './dialog/add-skill.component';
import { MatSelectModule } from '@angular/material/select';
import { AddRateComponent } from './dialog/add-rate-dialog';
import { AddBlockedWeekComponent } from './dialog/add-blocked-week-dialog';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    ProjectManagerComponent,
    ContractorComponent,
    FullTimeDeveloperComponent,
    AddSkillComponent,
    AddRateComponent,
    AddBlockedWeekComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    AppService,
    ProjectManagerService,
    ContractorService,
    FullTimeDeveloperService],
  entryComponents: [AddSkillComponent, AddRateComponent, AddBlockedWeekComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
