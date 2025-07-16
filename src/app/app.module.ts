import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { NgxModule } from './material/ngx.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';

import { ClienteComponent } from './componentes/cliente/cliente.component';
import { ClienteFormComponent } from './componentes/cliente/cliente-form/cliente-form.component';

import { CotizadorComponent } from './componentes/cotizador/sistemas/cotizador.component';
import { TelasComponent } from './componentes/cotizador/telas/telas.component';

import { PedidoComponent } from './componentes/pedido/pedido.component';
import { PedidoFormComponent } from './componentes/pedido/pedido-form/pedido-form.component';

import { MedidasComponent } from './componentes/medidas/medidas.component';
import { MedidasFormComponent } from './componentes/medidas/medidas-form/medidas-form.component';

import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductosFormComponent } from './componentes/productos/productos-form/productos-form.component';

import { CortinasEspComponent } from './componentes/cortinas-esp/cortinas-esp.component';
import { CortinasEspFormComponent } from './componentes/cortinas-esp/cortinas-esp-form/cortinas-esp-form.component';

import { MarcaComponent } from './componentes/marca/marca.component';
import { MarcaFormComponent } from './componentes/marca/marca-form/marca-form.component';

import { TallerComponent } from './componentes/taller/taller.component';
import { TallerFormComponent } from './componentes/taller/taller-form/taller-form.component';
import { SistemaComponent } from './componentes/sistema/sistema.component';
import { SistemaFormComponent } from './componentes/sistema/sistema-form/sistema-form.component';
import { RangosComponent } from './componentes/rangos/rangos.component';
import { RangosFormComponent } from './componentes/rangos/rangos-form/rangos-form.component';


import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,

    InicioComponent,
    NavBarComponent,

    ClienteComponent,
    ClienteFormComponent,

    CortinasEspComponent,
    CortinasEspFormComponent,

    CotizadorComponent,
    TelasComponent,

    MarcaComponent,
    MarcaFormComponent,

    PedidoComponent,
    PedidoFormComponent,

    MedidasComponent,
    MedidasFormComponent,

    ProductosComponent,
    ProductosFormComponent,

    TallerComponent,
    TallerFormComponent,
    SistemaComponent,
    SistemaFormComponent,
    RangosComponent,
    RangosFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxModule,
    BrowserAnimationsModule,
    
   
  ],
  providers: [
     { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
