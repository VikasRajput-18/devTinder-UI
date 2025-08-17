import { useEffect } from "react";
import { axiosInstance } from "../axios/interceptor"
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from "../store/slices/requestSlice";
import { Button } from "../components/ui/button";


const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((state) => state.requests)

    const getRequests = async () => {
        try {
            const response = await axiosInstance.get(`/api/user/requests/received`);
            const requestUser = response?.data?.data?.map((req) => req.senderId)
            dispatch(addRequests(requestUser))
        } catch (error) {
            console.error(error)
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center mt-10">

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
                                    <Button className="cursor-pointer" variant="destructive">Reject</Button>
                                    <Button className="!bg-green-700 no-underline text-white cursor-pointer">Accept</Button>
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