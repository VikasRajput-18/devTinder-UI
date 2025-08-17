import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { axiosInstance } from '../axios/interceptor'
import { useNavigate } from "react-router"
import toast from 'react-hot-toast'

const RegisterForm = () => {
    const navigate = useNavigate()
    const [signupFormData, setSignupFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setSignupFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axiosInstance.post(`/api/sign-up`, signupFormData)

            if (response.status === 201) {
                toast.success(response.data.message)
                navigate("/profile")

            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={signupFormData.firstName}
                        onChange={handleChange}
                        placeholder="Jhon"
                        required disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={signupFormData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={signupFormData.email}
                        placeholder="m@example.com"
                        required disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password"

                        >Password</Label>
                    </div>
                    <Input id="password" type="password"
                        placeholder="******"
                        onChange={handleChange}
                        name="password"
                        value={signupFormData.password} disabled={isLoading}
                        required />
                </div>
            </div>
            <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isLoading}>
                {isLoading ? "Loading..." : "Register"}
            </Button>
        </form>
    )
}

export default RegisterForm