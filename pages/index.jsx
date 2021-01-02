import { useRouter } from "next/router"
import { useEffect } from "react";


const Home = () => {
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("glc_token");
        const dat = router.query
        console.log(dat)
        if (dat.token) {
            fetch("api/users/verify", {method:"POST", body: JSON.stringify(
                {
                    email:dat.token,
                })
            }).then((data) => {
                return data.json()
            }).then((dat) => {
                console.log(dat)
            })
        } else if (!token) {
            //router.push("/login")
        }
    })
    return <h1 className="login-m1">Loading.... </h1>
}
export default Home;