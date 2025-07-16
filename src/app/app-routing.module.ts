import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { ClienteFormComponent } from './componentes/cliente/cliente-form/cliente-form.component';
import { CotizadorComponent } from './componentes/cotizador/sistemas/cotizador.component';
import { TelasComponent } from './componentes/cotizador/telas/telas.component';
import { PedidoComponent } from './componentes/pedido/pedido.component';
import { PedidoFormComponent } from './componentes/pedido/pedido-form/pedido-form.component';
import { MedidasComponent } from './componentes/medidas/medidas.component';
import { MedidasFormComponent } from './componentes/medidas/medidas-form/medidas-form.component';
import { CortinasEspComponent } from './componentes/cortinas-esp/cortinas-esp.component';
import { CortinasEspFormComponent } from './componentes/cortinas-esp/cortinas-esp-form/cortinas-esp-form.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductosFormComponent } from './componentes/productos/productos-form/productos-form.component';
import { MarcaComponent } from './componentes/marca/marca.component';
import { TallerComponent } from './componentes/taller/taller.component';
import { TallerFormComponent } from './componentes/taller/taller-form/taller-form.component';
import { MarcaFormComponent } from './componentes/marca/marca-form/marca-form.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { SistemaComponent } from './componentes/sistema/sistema.component';
import { SistemaFormComponent } from './componentes/sistema/sistema-form/sistema-form.component';
import { RangosComponent } from './componentes/rangos/rangos.component';
import { RangosFormComponent } from './componentes/rangos/rangos-form/rangos-form.component';

const routes: Routes = [
  { path: 'cliente/lista', component: ClienteComponent },
  { path: 'cliente/editar/:id', component: ClienteFormComponent },
  { path: 'cliente/nuevo', component: ClienteFormComponent },

  { path: 'cortespeciales/lista', component: CortinasEspComponent },
  { path: 'cortespeciales/editar', component: CortinasEspFormComponent },

  { path: 'cotizar/sistemas', component: CotizadorComponent },
  { path: 'cotizar/telas', component: TelasComponent },

  { path: 'marca/lista', component: MarcaComponent },
  { path: 'marca/editar/:id', component: MarcaFormComponent },
  { path: 'marca/nuevo', component: MarcaFormComponent },

  { path: 'pedido/lista', component: PedidoComponent },
  { path: 'pedido/editar/:id', component: PedidoFormComponent },
  { path: 'pedido/nuevo', component: PedidoFormComponent },

  { path: 'medidas/lista', component: MedidasComponent },
  { path: 'medidas/editar/:id', component: MedidasFormComponent },
  { path: 'medidas/nuevo', component: MedidasFormComponent },

  { path: 'productos/lista', component: ProductosComponent },
  { path: 'productos/editar', component: ProductosFormComponent },

  { path: 'taller/lista', component: TallerComponent },
  { path: 'taller/editar/:id', component: TallerFormComponent },
  { path: 'taller/nuevo', component: TallerFormComponent },

  { path: 'sistemas/lista', component: SistemaComponent },
  { path: 'sistemas/editar/:id', component: SistemaFormComponent },
  { path: 'sistemas/nuevo', component: SistemaFormComponent },

  { path: 'rangos/lista', component: RangosComponent },
  { path: 'rangos/editar/:id', component: RangosFormComponent },
  { path: 'rangos/nuevo', component: RangosFormComponent },

  { path: '', component: InicioComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
