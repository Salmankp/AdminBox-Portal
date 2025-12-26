
const toasterReducer = (state={isOpen: false, type: '', msg: ''} , action:any) => {

    
    switch(action.type){
        case 'setToaster':
            return state = {
                isOpen: action.data.isOpen,
                type: action.data.type,
                msg: action.data.msg
            }
        case 'unsetToaster':
            return state = {
                isOpen: false,
                type: '',
                msg: ''
            }
        default:
            return state = {
                isOpen: false,
                type: '',
                msg: ''
            }
     }
}

export default toasterReducer;