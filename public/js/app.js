const WeatherInfo = document.querySelector("form")
const Location = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

messageOne.textContent = "Loading..."
messageTwo.textContent = ""


WeatherInfo.addEventListener('submit' ,(e) =>  {
    e.preventDefault()
    const location = Location.value
    fetch('/weather?address=' + location).then((response) => {
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