import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import { Login } from "../pages/Auth/Login"
// import Navbar from "./Navbar";


export const RenderRoutes = () => {
     const { user } = AuthData();
     const validPath = nav.map(i => i = i.path)
     const path = window.location.pathname
     return (
          <Routes>
               {user.isAuthenticated !== undefined ? (
                    validPath.includes(path) ? (
                         nav.map((r, i) => (
                              <Route key={i} path={r.path} element={r.element} />
                         ))
                    ) : window.location.href = "/")
                    : path === "/" ? <Route path="/" element={<Login />} /> : window.location.href = "/"
               }
          </Routes>
     )
}

export const RenderMenu = () => {

     const { user } = AuthData()
     return (
          <>
               {user.isAuthenticated !== undefined ?
                    (nav.map((r, i) => { return (<Link key={i} to={r.path}>{r.name}</Link>) })) :
                    ""}
          </>
     )
}