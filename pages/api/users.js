//placeholder

import {UseRouter} from "next/router";
import SQL from "mysql";
import Mail from "nodemailer";
const util = require('util')

const Handler = (req, res) => {
    res.end(util.inspect(req));
}

export default Handler;
