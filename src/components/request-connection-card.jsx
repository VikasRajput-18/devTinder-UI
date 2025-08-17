import { Button } from './ui/button'

const RequestConnectionCard = ({ profile, isRequest, isLoading, reviewRequest }) => {
    return (
        <div key={profile._id} className="flex items-start gap-2 text-white bg-accent-foreground p-2 rounded-md hover:opacity-80 transition-all duration-200 ease-in-out">
            <div className="w-20 h-20 rounded-full overflow-hidden">
                <img src={profile.photoUrl} alt={profile.firstName} className="w-full h-full rounded-full object-cover bg-card-foreground" />
            </div>
            <div className="flex-1">
                <span className="font-bold text-lg">{profile.firstName}</span>
                <span className="font-bold text-lg pl-1">{profile.lastName}</span>

                {profile.age ? <p>Age : {profile.age}</p> : null}
                {
                    profile.gender ?
                        <p className="capitalize "><b>Gender :</b> {profile.gender}</p>
                        : null
                }
                {profile.bio ? <p className="line-clamp-2"><b>Bio :</b> {profile.bio}</p> : null}

                {
                    isRequest ?
                        <div className="flex items-center justify-end  w-full gap-x-2 my-2">
                            <Button disabled={isLoading} className="cursor-pointer" onClick={() => reviewRequest("rejected", profile.connectionId)} variant="destructive">Reject</Button>
                            <Button
                                disabled={isLoading}
                                onClick={() => reviewRequest("accepted", profile.connectionId)}
                                className="!bg-green-700 no-underline text-white cursor-pointer">Accept</Button>
                        </div> : null
                }

            </div>
        </div>
    )
}

export default RequestConnectionCard