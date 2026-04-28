import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/Auth'
import { logout } from '../../Store/AuthSlice'

function LogoutBtn({ className = '' }) {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => dispatch(logout()))
    }
  return (
    <button
    onClick={logoutHandler}
    className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 ${className}`}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
