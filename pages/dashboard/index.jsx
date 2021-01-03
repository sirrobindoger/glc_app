import React from "react"


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pwd: ""
        }
    }

    componentDidMount() {
        console.log(location)
        this.setState({pwd: localStorage.getItem("glc_token") || "FAILURE"})
    }

    render() {
        return (
            <h1>Logged in...{this.state.pwd}</h1>
        )
    }
}

export default Dashboard;