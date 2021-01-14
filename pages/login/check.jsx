import {useRouter} from "next/router"
import { useEffect } from "react"
import { useCookies } from 'react-cookie';

const Check = () => {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    useEffect(() => {
        const token = localStorage.getItem("glc_token")
        if (token) {
            fetch("../api/users/check", {
                method: "POST",
                body: JSON.stringify({token: token})
            }).then((data) => {
                return data.json()
            }).then((data) => {
                console.log(data)
                if (!data.op) {
                    localStorage.removeItem("glc_token")
                    router.push("/login")
                    console.log("pushing to login")
                } else {
                    console.log("REDIRECTING", new Date())
                    setCookie("glc_token", token)
                    console.log(token)
                    router.push("/")
                }
            })
        } else { 
            router.push("/login")
        }
    }) 
    


	return <h1>bruh</h1>;
	
}

export default Check;
