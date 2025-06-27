import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [],
  exports: [
    MatBadgeModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatMenuModule

  ],
  imports: [
    CommonModule

  ]
})
export class MaterialModule { }
