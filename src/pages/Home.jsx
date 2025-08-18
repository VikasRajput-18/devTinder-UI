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

    // pagination state
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const limit = 10

    const sendConnectionRequest = async (status, receiverId) => {
        try {
            setConnectionRequestLoading(true)
            // set direction for animation
            setExitDirection(status === "ignored" ? "left" : "right")

            const response = await axiosInstance.post(`/request/send/${status}/${receiverId}`);

            if (response.status === 201) {
                toast.success(response.data?.message);
                setTimeout(() => {
                    dispatch(removeUserFromFeed(receiverId))
                    setExitDirection(null)

                    // 👇 when last profile removed, load next page
                    if (profiles?.length === 1 && page < totalPages) {
                        setPage(prev => prev + 1)
                    }
                }, 400)
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error)
        } finally {
            setConnectionRequestLoading(false)
        }
    }

    const getFeed = async (currentPage = 1) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`/user/feed`, {
                params: { page: currentPage, limit }
            })

            if (response.status === 200) {
                const { users, page, totalPages } = response.data
                dispatch(addFeed(users))
                setPage(page)
                setTotalPages(totalPages)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getFeed(1) // initial fetch
    }, [])

    useEffect(() => {
        if (page > 1) {
            getFeed(page)
        }
    }, [page])

    if (isLoading && profiles?.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <ProfileSkeleton />
            </div>
        )
    }
    if (profiles?.length === 0 && !isLoading) {
        return <h2 className="text-center text-3xl font-semibold text-white">No Profile Found</h2>
    }

    return (
        <section>
            <div className="flex items-center justify-center">
                {
                    profiles?.length > 0 ?
                        <AnimatePresence mode="wait">

                            <ProfileCard
                                key={profiles?.[0]?._id}
                                profile={profiles?.[0]}
                                onClick={sendConnectionRequest}
                                loading={connectionRequestLoading}
                                exitDirection={exitDirection}
                            />
                        </AnimatePresence> : null
                }
            </div>
        </section>
    )
}

export default Home
