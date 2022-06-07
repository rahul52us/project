import './App.scss';
import {Routes,Route} from 'react-router-dom';
import Sidebar from './layout/sidebar/Sidebar';
import Header from './layout/header/Header';
import projectRoutes from './routes/routes';
import { useEffect } from 'react';
import { ME_USER_ACTION } from './store/AuthStore/action';
import { useDispatch } from 'react-redux';
function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(ME_USER_ACTION())
  },[])


    return (
    <div className="App">          
    <div className='app-layout'>
      <Sidebar />
      <div className='app-layout-right'>
        <Header />
        <div className='app-right-component'>
      <Routes>       
        {
          projectRoutes.map((item,index)=>{
            return (
              <Route element={item.name} path={item.path} key={index} />
            )
          })
        } 
      </Routes>
      </div>
      </div>      
      </div>            
    </div>
  );
}

export default App;
