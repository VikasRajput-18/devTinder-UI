import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
    const user = useSelector((state) => state.user)
    console.log("user", user)
    return (
        <header className='py-4 bg-accent-foreground px-8 flex items-center justify-between'>
            <h2 className='text-white text-3xl font-bold'>👨‍💻Dev Tinder</h2>

            {
                user ? <div className='flex items-center gap-2'>
                    <div className='h-10 w-10 rounded-full bg-foreground p-0.5 border border-primary'>
                        <img src={user.photoUrl} alt={user.firstName} className='rounded-full object-cover w-full h-full' />
                    </div>
                    <p className='text-white font-semibold text-lg'>{user.firstName}</p>
                </div> : null
            }
        </header>
    )
}

export default Header