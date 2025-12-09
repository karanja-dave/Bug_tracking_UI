import http from 'k6/http'
import { check, sleep } from "k6"


export const options = {
    vus: 3, //virtual users
    duration: "30s", 
}

export default () => {
    const url = "http://localhost:3000/login"
    const payload =JSON.stringify({
        // make sure this user exist 
       "email":"agnes@gmail.com",
       "password":"agnes@45"
    })

    const params={
        headers:{
            'Content-Type':'application/json',

        }
    }

    const res = http.post(url,payload,params)
    // console.log("RESPONSE:", res.body)

    check(res, {
        "is status 200": (r) => r.status === 200,
        "has token":(res)=>{
            return res.json('token') !==undefined
        }
    })
    sleep(1)
}