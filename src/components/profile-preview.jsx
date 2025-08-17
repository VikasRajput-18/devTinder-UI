import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"


const ProfilePreview = ({ profile }) => {
    return (
        <Card className="bg-accent-foreground  text-white border-neutral-600 shadow-2xl p-2 max-w-sm min-w-sm mt-10 mx-auto">
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

                    <div className='my-2'>
                        <div className="flex items-center justify-between">
                            <p className='font-semibold text-xl'>{profile?.firstName} {profile?.lastName}</p>
                            {
                                profile.age ?
                                    <p>Age : {profile.age}</p> : null
                            }
                        </div>
                        {
                            profile.bio ?
                                <p className='mt-2 line-clamp-2'>{profile.bio}</p>
                                : null
                        }
                    </div>
                </div>

            </CardContent>

        </Card>
    )
}

export default ProfilePreview