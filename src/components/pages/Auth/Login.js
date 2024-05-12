import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../auth/AuthWrapper"
import { Avatar, Typography, Button, TextField, Box, Container } from '@mui/material';
import {  toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


export const Login = () => {

     const navigate = useNavigate();
     const { login } = AuthData();

     useEffect(() => {
          const token = window.localStorage.getItem('token')
          if (token) navigate("/")
     }, [navigate])


     function validateEmail(email) {
          return /\S+@\S+\.\S+/.test(email);
     }
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const handleEmailChange = (event) => {
          setEmail(event.target.value.trim());
     };

     const handlePasswordChange = (event) => {
          setPassword(event.target.value.trim());
     };

     const handleSubmit = async (event) => {
         
          if (!email) return toast.error("Email required")
          if (!validateEmail(email)) return toast.error('Invalid Email')
          if (!password) return toast.error("Password required")
          await login(email, password)
     };



     return (
          <>

               <Container component="main" maxWidth="xs" sx={{ height: '400px', borderRadius: "10px", backgroundColor: "#e2e2e2" }}>
                    <Box
                         sx={{
                              marginTop: 8,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                         }}
                    >
                         <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                              <LockOutlinedIcon />
                         </Avatar>

                         <Typography component="h2" variant="h6">Sign in</Typography>
                         <Box  onSubmit={handleSubmit} sx={{ mt: 1, mx: 2 }} >
                              <TextField
                                   margin="normal"
                                   required={true}
                                   sx={{
                                        height: '100%',
                                        width: '100%',
                                        fontSize: '12px',
                                   }}
                                   fullWidth
                                   id="email"
                                   label="Email Address"
                                   name="email"
                                   value={email}
                                   onChange={handleEmailChange}
                              />
                              <TextField
                                   margin="normal"
                                   sx={{
                                        height: '100%',
                                        width: '100%',
                                        fontSize: '12px',
                                        marginBottom: "15px"
                                   }}
                                   required
                                   fullWidth
                                   name="password"
                                   label="Password"
                                   type="password"
                                   id="password"

                                   value={password}
                                   onChange={handlePasswordChange}
                              />
                              <Button
                                   type="submit"
                                   fullWidth
                                   variant="contained"
                                   onClick={handleSubmit}
                              >
                                   Sign In
                              </Button>
                         </Box>
                    </Box>
               </Container>
          </>
     )
}