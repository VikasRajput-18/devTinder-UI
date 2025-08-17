// Home.jsx
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/interceptor'
import { useDispatch, useSelector } from "react-redux"
import { addFeed, removeUserFromFeed } from '../store/slices/feedSlice'
import { ProfileSkeleton } from '../components/profile-skeleton'
import ProfileCard from '../components/profile-card'
import toast from 'react-hot-toast'
import { AnimatePresence } from "framer-motion"

const Home = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.feed)
    const [isLoading, setIsLoading] = useState(false);
    const [connectionRequestLoading, setConnectionRequestLoading] = useState(false)
    const [exitDirection, setExitDirection] = useState(null)

    const sendConnectionRequest = async (status, receiverId) => {
        try {
            setConnectionRequestLoading(true)
            // set direction for animation
            setExitDirection(status === "ignored" ? "left" : "right")

            const response = await axiosInstance.post(`/api/request/send/${status}/${receiverId}`);

            if (response.status === 201) {
                toast.success(response.data?.message);
                setTimeout(() => {
                    dispatch(removeUserFromFeed(receiverId));
                    setExitDirection(null)
                }, 400); // wait for animation before removing
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error)
        } finally {
            setConnectionRequestLoading(false)
        }
    }

    const getFeed = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`/api/user/feed`)
            if (response.status === 200) {
                dispatch(addFeed(response.data?.users))
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
                <AnimatePresence mode="wait">
                    {
                        profiles?.slice(0, 1).map((profile) => {
                            return (
                                <ProfileCard
                                    key={profile?._id}
                                    profile={profile}
                                    onClick={sendConnectionRequest}
                                    loading={connectionRequestLoading}
                                    exitDirection={exitDirection}
                                />
                            )
                        })
                    }
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Home
