const jwt = require('jsonwebtoken');
const secret = 'ECommerceAPI';


module.exports.createAccessToken = (user) => {


    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };


    return jwt.sign(data,secret, {}); 
}



module.exports.verify = (req, res, next) => {

    console.log(req.headers.authorization);

    let token = req.headers.authorization;


    if(typeof token === 'undefined') {

        return res.send({ auth: 'Failed. No Token'});

    } else {

        console.log(token);

        token = token.slice(7, token.length);


        console.log(token);

        // verify() method to decrypt the token
        jwt.verify(token, secret, function(err, decodedToken){

            if(err) {

                return res.send({
                    auth: 'Failed',
                    message: err.message
                })
            } else {

                console.log('Result from verify method: ');
                console.log(decodedToken);
                

                req.user = decodedToken;

                next();


            }
        })
    }
}