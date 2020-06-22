console.log('Client side javascript file is loaded!')



const WeatherInfo = document.querySelector("form")
const Location = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

WeatherInfo.addEventListener('submit' ,(e) =>  {
    e.preventDefault()
    const location = Location.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = "Location is " + data.Location
            messageTwo.textContent = ("Temperature is " + data.Temperature +  " degrees. It feels like it is " + data.FeelsLike + " degrees. It is " + data.Condition)  
            
            
            
        }
    })
})
})