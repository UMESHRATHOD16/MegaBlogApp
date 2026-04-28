import { useState,useEffect } from 'react'
import './App.css'
import { Header, Footer } from './Components/index'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/Auth'
import { login, logout } from './Store/AuthSlice'
import { Outlet } from 'react-router-dom'

function App() {

  const[ loading , setLoading ] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login(userData))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  },[dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-50 text-slate-900">
      <div className='w-full block'>
        <Header/>
        <main className="py-8">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
