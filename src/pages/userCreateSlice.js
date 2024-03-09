import { createSlice } from "@reduxjs/toolkit";

export const userCreateSlice = createSlice({

    // el nombre del pasillo con el que el store identificará este pasillo, 
    // y la información que contiene ese pasillo nada más abrir
    name: "userCreate",
    initialState: {
        data: {},
    },

    // los reducers no son más que funciones que reciben el estado actual y la modificación que queremos 
    // hacer sobre él como parámetros (state, action), y devuelve el nuevo estado con la modificación hecha.
    reducers: {
        createUser: (state, action) => {
            return {
                ...state,
                ...action.payload,
                
            }
        },
        
    }
})

export const { createUser } = userCreateSlice.actions;

// este const es el nombre de la sección del almacén a la que tendré que ir,
// const userRdxDetail = useSelector(userDetailId)
export const userCreateData = (state) => state.userCreate;
export default userCreateSlice.reducer;