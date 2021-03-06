import {useEffect, useState} from 'react'
import Loading from './components/Loading/Loading'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Login from './components/Login/Auth'
import Authorization from './components/Authorization/Authorization'
import Cabinet from './components/Cabinet/Cabinet'
import Trash from './components/Trash/Trash'
import Forward from './components/Forward/Forward'
import Books from './components/Books/Books'
import NotFound from './components/NotFound/NotFound'
import DunyoKitoblari from './components/WorldBooks/WorldBooks'
import Subclass from './components/Subclass/Subclass'
import Product from './components/WorldBooks/Product/Product'
import Sidebar from './components/Sidebar/Sidebar'
import MyOrders from './components/MyOrders/MyOrders'

function App() {
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    setTimeout(()=>setLoading(false),3000)
  },[]);
  return (
    <>
    {
      loading === false ?
      <div className="App"> 
      <Router>
      <Sidebar/>
      <Navbar/>
      
        <Switch>
          <Route exact path='/'>
            <Home/>
        </Route>
        <Route path='/login'>
            <Login/>
        </Route>
        <Route path="/register">
          <Authorization/>
        </Route>
        <Route path="/cabinet">
          <Cabinet/>
        </Route>
        <Route path="/korzina">
          <Trash/>
        </Route>
        <Route path="/forward">
          <Forward/>
        </Route>
        <Route exact path="/categories/:categoryID">
          <Books/>
        </Route>
        <Route exact path="/subcategories/:subcategoryID">
          <DunyoKitoblari/>
        </Route>
        <Route exact path="/subclass/:subclassID">
          <Subclass/>
        </Route>
        <Route exact path="/products/:productID">
          <Product/>
        </Route>
        <Route exact path="/myofor">
          <MyOrders/>
        </Route>
        <Route path="/*">
          <NotFound/>
        </Route>
        </Switch>
        <Footer/> 
      </Router>
    </div> : <Loading/>
    }

    </>
  );
}

export default App;
