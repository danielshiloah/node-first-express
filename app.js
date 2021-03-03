const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('603f9ebac60e9a3d58535c77')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => { console.log(err) });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const mongoPw = process.env.TESTING_MONGODBPW;
mongoose
.connect(`mongodb+srv://Daniel_shiloah:${mongoPw}@cluster0.86kjd.mongodb.net/shop?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Daniel',
                email: 'dan@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    console.log('connected!');
    app.listen(3000);
})
.catch(err => console.log('Server Error',err));
