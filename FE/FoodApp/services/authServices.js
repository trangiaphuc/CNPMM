import React from "react";
import axios from "axios";
export default axios.create({
    baseUrl: 'http://192.168.1.3:8080/api',
    headers: {
        'content-type': 'application/json',
    }
});
