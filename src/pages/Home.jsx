import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/interceptor'
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from '../store/slices/feedSlice'
import { ProfileSkeleton } from '../components/profile-skeleton'
import ProfileCard from '../components/profile-card'

const Home = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.feed)
    const [isLoading, setIsLoading] = useState(false)

    const getFeed = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`/api/user/feed`)
            if (response.status === 200) {
                dispatch(addFeed(response.data))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <ProfileSkeleton />
            </div>
        )
    }


    return (
        <section>
            <div className="flex items-center justify-center">
                {
                    profiles?.users.slice(0, 1).map((profile) => {
                        return <ProfileCard key={profile?._id} profile={profile} />
                    })
                }
            </div>
        </section>
    )
}

export default Home