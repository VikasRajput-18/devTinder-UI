import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/interceptor"
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from "../store/slices/requestSlice";
import { Button } from "../components/ui/button";
import { toast } from "react-hot-toast"
import RequestConnectionCard from "../components/request-connection-card";


const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((state) => state.requests)

    const [isLoading, setIsLoading] = useState(false)

    const reviewRequest = async (status, requestId) => {
        try {
            const response = await axiosInstance.post(`/api/request/review/${status}/${requestId}`);

            if (response.status === 200) {
                toast.success(response.data?.message);
                dispatch(removeRequests(requestId));
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error)
        }
    }

    const getRequests = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`/api/user/requests/received`);
            const requestUser = response?.data?.data?.map((req) => ({ ...req.senderId, connectionId: req._id }))
            dispatch(addRequests(requestUser))
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getRequests()
    }, [])

    if (!requests) return;
    if (requests.length === 0) return <h2 className="text-center text-3xl font-semibold text-white">No Requests Found</h2>




    return (
        <div className="container px-8 mx-auto w-full">
            <h2 className="text-center text-3xl font-semibold text-white">Requests</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-center mt-10 gap-2">
                {
                    requests.map((request) => {
                        return <RequestConnectionCard key={request._id} profile={request} isRequest={true} isLoading={isLoading} reviewRequest={reviewRequest} />
                    })
                }
            </div>

        </div>
    )
}

export default Requests