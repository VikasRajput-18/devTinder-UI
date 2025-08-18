import React, { useEffect } from 'react'
import Header from './header';
import { Outlet, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../axios/interceptor';
import { addUser } from '../store/slices/userSlice';


function Layout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get(`/profile`)
            dispatch(addUser(response.data.user))

        } catch (error) {
            console.error(error)
            if (error.response?.status === 401) {
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
            <main className="container mx-auto px-4 sm:px-0 py-12">
                <Outlet /> {/* <- child routes will render here */}
            </main>
        </>
    );
}

export default Layout