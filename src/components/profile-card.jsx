
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ProfileCard = ({ profile }) => {
    return (
        <Card className="bg-accent-foreground  text-white border-neutral-600 shadow-2xl p-2 min-w-sm max-w-sm">
            <CardContent className="p-0">
                <div className='group w-full '>
                    <div className='h-72 overflow-hidden rounded-md relative'>
                        {
                            profile.gender ?
                                <p className="absolute  text-white px-4 rounded-full right-2 top-2 capitalize bg-primary z-1">{profile.gender}</p>
                                : null
                        }


                        <img src={profile?.photoUrl} alt={profile?.firstName} className='w-full object-cover h-72 group-hover:scale-110 transition-all duration-200 ease-in-out rounded-md' />
                    </div>

                    <div className='mt-2'>
                        <div className="flex items-center justify-between">
                            <p className='font-semibold text-xl'>{profile?.firstName} {profile?.lastName}</p>
                            {
                                profile.age ?
                                    <p>Age : {profile.age}</p> : null
                            }
                        </div>
                    </div>
                    {
                        profile.bio ?
                            <p className='mt-2 line-clamp-2'>{profile.bio}</p>
                            : null
                    }
                </div>

            </CardContent>
            <CardFooter className="p-0 pb-2">
                <div className="flex items-center justify-end  w-full gap-x-2">
                    <Button className="cursor-pointer" variant="destructive">Ignore</Button>
                    <Button variant="outline" className="text-foreground cursor-pointer">Interested</Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProfileCard