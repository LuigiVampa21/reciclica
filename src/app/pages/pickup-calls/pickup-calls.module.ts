import { PickupCallsPageRoutingModule } from './pickup-calls-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from './../../shared/shared.module';
import { PickupCallsPage } from './pickup-calls.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PickupCallsPageRoutingModule,
  ],
  declarations: [PickupCallsPage],
})
export class PickupCallsPageModule {}
