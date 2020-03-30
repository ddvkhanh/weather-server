const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kathy Dang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kathy Dang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help page!',
        name: 'Kathy Dang'
    })
})

app.get('/weather', (req, res) => {
    const address=req.query.address
    if (!address) {
        return res.send({
            error: "Must provide an address"
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: address
            })
        })
    })


    // res.send({
    //     forecast: weatherForecast.data, 
    //     address: address,
    //     location: weatherForecast.location
    // })
})

app.get('/products', (req,res)=>{
    if (!req.query.search) {
            return res.send({
                error: "must provide search"
            })
        
    }
    
    console.log(req.query)
    res.send({
        products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render( '404', {
            title: '404',
            name: 'Kathy Dang',
            errorMsg: 'Help article not found'
        })
    })

app.get('*', (req, res) => {
    res.render( '404', {
        title: '404',
        name: 'Kathy Dang',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) //starts the server and has it listen on a port


