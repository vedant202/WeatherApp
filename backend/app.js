import express from "express"
import path from 'path'
import { fetchWeatherData } from "./weatherData.js";
import cors from "cors"
const app = express()
const port = 3000;


app.use(express.static(path.resolve('../frontend/public')))
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    // console.log(__dirname)
    
    res.sendFile(path.resolve('../frontend/home.html'))
})

app.get('/weatherData',async(req,res)=>{
    console.log("weather data is heated")
    let city = "yavatmal"
    
    const weather = await fetchWeatherData(city);
    
    // console.log(weather)
    
    res.json({"weather":weather});
})
app.post('/weatherData',async(req,res)=>{
    console.log("weather post data is heated")
    

    
    // console.log(req)
    // console.log(req.body)
    let city = req.body.city
    const weather = await fetchWeatherData(city.toLowerCase());
    res.json({"weather":weather});
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 