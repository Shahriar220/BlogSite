import {
    CLEAR_CURRENT,
    ADD_ARTICLE,
    UPDATE_STATUS,
    GET_ADMIN_ARTICLES,
    GET_ARTICLES,
    GET_ARTICLE,
    ERROR_GLOBAL,
    CLEAR_NOTIFICATION,
    SUCCESS_GLOBAL,
    AUTH_USER,
    SIGN_OUT,
    SITE_LAYOUT,
    REMOVE_ARTICLE
} from '../types'
///articles
export const getArticles=(articles)=>({
    type:GET_ARTICLES,
    payload:articles
})

export const getPaginateArticles=(articles)=>({
    type:GET_ADMIN_ARTICLES,
    payload:articles
})

export const articleStatus=(articles)=>({
    type:UPDATE_STATUS,
    payload:articles
})

export const addArticle=(article)=>({
    type:ADD_ARTICLE,
    payload:article
})

//////////notification/////////

export const errorGlobal=(msg)=>({
    type:ERROR_GLOBAL,
    payload:msg
})

export const successGlobal=(msg)=>({
    type:SUCCESS_GLOBAL,
    payload:msg
})

export const clearNotification=()=>{
    return (dispatch)=>{
        dispatch({
            type:CLEAR_NOTIFICATION
        })
    }
}
export const authUser=(user)=>({                                            
    type:AUTH_USER,
    payload:user
})

export const signOut=()=>({
    type:SIGN_OUT,
})

/////admin dashboard site///////
export const appLayout=(layout)=>({
    type:SITE_LAYOUT,
    payload:layout
})

export const getArticle=(article)=>(
    {
        type:GET_ARTICLE,
        payload:article
    }
)

export const clearCurrent=()=>({
    type:CLEAR_CURRENT
})

export const removeArticle=()=>({
    type:REMOVE_ARTICLE
})