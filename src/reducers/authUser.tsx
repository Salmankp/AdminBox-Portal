
const authUserReducer = (state={token: '' , data: '' , isAuthenticated:false} , action:any) => {
    const data:any = sessionStorage.getItem("User");
    const userData = JSON.parse(data);
    const token = localStorage.getItem("Token");
    
    switch(action.type){
        case 'LoggedIn':
            return state = {
                token: token ? token : '',
                data: userData ? userData: '',
                isAuthenticated: true
            }
        case 'LoggedOut':
            return state = {
                token: '',
                data: '',
                isAuthenticated: false
            }
        default:
            return state = {
                token: token ? token : '',
                data: userData ? userData: '',
                isAuthenticated: userData ? true : false
            }
     }
}

export default authUserReducer;