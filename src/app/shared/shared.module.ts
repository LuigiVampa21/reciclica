import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PickupCallCardComponent } from './components/pickup-call-card/pickup-call-card.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [
    PickupCallCardComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PickupCallCardComponent
  ]
})
export class SharedModule { }
