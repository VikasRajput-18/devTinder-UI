import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import { axiosInstance } from '../axios/interceptor'

const LoginForm = () => {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axiosInstance.post(`/api/sign-in`, loginFormData)

            toast.success(response.data.message)
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        vaue={loginFormData.email}
                        onChange={handleChange}
                        placeholder="m@example.com"
                        required disabled={isLoading}

                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password"
                        name="password"
                        vaue={loginFormData.password}
                        onChange={handleChange}
                        placeholder="******" required disabled={isLoading} />
                </div>
            </div>
            <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
            </Button>
        </form>
    )
}

export default LoginForm