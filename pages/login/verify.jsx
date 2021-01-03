import {useEffect} from "react"
import {useRouter} from "next/router";


const Verify = () => {
    const router = useRouter();
    useEffect(() => {
        if (dat.token) {
            const token = localStorage.getItem("glc_token");
            const dat = router.query
            console.log("token exists")
            fetch("api/users/verify", {method:"POST", body: JSON.stringify(
                {
                    token:dat.token,
                })
            }).then((data) => {
                return data.json()
            }).then((dat) => {
                if (dat.op) {
                    localStorage.setItem("glc_token", dat.dat)
                    console.log(dat, typeof(dat.dat))
                    router.push("/dashboard")
                }
            })
        } else {
            router.push("/login")
        }
    })
    return null;
}
export default Verify;