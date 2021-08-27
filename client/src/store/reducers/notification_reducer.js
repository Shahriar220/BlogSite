import {CLEAR_NOTIFICATION,REMOVE_ARTICLE, ERROR_GLOBAL,SUCCESS_GLOBAL} from '../types'

export default function notificationReducer(state={},action){
    switch(action.type){
        case ERROR_GLOBAL:
            return {...state,error:true,msg:action.payload}
        case SUCCESS_GLOBAL:
            return {...state,success:true,msg:action.payload}
        case CLEAR_NOTIFICATION:
            return{}
        case REMOVE_ARTICLE:
            return {...state,removeArticle:true}
        default:
            return state
    }
}