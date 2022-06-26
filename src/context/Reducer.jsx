export const initialState = {
    user:null
}
const reducer = (state,action)=>{
    switch(action.type){
        case "SETUSER" :{
            return {
                ...state,
                user:action.user,
            }
        }
        default : return state;
    }
}
export default reducer;