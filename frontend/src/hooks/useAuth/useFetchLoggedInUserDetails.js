import { useEffect } from 'react'
import { selectLoggedInUser } from '../../features/auth/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserByIdAsync } from '../../features/user/UserSlice'

export const useFetchLoggedInUserDetails = (deps) => {
    
    const loggedInUser=useSelector(selectLoggedInUser)
    const dispatch = useDispatch();

    useEffect(()=>{
        /* when a user is logged in then this dispatches an action to get all the details of loggedInUser, 
        as while login and signup only the bare-minimum information is sent by the server */
        if(deps && loggedInUser?.isVerified){
          dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id))
          
          if(!loggedInUser.isAdmin){
            // dispatch(fetchCartByUserIdAsync(loggedInUser?._id))
          }
        }
    },[deps])
}
