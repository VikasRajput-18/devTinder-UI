import React, { useEffect } from 'react'
import Header from './header';
import { Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../axios/interceptor';
import { addUser } from '../store/slices/userSlice';


function Layout() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log("user", user)

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get(`/api/profile`)
            dispatch(addUser(response.data.user))

        } catch (error) {
            console.error(error)
            if (error.response.status === 401) {
                navigate("/sign-in")
            }
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <>
            <Header />
            <main className="">
                <Outlet /> {/* <- child routes will render here */}
            </main>
        </>
    );
}

export default Layout