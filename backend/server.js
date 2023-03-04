require("./config/database").connect();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cors = require('cors')
const auth  = require('./middleware/auth.js')
const moment = require('moment');

const User = require("./models/user.js");
const Transaction = require("./models/transaction.js");

const app = express();
app.use(cors());
app.use(express.json())

app.post('/',auth, async (req, res) => {
    let username = req.body.username

    let user = await User.findOne({username: username });

    return res.status(200).json({message: 'Successfully.', user});
    
})

app.post('/login', async (req, res) => {
    try{

        let {username, password} = req.body

        if(!username || !password) {
            return res.status(200).json( { message: "Invalid Credentials"})
        }

        let user = await User.findOne({username: username });

        if(user) {
            if(bcrypt.compareSync(password, user.password)){
                checkUserAndGenerateToken(user, req, res);
            }
            else {
                return res.status(200).json({ message: 'Username or password is incorrect!' });
            }
        }

        else {
            return res.status(200).json({ message: 'Username or password is incorrect!' });            
        }
    }catch (e) {
        res.status(400).json( { message: e.message});
    }

})

app.post('/deposit', auth, async (req, res) => {
    try{
        let username = req.body.username
        let depositamount = parseFloat(req.body.depositamount);

        let user = await User.findOne({username: username });
        if(!depositamount) {
            return res.status(200).json({ message: 'Enter deposit amount' , user});
        }

        if(depositamount < 0) {
            return res.status(200).json({ message: 'Invalid deposit amount' });
        }

        await User.updateOne({ username: username }, { $set: { current_balance: user.current_balance + depositamount } })

        return res.status(200).json({ message: "Deposited Successfully" , state: "success"});

    }catch (e) {
        return res.status(400).json({ message: "Can't deposit" });
    }
});

app.post('/withdraw', auth, async (req, res) => {
    try{
        let username = req.body.username
        let withdrawamount = parseFloat(req.body.withdrawamount);

        let user = await User.findOne({username: username });

        if(!withdrawamount) {
            return res.status(200).json({ message: 'Enter withdraw amount', user});
        }

        if(withdrawamount < 0) {
            return res.status(200).json({ message: 'Invalid withdraw amount' });
        }


        if ( (user.current_balance - withdrawamount) >= 0){
            await User.updateOne({ username: username }, { $set: { current_balance: user.current_balance - withdrawamount } })

            return res.status(200).json({ message: "Withdrawed Successfully" , state: "success"});
        }
        else {
            return res.status(200).json({ message: 'Insufficient balance' });
        }

    }catch (e) {
        return res.status(400).json({ message: "Can't withdraw" });
    }
});

app.post('/transfer', auth,  async (req, res) => {
    try{
        let username = req.body.username
        let transferamount = parseFloat(req.body.transferamount);
        let phone = req.body.phone
        
        let user = await User.findOne({username: username });
        if(!transferamount || !phone) {
            return res.status(200).json({ message: 'Enter phone or transfer amount', user });
        }

        if(transferamount < 0) {
            return res.status(200).json({ message: 'Invalid transfer amount' });
        }

        let user2 = await User.findOne({phonenumber: phone });
        if (user.phonenumber === phone) {
            return res.status(200).json({ message: "Can't transfer to your own number" });
        }

        if (user2){
            if((user.current_balance - transferamount) >= 0 ){
                let current_balance_user = user.current_balance - transferamount
                let current_balance_user2 = user2.current_balance + transferamount
                await User.updateOne({ username: username }, { $set: { current_balance: current_balance_user } });
                await User.updateOne({ phonenumber: phone }, { $set: { current_balance: current_balance_user2 } });

                await Transaction.create({type: "Transfer", sender: username, receiver: `${user2.firstname} ${user2.lastname}`, amount: transferamount, remain: current_balance_user, date: moment(new Date()).format('LLLL')});
                await Transaction.create({type: "Receive", sender: `${user.firstname} ${user.lastname}`, receiver: user2.username, amount: transferamount, remain: current_balance_user2, date: moment(new Date()).format('LLLL')});
                return res.status(200).json({ message: "Transfered Successfully" , state: "success"});
            }
            else {
                return res.status(200).json({ message: 'Insufficient balance' });
            }
        }
        else {
            return res.status(200).json({ message: 'Invalid phone number' });
        }

    }catch (e) {
        return res.status(400).json({ message: "Can't transfer" });
    }
});

app.post('/transferhistory', auth, async (req, res) => {
    let username = req.body.username

    let user = await User.findOne({username: username });

    let alltransferhistory = await Transaction.find({sender: username}).sort({ _id: -1 });
    return res.status(200).json({alltransferhistory, user})
});

app.post('/receivehistory', auth, async (req, res) => {
    let username = req.body.username

    let user = await User.findOne({username: username });

    let allreceivehistory = await Transaction.find({receiver: username}).sort({ _id: -1 });
    return res.status(200).json({allreceivehistory, user})
});

function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.username, id: data._id }, 'paisansaeloe', { expiresIn: '1h' }, (err, token) => {

        if (err) {
            return res.status(400).json({ message: err });
        } 
        else {
            return res.json({ message: 'Login Successfully.', 'token': token, data});
        }
    });
}

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Sever running on port ${port}`)
})