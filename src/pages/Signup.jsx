import AuthForm from "../components/auth-form"

export default function Signup() {
  return (
    <section className="h-screen flex items-center justify-center px-4">
      <AuthForm title={"Register new account"} description={"Enter your details below to create your account"} routeTo={"/sign-in"} />
    </section>
  )
}
