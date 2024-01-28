import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name : 'ui' , 
    initialState :  {
        modalIsVisible : false ,
        sidebarIsVisible : false ,
        notification : null,
        theme : 'light'
    } ,
    reducers : {
        toggleModal(state) {
            state.modalIsVisible = !state.modalIsVisible
        },
        toggleSidebar(state) {
            state.sidebarIsVisible = !state.sidebarIsVisible
        },
        showNotification(state,action) {
            state.notification = {
                status  : action.payload.status , // error success pending ....
                title   : action.payload.title , 
                message : action.payload.message , 
            };
        },
        setTheme(state,action){
            state.theme = action.payload
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice ;