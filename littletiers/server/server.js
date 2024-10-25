
const express = require('express');
const path = require('path'); 
const app = express();
const low = require('lowdb'); 
const FileSync = require('lowdb/adapters/FileSync'); 
const cors = require("cors"); 


const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(express.json());
app.use(cors());


db.defaults({ accounts: [] }).write();


app.get('/accounts', (_req, res) => { 
    const data = db.get('accounts').value();
    res.status(200).send(data);
});

app.post('/accounts', (req, res) => {
    const data = db.get('accounts').push(req.body).write();
    console.log("Data posted!")
    res.status(200).send(data);
});

app.delete('/accounts/:id', (req, res) => {
    const userId =Number(req.params.id);
    const account = db.get("accounts").find({ id: userId }).value();
    
    if (!account) {
        return res.status(404).send({ message: 'Account not found' });
    }

    db.get("accounts").remove({ id: userId }).write();

    res.status(200).send({ message: 'Account deleted successfully' });
});



app.listen(3001, () => {
    console.log('Server started on port 3001');
});
