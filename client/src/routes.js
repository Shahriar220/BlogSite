import React from 'react'
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader';
import Home from './components/Home/Home'
import Header from './components/Navigation/header'
import MainLayout from './hoc/mainLayout';
import Auth from './components/auth/index';
const Routes=()=>{

  return(
    <BrowserRouter>
      <Header/>
        <MainLayout>
          <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/" component={Home} />
          </Switch>
        </MainLayout>
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