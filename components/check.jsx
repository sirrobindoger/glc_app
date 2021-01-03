import {useRouter} from "next/router"
import {useEffect} from "react"

const Check = ({redirect}) => {
    const router = useRouter()
    useEffect(() => {
        if (redirect) {
            router.prefetch(redirect)
        }
        router.prefetch("/login")
        const token = localStorage.getItem("glc_token")
        if (token) {
            fetch("api/users/check", {
                method: "POST",
                body: JSON.stringify({token: token})
            }).then((data) => {
                return data.json()
            }).then((data) => {
                if (!data.op) {
                    localStorage.removeItem("glc_token")
                    router.push("/login")
                } else {
                    if (redirect) {
                        router.push(redirect)
                    }
                }
            })
        } else { 
            router.push("/login")

        }
    })
    return null;
}
export default Check;