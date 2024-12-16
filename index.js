const express = require('express'); 
const port = 1507;
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const { default: axios } = require('axios');

const app = express();

//=================== config middleware ================
app.use(morgan('combined'));
app.use(bodyParser())
const corsOptions = {
    credentials: true,
    origin: '*'
};
app.use(cors(corsOptions))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//=================== config route ======================
app.post("/webhook", async function(req, res){
    const transaction = req.body.data[0]
    await axios.post("https://api-btl-web-2024-1.vercel.app/transaction/confirm", 
        { 
            amount: transaction.amount,
            description: transaction.description.split(' ')[0]
        }
    )
    res.send("ok")
})

// ======================= run app ========================
app.listen(port, function(){
    console.log("App dang chay tren port " + port);
})