import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth' ,
    initialState :  {
        user : {} ,
        token : localStorage.getItem('ACCESS_TOKEN'),
    } ,
    reducers : {
        setUser(state,action) {
            state.user = action.payload;
        },
        setToken(state,action) {
            state.token = action.payload;
            if (action.payload){
                localStorage.setItem('ACCESS_TOKEN',action.payload);
            } else{
                localStorage.removeItem('ACCESS_TOKEN')
            }
        },
    }
});

export const authActions = authSlice.actions;
export default authSlice ;