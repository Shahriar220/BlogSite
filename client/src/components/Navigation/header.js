import React,{useEffect,useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import SideDrawer from './sidenavigation'
import {showToast} from '../../utils/toast'
import { clearNotification } from '../../store/actions'
import {useSelector,useDispatch} from 'react-redux'
import {signOut} from '../../store/actions/users_action'
import { appLayout } from '../../store/actions/site_actions'

const Header = (props) => {

    const [layout,setLayout]=useState('')
    const notifications=useSelector(state=>state.notifications)
    const dispatch=useDispatch()
    const users=useSelector(state=>state.users)

    const signOutUser=()=>{
        dispatch(signOut())
        props.history.push('/')
    }

    useEffect(()=>{
        let pathArray=props.location.pathname.split('/')
        if(pathArray[1]==='dashboard'){
            setLayout('dash_layout')
            dispatch(appLayout('dash_layout'))
        }else{
            setLayout('')
            dispatch(appLayout(''))
        }
    },[dispatch,props.location.pathname])
    
    useEffect(() => {
        if(notifications&&notifications.error){
            const msg=notifications.msg?notifications.msg:"Error"
            showToast('ERROR',msg)
            dispatch(clearNotification())
        }
        if(notifications&&notifications.success){
            const msg=notifications.msg?notifications.msg:"Error"
            showToast('SUCCESS',msg)
            dispatch(clearNotification())
        }
    }, [notifications,dispatch])
    return (
        <>
            <nav className={`navbar fixed-top ${layout}`}>
                <Link to="/" style={{fontFamily:'Fredoka One'}}
                className="navbar-brand d-flex align-items-center"
                >
                    FlickBase
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser}/>
            </nav>   
        </>
    )
}

export default withRouter (Header)
