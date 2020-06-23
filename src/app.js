const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const request = require("request")

// express function
const app = express()
const port = process.env.PORT || 3000
const Directorypath = path.join(__dirname, "../public")


const viewsPath = path.join(__dirname, "../templates/views")

const partialsPath = path.join(__dirname, "../templates/partials") 
console.log(partialsPath);

// setting up app for hbs and views location
app.set("views" , viewsPath)
app.set("view engine", "hbs")
hbs.registerPartials(partialsPath)

// setting up static directory for use
app.use(express.static(Directorypath))


app.get('', (req,res) => {
    res.render("index",{
        name: "Amir Chappalwala",
        title: "Weather App"
    }) 
})

app.get('/about', (req,res) => {
    res.render("about",{
        name: "Amir Chappalwala",
        title: "About Us"
    })
})

app.get('/help', (req,res) => {
    res.render("help",{
        name: "Amir Chappalwala",
        title: "Help"
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
       return res.send({
           error: "You must provide an address"
       });
        
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude , (error, {temperature,overcast,feelslike, humidity} = {}) => {
            if(error){
                return res.send({error})     
            }
            res.send({
                Location: location,
                Temperature: temperature,
                Condition: overcast,
                FeelsLike: feelslike,
                address: req.query.address,
                Humidity : humidity
                
                })

            })
            
        })
})

app.get('/product' , (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "please provide a search query",
        })
    }

    console.log(req.query.search);
    res.send({
        product: "[]"
    })
    
})

app.get('/help/*',(req,res) => {
    res.render("404",{
        name: "Chappalwala Amir",
        title: "Error 404",
        errormessage: "Help Page not found"

    })
})

app.get('*',(req,res) => {
    res.render("404" ,{
        name: "Chappalwala Amir",
        title: "Error 404",
        errormessage: "Page not found"
    })
})





app.listen(port , () => {
    console.log("Server running on Port " + port);
    
})