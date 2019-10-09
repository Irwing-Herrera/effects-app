import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usuariosActions from '../actions';

import { of } from "rxjs";
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()

export class usuariosEffects {
    constructor(
        private actions$: Actions,
        public usuarioService: UsuarioService
    ) { }

    @Effect()
    cargarUsuarios$ = this.actions$.ofType(usuariosActions.CARGAR_USUARIOS)
        .pipe(
            // switchMap cancela / no retorna el observable y realiza otro observable
            switchMap(() => {
                return this.usuarioService.getUsers()
                    .pipe(
                        map(usuarios => new usuariosActions.CargarUsuariosSuccess(usuarios)),
                        catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
                    )
            })
        );
};