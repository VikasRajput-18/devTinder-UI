import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/interceptor"
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from "../store/slices/requestSlice";
import { Button } from "../components/ui/button";
import { toast } from "react-hot-toast"


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
                        return <div key={request._id} className="flex items-start gap-2 text-white bg-accent-foreground p-2 rounded-md hover:opacity-80 transition-all duration-200 ease-in-out">
                            <div className="w-20 h-20 rounded-full overflow-hidden">
                                <img src={request.photoUrl} alt={request.firstName} className="w-full h-full rounded-full object-cover bg-card-foreground" />
                            </div>
                            <div className="flex-1">
                                <span className="font-bold text-lg">{request.firstName}</span>
                                <span className="font-bold text-lg pl-1">{request.lastName}</span>

                                {request.age ? <p>Age : {request.age}</p> : null}
                                {
                                    request.gender ?
                                        <p className="capitalize "><b>Gender :</b> {request.gender}</p>
                                        : null
                                }
                                {request.bio ? <p className="line-clamp-2"><b>Bio :</b> {request.bio}</p> : null}

                                <div className="flex items-center justify-end  w-full gap-x-2 my-2">
                                    <Button disabled={isLoading} className="cursor-pointer" onClick={() => reviewRequest("rejected", request.connectionId)} variant="destructive">Reject</Button>
                                    <Button
                                        disabled={isLoading}
                                        onClick={() => reviewRequest("accepted", request.connectionId)}
                                        className="!bg-green-700 no-underline text-white cursor-pointer">Accept</Button>
                                </div>

                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Requests