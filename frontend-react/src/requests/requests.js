const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
   });

const post = (path, args, resFunc, errFunc) => {
    instance.post(path, args)
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

const get = (path, args, ) => {
    instance.get(path, args)
    .then()
}


module.exports= {
    instance,
    post
}