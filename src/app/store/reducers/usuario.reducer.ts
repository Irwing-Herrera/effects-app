import * as fromUsuario from "../actions";
import { Usuario } from 'src/app/models/usuario.model';

export interface UsuarioState {
    usuario: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
};

const estadoInicial: UsuarioState = {
    usuario: null,
    loaded: false,
    loading: false,
    error: null
};

export function usuarioReducer(state = estadoInicial, action: fromUsuario.usuarioAcciones): UsuarioState {

    switch (action.type) {

        case fromUsuario.CARGAR_USUARIO:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromUsuario.CARGAR_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                usuario: {...action.usuario}
            };

        case fromUsuario.CARGAR_USUARIO_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };

        default:
            return state;
    }
};