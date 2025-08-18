import AuthForm from "../components/auth-form"

export default function Login() {
  return (
    <section className="h-screen flex items-center justify-center px-4">
      <AuthForm title={"Login to your account"} description={"Enter your email below to login to your account"} routeTo={"/sign-up"} />
    </section>
  )
}
