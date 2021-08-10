import * as users from './index'

import axios from 'axios'
import {getAuthHeader,removeTokenCookie,getTokenCookie} from '../../utils/toast'

axios.defaults.headers.post['Content-Type']='application/json'

export const registerUser=(values)=>{
    return async(dispatch)=>{
        try{
            const user=await axios.post(`/api/users/register`,{
                email:values.email,
                password:values.password
            })
            dispatch(users.authUser({data:user.data,auth:true}))
            dispatch(users.successGlobal('Successfull'))
        }catch(error){
            //console.log(error.response.data.message)                                 
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const loginUser=(values)=>{
    return async(dispatch)=>{
        try{
            const user=await axios.post(`/api/users/signin`,{
                email:values.email,
                password:values.password
            });
            dispatch(users.authUser({data:user.data,auth:true}))
            dispatch(users.successGlobal('Logged in'))
        }catch(error){
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const isAuthUser = () => {
    return async(dispatch) =>{
        try{
            if(!getTokenCookie()){
                throw new Error();
            }

            const user = await axios.get(`/api/users/isauth`,getAuthHeader());
            dispatch(users.authUser({data: user.data, auth: true }))
        } catch(error){
            dispatch(users.authUser({data: {}, auth: false }))
        }
    }
}
export const signOut=()=>{
    return async (dispatch)=>{
        removeTokenCookie()
        dispatch(users.signOut())
    }
}