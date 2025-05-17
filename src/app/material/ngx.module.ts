import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [],
    exports: [
        TooltipModule,
        ModalModule,
        ToastrModule,
        CollapseModule,
        BsDropdownModule
    ],
    imports: [
        CommonModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),

    ]
})
export class NgxModule { }
