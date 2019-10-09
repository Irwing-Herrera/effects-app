import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

import * as usuariosActions from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean;
  error: any;

  usuariosSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new usuariosActions.CargarUsuarios());
    this.usuariosSubscription = this.store.select('usuarios').subscribe(users => {
      this.usuarios = users.usuarios;
      this.loading = users.loading;
      this.error = users.error;
    });
  }

  ngOnDestroy() {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }
  }

}
