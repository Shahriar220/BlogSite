import React,{useEffect} from 'react'
import {Link,withRouter} from 'react-router-dom'
import SideDrawer from './sidenavigation'
import {showToast} from '../../utils/toast'
import { clearNotification } from '../../store/actions'
import {useSelector,useDispatch} from 'react-redux'

const Header = (props) => {
    const notifications=useSelector(state=>state.notifications)
    const dispatch=useDispatch()
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
            <nav className="navbar fixed-top">
                <Link to="/" style={{fontFamily:'Fredoka One'}}
                className="navbar-brand d-flex align-items-center"
                >
                    FlickBase
                </Link>
                <SideDrawer/>
            </nav>   
        </>
    )
}

export default withRouter (Header)
