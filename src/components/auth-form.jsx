import { Link } from "react-router"
import LoginForm from './login-form'
import RegisterForm from './register-form'
import { Button } from './ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const AuthForm = ({ title, description, routeTo }) => {
    return (
        <Card className="w-full bg-accent-foreground max-w-md text-white border-primary" >
            <h2 className="text-center text-3xl font-bold">LinkUp 💖</h2>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}

                </CardDescription>
                <CardAction>
                    <Button variant="link">
                        <Link to={routeTo}>
                            {routeTo === "/sign-up" ? "Sign Up" : "Sign In"}</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {routeTo === "/sign-up" ? <LoginForm /> : <RegisterForm />}
            </CardContent>

        </Card>
    )
}

export default AuthForm