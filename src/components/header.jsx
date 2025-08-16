import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { LogOut, UserRound } from 'lucide-react';

import { Link, useNavigate } from "react-router"
import toast from 'react-hot-toast';
import { axiosInstance } from '../axios/interceptor';
import { removeUser } from '../store/slices/userSlice';

const Header = () => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post(`/api/logout`);
            if (response.status === 200) {
                dispatch(removeUser())
                toast.success(response.data.message)
                navigate("/sign-in")
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    }

    return (
        <header className='py-4 bg-accent-foreground px-8 flex items-center justify-between'>
            <h2 className='text-white text-3xl font-bold'>
                <Link to={"/"}>👨‍💻Dev Tinder</Link>
            </h2>

            {
                user ?
                    <Popover>
                        <PopoverTrigger> <div className='flex items-center gap-2 cursor-pointer'>
                            <div className='h-10 w-10 rounded-full bg-foreground p-0.5 border border-primary'>
                                <img src={user.photoUrl} alt={user.firstName} className='rounded-full object-cover w-full h-full' />
                            </div>
                            <p className='text-white font-semibold text-lg'>{user.firstName}</p>
                        </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-40  bg-accent-foreground mr-5 border-primary flex flex-col p-0 overflow-hidden">
                            <Link to={"/profile"} className='flex items-center gap-1 text-white font-semibold hover:bg-foreground py-3 px-2'>
                                <UserRound />  Profile</Link>
                            <p aria-label='button' onClick={handleLogout} className='flex items-center gap-1 text-white font-semibold hover:bg-foreground py-3 px-2 cursor-pointer'>
                                <LogOut /> Logout</p>
                        </PopoverContent>
                    </Popover>
                    : null
            }
        </header>
    )
}

export default Header