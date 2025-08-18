import { useEffect } from "react";
import { axiosInstance } from "../axios/interceptor"
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from "../store/slices/connectionSlice";
import RequestConnectionCard from "../components/request-connection-card";

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((state) => state.connections)

    const getConnections = async () => {
        try {
            const response = await axiosInstance.get(`/user/connections`);
            dispatch(addConnections(response.data.data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getConnections()
    }, [])

    if (!connections) return;
    if (connections.length === 0) return <h2 className="text-center text-3xl font-semibold text-white">No Connections Found</h2>


    return (
        <div className="container sm:px-8 mx-auto w-full">
            <h2 className="text-center text-xl sm:text-3xl font-semibold text-white">Connections</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-center mt-10 gap-2">

                {
                    connections.map((connection) => {
                        return <RequestConnectionCard key={connection._id} profile={connection} />
                    })
                }
            </div>

        </div>
    )
}

export default Connections