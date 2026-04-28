import React from 'react'
import {LogoutBtn,Logo, Container} from '../index.js'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'



function Header() {

  const authStatus = useSelector((state) => state?.auth?.status ?? false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container>
          <nav className="flex items-center py-3">
            <Link to="/" className="flex items-center gap-2">
              <Logo width="auto" />
            </Link>

            <ul className="ml-auto flex items-center gap-1">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition ${
                          pathname === item.slug
                            ? "bg-slate-900 text-white"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}

                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
            </ul>
          </nav>
        </Container>
    </header>
  )
}

export default Header
