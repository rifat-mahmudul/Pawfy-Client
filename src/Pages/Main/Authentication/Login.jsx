import LoginForm from "@/components/Authentication/LoginForm"
import HelmetTitle from "@/Shared/HelmetTitle"

const Login = () => {
    return (
        <section className="py-24">

            <HelmetTitle title="Login"></HelmetTitle>
            <LoginForm></LoginForm>

        </section>
    )
}

export default Login
