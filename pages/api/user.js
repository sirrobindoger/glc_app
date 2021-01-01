//placeholder

import {UseRouter} from "next/router";
import SQL from "mysql";
import Mail from "nodemailer";
const util = require('util')

const Handler = (req, res) => {
    console.log(req.body)
    res.end("yeah")
}

export default Handler;
