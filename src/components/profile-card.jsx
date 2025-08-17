import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const ProfileCard = ({ profile, onClick, loading, exitDirection }) => {
    return (
        <motion.div
            key={profile._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
                exitDirection === "left"
                    ? { x: -200, y: 200, opacity: 0, scale: 0.8 } // left bottom
                    : exitDirection === "right"
                        ? { x: 200, y: 200, opacity: 0, scale: 0.8 } // right bottom
                        : {}
            }
            transition={{ duration: 0.4 }}
        >
            <Card className="bg-accent-foreground text-white border-neutral-600 shadow-2xl p-2 min-w-sm max-w-sm">
                <CardContent className="p-0">
                    <div className='group w-full '>
                        <div className='h-72 overflow-hidden rounded-md relative'>
                            {
                                profile.gender ?
                                    <p className="absolute text-white px-4 rounded-full right-2 top-2 capitalize bg-primary z-1">{profile.gender}</p>
                                    : null
                            }
                            <img src={profile?.photoUrl} alt={profile?.firstName}
                                className='w-full object-cover h-72 group-hover:scale-110 transition-all duration-200 ease-in-out rounded-md' />
                        </div>

                        <div className='mt-2'>
                            <div className="flex items-center justify-between">
                                <p className='font-semibold text-xl'>{profile?.firstName} {profile?.lastName}</p>
                                {profile.age ? <p>Age : {profile.age}</p> : null}
                            </div>
                        </div>
                        {profile.bio ? <p className='mt-2 line-clamp-2'>{profile.bio}</p> : null}
                    </div>
                </CardContent>
                <CardFooter className="p-0 pb-2">
                    <div className="flex items-center justify-end w-full gap-x-2">
                        <Button disabled={loading} onClick={() => onClick("ignored", profile._id)} variant="destructive" className="cursor-pointer">Ignore</Button>
                        <Button disabled={loading} variant="outline" onClick={() => onClick("interested", profile._id)} className="text-foreground cursor-pointer">Interested</Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default ProfileCard
