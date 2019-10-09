import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usuarioActions from '../actions';

import { of } from "rxjs";
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()

export class usuarioEffects {
    constructor(
        private actions$: Actions,
        public usuarioService: UsuarioService
    ) { }

    @Effect()
    cargarUsuario$ = this.actions$.ofType(usuarioActions.CARGAR_USUARIO)
        .pipe(
            // switchMap cancela / no retorna el observable y realiza otro observable
            switchMap((action: usuarioActions.CargarUsuario) => {
                return this.usuarioService.getUserById(action.id)
                    .pipe(
                        map(usuario => new usuarioActions.CargarUsuarioSuccess(usuario)),
                        catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
                    )
            })
        );
};