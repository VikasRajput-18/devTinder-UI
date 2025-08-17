import React, { useEffect, useState } from 'react'
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import ProfilePreview from './profile-preview';
import toast from 'react-hot-toast';
import { axiosInstance } from '../axios/interceptor';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/userSlice';

const EditProfile = ({ user }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [profileFormData, setProfileFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        photoUrl: user?.photoUrl || "",
        bio: user?.bio || "",
        gender: user?.gender || "",
        age: user?.age || "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await axiosInstance.patch(`/api/profile/edit`, profileFormData);
            if (response.status === 200) {
                toast.success(response.data.message)
                dispatch(addUser(response.data.user))

            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setProfileFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            photoUrl: user?.photoUrl || "",
            bio: user?.bio || "",
            gender: user?.gender || "",
            age: user?.age || "",
        })
    }, [user])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-4 justify-center px-8'>
            <form className="" onSubmit={handleSubmit} autoComplete='off'>
                <div className="flex flex-col gap-6">
                    <h2 className="w-full text-center text-3xl font-semibold text-white mb-4">🙎‍♂️ Update Profile</h2>
                    <div className="grid gap-2 text-white">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={profileFormData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                            disabled={isLoading}
                            autoComplete="off"

                        />
                    </div>

                    <div className="grid gap-2 text-white">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={profileFormData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required disabled={isLoading}
                            autoComplete="off"
                        />
                    </div>
                    <div className="grid gap-2 text-white">
                        <Label htmlFor="photoUrl">Profile URL</Label>
                        <Input
                            id="photoUrl"
                            type="text"
                            name="photoUrl"
                            value={profileFormData.photoUrl}
                            onChange={handleChange}
                            placeholder="https://profile-picture.com"
                            required disabled={isLoading}
                            autoComplete="off"
                        />
                    </div>

                    <div className="grid gap-2 text-white">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            name="age"
                            value={profileFormData.age}
                            onChange={handleChange}
                            placeholder="26"
                            autoComplete="off" disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2 text-white">
                        <Label htmlFor="Bio">Bio</Label>
                        <Textarea name="bio" value={profileFormData.bio} onChange={handleChange} placeholder="Tell others about yourself..." disabled={isLoading} />
                    </div>

                    <div className="grid gap-2 text-white">
                        <Label htmlFor="age">Gender</Label>
                        <select name='gender' value={profileFormData.gender} onChange={handleChange} className="border  py-2 rounded-md bg-card-foreground px-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]" disabled={isLoading}>
                            <option value={""} disabled >Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                            <option value={"other"}>Other</option>
                        </select>

                    </div>
                </div>
                <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                </Button>
            </form>


            <ProfilePreview profile={profileFormData} />
        </div>
    )
}

export default EditProfile