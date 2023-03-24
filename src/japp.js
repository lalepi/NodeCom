
const mongoose = require('mongoose'); //object modeler
const express = require('express');
const Customer = require('./models/customer'); //pointing to different .js file
const e = require('express');
mongoose.set('strictQuery', false);
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//to initialize .env file to use //with command NODE_ENV=production to run production phase variables
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); //here is included dotenv init
    
};

//these ones comes from .env file
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;


const customers = [
    {
        "name": "user1",
        "industry": "music"
    },
    {
        "name": "user2",
        "industry": "networking"
    },
    {
        "name": "user3",
        "industry": "machinevision"
    }];


const customer = new Customer({
    name: 'naame',
    industry: 'marketing'
});


app.get('/',(req, res) => {
    res.send("welcome");
});

//request method for getting info

app.get('/api/customers',async (req, res) => {
    try{
    const result = await Customer.find();
    res.json({"customers": result});

    }catch(e){
        res.status(500).json({error: e.message});
    }
});
//how to query only based on the ID, 2 ways no need to use both of them if one wants to use id= uery, it needs to be defined in the upper function app.get 
app.get('/api/customers/:id', async(req,res) => {
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try{
    const {id: customerId} = req.params; // pointing to req.params.Id and assinging it to customerId, this same deconstructor could be used for multiple parameters.
    console.log(customerId);
    const customer = await Customer.findById(customerId);
    console.log(customer);

    //check if customer is null or send the info
    if(!customer){
        res.status(404).json({error: 'User not found'});
    } else {
        res.json({customer});
    }
        //error handling
        } catch(e){

            res.status(500).json({error: 'something went wrong'})
        }
    
    });

//post for adding a resource, put to updating the resource

app.put('/api/customers/:id', async(req, res) => {
    const customerId = re.params.id;
    const result = await Customer.replaceOne({_id: customerId}, req.body);
    console.log(result);
    res.json({updatedCount: result.modifiedCount});

});





app.post('/api/customers',async (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
try{
    await customer.save();
    res.status(201).json({customer}); //waiting for the answer that the custmer is created
}catch(e){

    res.status(400).json({error: e.message});
}



});


//request method for posting info

//app.post('/', (req, res) => {
//    res.send('This is a POST request');
//});
//app

///////////////server start/////////////////////

const start = async() => {
    try{
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
            console.log('App listening on port ' + PORT);
        });
} catch(e){
    console.log(e.message)
}
};


//Run the db connection

start();