import { useRouter } from "next/router"

import Check from "../components/check";


const Home = () => {
    return <Check redirect="/dashboard" />;   
}
export default Home;