import { createContext, useContext, useState } from "react"
import jwt_decode from "jwt-decode";
import { RenderRoutes } from "../components/structure/RenderNavigation";
import { Login } from '../utils/helper'
import { toast } from 'react-toastify'
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);



export const AuthWrapper = () => {
     let token = window.localStorage.getItem("token");
     if (token) token = jwt_decode(token)
     const [user, setUser] = useState({ name: token?.email, isAuthenticated: token?.isLogin })

     const login = async (userName, password) => {
          try {
               let loginResponse = await Login({ email: userName, password })
               if (loginResponse?.status === 200) {
                    const token = loginResponse?.data?.data?.token
                    if (token) {
                         setUser({ ...user, isAuthenticated: true })
                         window.localStorage.setItem('token', token.replaceAll("\"", ""))
                         toast.success(loginResponse?.data?.msg)
                         window.location.href = '/'
                    }
               }
               else {
                    let message = loginResponse?.data?.error || loginResponse?.data?.msg
                    if (message) return toast.error(message)
                    else return toast.error("Internal server error")
               }
          } catch (error) {
               console.log("error in login authWrapper", error)
               return toast.error("Something went wrong.")
          }


     }

     const logout = () => {
          window.localStorage.removeItem("token")
          setUser({ ...user, isAuthenticated: false })
          window.location.href = "/"
     }


     return (

          <AuthContext.Provider value={{ user, login, logout }}>
               <>
                    <RenderRoutes />
               </>

          </AuthContext.Provider>

     )

}