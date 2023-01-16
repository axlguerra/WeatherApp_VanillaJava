const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser")




const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html")

   
    

})

app.post("/", function(req, res){





    const query =req.body.cityName
const apiKey= "undefined"
const unit = "metric"
const URL= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit

https.get(URL, function(response){
    console.log(response.statusCode)

    let weatherData="";

    response.on("data", function(data){
        weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const image= weatherData.weather[0].icon
        const urImage = `http://openweathermap.org/img/wn/${image}@2x.png`
        console.log(weatherData)
        console.log(temp)
        console.log(description)
        res.setHeader("Content-Type", "text/html")
        res.write("The weather description is: "+ description)
        res.write("<h1>The temperature in "+ query +" is "+ temp +" degrees Celsius</h1>")
        res.write("<img src="+urImage+">")

        res.send()
    })

})

    console.log("post recevied")
    console.log(req.body.cityName)

})





app.listen(3000, function(){
    console.log("SERVER RUNNING AT PORT 3000")
})