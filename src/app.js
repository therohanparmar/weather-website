const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()

// Define path for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.use(express.static(publicDirPath))
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.set('views', viewPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohan Parmar'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Rohan Parmar'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rohan Parmar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = { }) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rohan Parmar',
        errorMessage:'Help msg not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rohan Parmar',
        errorMessage:'Page not found'
    })
})

app.listen(8888, () => {
    console.log('Server is up on port 8888.')
})
