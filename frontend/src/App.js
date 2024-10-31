import { useSelector } from 'react-redux';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';
import { Protected } from './features/auth/components/Protected';
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { ForgotPasswordPage, LoginPage, OtpVerificationPage, ResetPasswordPage, SignupPage } from './pages';
import { NotFoundPage } from './pages/NotFoundPage';


function App() {

  const isAuthChecked=useSelector(selectIsAuthChecked)
  const loggedInUser=useSelector(selectLoggedInUser)


  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);


  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
        <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>

        {
          loggedInUser?.isAdmin?(
            // admin routes
            <>
            {/* <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage/></Protected>}/>
            <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/> */}
            </>
          ):(
            // user routes
            <>
            {/* <Route path='/' element={<Protected><HomePage/></Protected>}/>
            <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
            <Route path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/> */}
            </>
          )
        }

        <Route path='*' element={<NotFoundPage/>} />

      </>
    )
  )

  
  return isAuthChecked ? <RouterProvider router={routes}/> : "";
}

export default App;
