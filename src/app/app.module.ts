import { NgModule } from '@angular/core';
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

import { PresupuestoComponent } from './componentes/presupuesto/presupuesto.component';
import { PresupuestoFormComponent } from './componentes/presupuesto/presupuesto-form/presupuesto-form.component';

import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductosFormComponent } from './componentes/productos/productos-form/productos-form.component';

import { CortinasEspComponent } from './componentes/cortinas-esp/cortinas-esp.component';
import { CortinasEspFormComponent } from './componentes/cortinas-esp/cortinas-esp-form/cortinas-esp-form.component';

import { MarcaComponent } from './componentes/marca/marca.component';
import { MarcaFormComponent } from './componentes/marca/marca-form/marca-form.component';

import { TallerComponent } from './componentes/taller/taller.component';
import { TallerFormComponent } from './componentes/taller/taller-form/taller-form.component';



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

    PresupuestoComponent,
    PresupuestoFormComponent,

    ProductosComponent,
    ProductosFormComponent,

    TallerComponent,
    TallerFormComponent,
    
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
