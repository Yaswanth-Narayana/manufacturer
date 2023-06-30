const express = require('express');
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://yaswanth:YaswanthNarayana@cluster0.dqul2.mongodb.net/assignment', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Create schema and model for Message
const messageSchema = new mongoose.Schema({
  orderID: { type: String, required: true },
  to: { type: String, required: true },
  from: { type: String, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  transporter: { type: String },
  price: { type: Number },
});
const Message = mongoose.model('Message', messageSchema);

const transportSchema = new mongoose.Schema({
  username: { type: String,required:true },
  password: { type: String,required:true },
});
const Transport = mongoose.model('Transport', transportSchema);

const manuSchema = new mongoose.Schema({
  username: { type: String,required:true },
  password: { type: String,required:true },
});
const Manufacturer = mongoose.model('Manufacturer', manuSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Transporter Registration
app.post('/reg/trans', (req,res) => {
  const newTransporter = new Transport({
    username : req.body.username,
    password : req.body.password,
  });
  newTransporter.save()
    .then(() => {
      console.log('hello')
      res.status(201).send('Message sent successfully');
    })
    .catch((err) => {
      console.error('Error saving message:', err);
      res.status(500).send('Internal Server Error');
    });
});

//Manufacturer Registration
app.post('/reg/manu', (req,res) => {
  const newManufacturer = new Manufacturer({
    username : req.body.username,
    password : req.body.password,
  });
  newManufacturer.save()
    .then(() => {
      console.log('hello')
      res.status(201).send('Message sent successfully');
    })
    .catch((err) => {
      console.error('Error saving message:', err);
      res.status(500).send('Internal Server Error');
    });
});

//Login Authentication transporter
app.post('/login/transporter',async (req,res) =>{
  const {username, password} = req.body;
  try{
    const user = await Transport.findOne({ 'username' : username , 'password' : password});
    if(user){
      res.status(200).json({ message : 'Login Successful'});
    } else {
      res.status(401).json({ message : 'Invalid username and password'});
    }
    console.log(user)
  } catch(error) {
    console.log(error);
    res.status(500).json({ message : 'An error occured'})
  }
});

//Login Authentication manufacturer
app.post('/login/manufacturer', async (req,res) =>{
  const { username, password } = req.body;
  console.log(username)
  try{
    // Find user in the database
    const user = await Manufacturer.findOne({'username':username,'password':password});

    if (user) {
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log(user)
  } catch (error) {
    // Error handling
    console.log(error)
    res.status(500).json({ message: 'An error occurred' });
  }
});

// API endpoint for submitting a message from Manufacturer to Transporter
app.post('/api/messages', (req, res) => {
  const newMessage = new Message({
    orderID: generateOrderID(),
    to: req.body.to,
    from: req.body.from,
    quantity: req.body.quantity,
    address: 'visakhapatnam',
    transporter: req.body.transporter,
  });
  newMessage.save()
    .then(() => {
        console.log('hello')
      res.status(201).send('Message sent successfully');
    })
    .catch((err) => {
      console.error('Error saving message:', err);
      res.status(500).send('Internal Server Error');
    });
});

// API endpoint for submitting a reply message from Transporter to Manufacturer
app.post('/api/messages/:id/reply', (req, res) => {
  const reply = {
    price: req.body.price,
  };

  Message.findByIdAndUpdate(req.params.id, reply)
    .then(() => {
      res.status(200).send('Reply sent successfully');
    })
    .catch((err) => {
      console.error('Error replying to message:', err);
      res.status(500).send('Internal Server Error');
    });
});

// API endpoint for fetching all messages
app.get('/api/messages', (req, res) => {
  Message.find()
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      console.error('Error retrieving messages:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper function to generate an alphanumeric order ID
const generateOrderID = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let orderID = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    orderID += chars[randomIndex];
  }
  return orderID;
};
