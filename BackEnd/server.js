const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/test-toro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use('/api/test', testRoutes);
app.use('/api/users', userRoutes);
