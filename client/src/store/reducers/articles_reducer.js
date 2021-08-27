import {
    GET_ARTICLE,
    ADD_ARTICLE,
    GET_ARTICLES,
    CLEAR_CURRENT,
    UPDATE_STATUS,
    GET_ADMIN_ARTICLES
} from '../types'
export default function articleReducer(state={},action){
    switch(action.type){
        case GET_ARTICLES:
            return {...state,articles:action.payload}
        case GET_ARTICLE:
            return {...state,current:action.payload}
        case CLEAR_CURRENT:
            return{...state,current:''}
        case ADD_ARTICLE:
            return{...state,lastAdded:action.payload,success:true}
        case GET_ADMIN_ARTICLES:
            return {...state,adminArticles:action.payload}
        case UPDATE_STATUS:
            return {...state,
            adminArticles:{
                ...state.adminArticles,
                docs:action.payload
            }}
        default:
            return state
    }
}