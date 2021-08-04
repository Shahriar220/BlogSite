import { toast } from "react-toastify";

export const showToast=(type,msg)=>{
    // eslint-disable-next-line default-case
    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        break;
        case 'ERROR':
            toast.error(msg,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        break;
        default:
            return false
    }
}