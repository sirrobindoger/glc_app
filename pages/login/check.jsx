import {useRouter} from "next/router"
import { useEffect } from "react"
import { setCookie } from 'nookies'

const Check = () => {
    const router = useRouter()
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
                    setCookie({}, "glc_token", token, {
						path: "/",
						maxAge: 30 * 24 * 60 * 60
					})
                    console.log(token)
                    router.push("/")
                }
            })
        } else { 
            router.push("/login")
        }
    }) 
    


	return null;
	
}

export default Check;
