const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
   });

const post = (path, postArgs, resFunc, errFunc) => {
    instance.post(path, postArgs)
    .then(res => {
        console.log("successfully logged in!\n" + JSON.stringify(res, null, 2));
        this.setState({
            sessionId: res.data.sessionId
        });
    })
    .catch( err => {
        console.log("Error!\n " + err);
        alert('Error in logging in');
    });
}


module.exports= {
    instance,
    post
}