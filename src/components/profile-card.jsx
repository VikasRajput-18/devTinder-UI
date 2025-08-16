
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ProfileCard = ({ firstName, lastName, photoUrl, _id }) => {
    console.log(firstName, lastName, photoUrl, _id)
    return (
        <Card className="bg-accent-foreground  text-white border-neutral-600 shadow-2xl p-2 min-w-sm">
            <CardContent className="p-0">
                <div className='group w-full '>
                    <div className='h-72 overflow-hidden rounded-md  '>
                        <img src={photoUrl} alt={firstName} className='w-full object-cover h-72 group-hover:scale-110 transition-all duration-200 ease-in-out rounded-md' />

                    </div>

                    <div className='mt-2'>
                        <p className='font-semibold text-xl'>{firstName} {lastName}</p>
                    </div>
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