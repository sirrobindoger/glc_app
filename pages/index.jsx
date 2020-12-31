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
    return <p>Loading....</p>
}
export default Home;