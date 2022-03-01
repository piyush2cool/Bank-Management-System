const bodyParser = require("body-parser");
const express=require("express");
const res = require("express/lib/response");
const { ClientRequest } = require("http");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const model=mongoose.model;
var ejs = require('ejs');
const jquery=require("jquery");

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/tbankform');
  }
  
const app = express();
const path=require("path");
 app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.Port || 7000;

const static_path=path.join(__dirname,"/public");
//  app.use(bodyParser.json());
app.use(express.json());
 
// app.use(bodyParser.urlencoded());

app.use(express.static(static_path));
app.get("/index.html", (req, res) => {
    res.send("hello");
});
const BankSchema = new Schema({
  Name:String,
  Balance:Number,
  Email:String
  
});
const Balance = model('Balance', BankSchema);

app.post('/CreateCustomer.html',(req,res)=>{
Balance1=new Balance(req.body);
 Balance1.save();console.log(req.body);
res.send("Item saved to data base")

})

app.post('/Transaction.html',(req,res)=>{
  Balance2=new Balance(req.body);

    Balance2.updateOne({"Name":req.body.FirstName},{$inc:{Balance:-req.body.Balance}});
    Balance2.updateOne({"Name":req.body.ToName},{$inc:{"Balance":req.body.Balance}});
    res.send("Transaction Complete");
    res.redirect('index.html');
})

app.set("view engine", "ejs");

app.get('/ViewAllCustomers',(req,res)=>{
  Balance3=new Balance(req.body);
    Balance3.find({}, '-_id -__v',(err, results)=>{
     
        
        
        res.render( path.join(__dirname, '/views'),'/ViewallCustomers.ejs',{clients:results.toObject()});
        });
      
});
app.listen(port, ()=>{
    console.log(`server is runnng at port no ${port}`)
});