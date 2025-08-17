import { useEffect } from "react";
import { axiosInstance } from "../axios/interceptor"
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from "../store/slices/connectionSlice";

const Requests = () => {
    const dispatch = useDispatch()
    const connections = useSelector((state) => state.connections)

    const getConnections = async () => {
        try {
            const response = await axiosInstance.get(`/api/user/connections`);
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
        <div className="container px-8 mx-auto w-full">
            <h2 className="text-center text-3xl font-semibold text-white">Connections</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center mt-10">

                {
                    connections.map((connection) => {
                        return <div key={connection._id} className="flex items-start gap-2 text-white bg-accent-foreground p-2 rounded-md hover:opacity-80 transition-all duration-200 ease-in-out">
                            <div className="w-20 h-20 rounded-full overflow-hidden">
                                <img src={connection.photoUrl} alt={connection.firstName} className="w-full h-full rounded-full" />
                            </div>
                            <div className="flex-1">
                                <span className="font-bold text-lg">{connection.firstName}</span>
                                <span className="font-bold text-lg pl-1">{connection.lastName}</span>

                                {connection.age ? <p>Age : {connection.age}</p> : null}
                                {
                                    connection.gender ?
                                        <p className="capitalize "><b>Gender :</b> {connection.gender}</p>
                                        : null
                                }
                                {connection.bio ? <p className="line-clamp-2"><b>Bio :</b> {connection.bio}</p> : null}


                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Requests