import { useRouter } from "next/router"
import { useEffect } from "react";


const Home = () => {
    const router = useRouter();
    const signedIn = false;
    useEffect(() => {
        if (!signedIn) {
            router.push("/login")
        }
    }, [signedIn])
    return <h1 className="login-m1">Loading.... </h1>
}
export default Home;