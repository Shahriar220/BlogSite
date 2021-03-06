import React,{useEffect,useState} from 'react'
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader';
import Home from './components/Home/Home'
import Header from './components/Navigation/header'
import MainLayout from './hoc/mainLayout';
import Loader from './utils/loader';
import Auth from './components/auth/index';
import Dashboard from './components/dashboard/index'
import Profile from './components/dashboard/profile';
import {useDispatch,useSelector} from 'react-redux'
import {isAuthUser} from './store/actions/users_action'
import Articles from './components/dashboard/articles';
import Article from './components/articles/index';
import check from './hoc/authGuard';
import AddArticle from './components/dashboard/articles/add';
import EditArticle from './components/dashboard/articles/edit';

const Routes=()=>{
  
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch();
  const users=useSelector(state=>state.users)

  useEffect(()=>{
    dispatch(isAuthUser())
  },[dispatch])
  
  useEffect(()=>{
    if(users.auth!==null){
      setLoading(false)
    }
  },[users])
  return(
    <BrowserRouter>
      <Header/>
      {loading ?<Loader/>:
        <MainLayout>
          <Switch>
            <Route path="/dashboard/articles/edit/:id" component={EditArticle}/>
            <Route path="/dashboard/articles/add" component={check(AddArticle,true)} />
            <Route path="/dashboard/articles" component={check(Articles,true)}/>
            <Route path="/dashboard/profile" component={check(Profile)}/>
            <Route path="/dashboard" component={check(Dashboard)}/>
            <Route path="/article/:id" component={Article}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/" component={Home} />
          </Switch>
        </MainLayout>}
        <GoogleFontLoader
        fonts={[
          {font:'Roboto',weights:[300,400,900]},
          {font:'Fredoka One'}
        ]}
        />
    </BrowserRouter>
  )
}
export default Routes