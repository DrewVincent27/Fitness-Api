const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../../auth');




module.exports.registerUser = (req, res) => {

	let newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10), 
		mobileNo: req.body.mobileNo
	});

	if (!newUser.email.includes('@')){
            return res.status(400).send({error:'Email Invalid'});
    }

    else if (req.body.mobileNo.length !== 11){
        return res.status(400).send({error: 'Mobile number invalid'});
    }

    else if (req.body.password.length < 8) {
        return res.status(400).send({error: 'Password must be atleast 8 characters'});

    } else {
        return newUser.save().then(user => res.status(201).send({message: 'Registered Successfully'})).catch(saveErr => {
            
            console.error('Error in saving the user: ', saveErr);
            res.status(500).send({ error : 'Error in Save' });
        });
    }
};



module.exports.loginUser = (req, res) => {
    

    if(req.body.email.includes('@')) {

    return User.findOne({ email:req.body.email }).then(user => {


        if(user == null) {

            return res.status(404).send({error: 'No Email Found'});
        

        } else {
            console.log(user);


            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);


            if(isPasswordCorrect) {

                return res.status(200).send({access: auth.createAccessToken(user)})
            

            } else {

                return res.status(401).send({ error: 'Email and password do not match' });
            }
        }
    }).catch(findErr => {
        
        console.error('Error in finding the user: ', findErr);
        
        return res.status(500).send({error: 'Error in find'});

    });

        } else {
            return res.status(400).send({error: 'Invalid in Email'});
            }
        };