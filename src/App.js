export default class App{
    constructor(){
        navigator.geolocation.getCurrentPosition(
            this.showPosition.bind(this), //zorgt dat deze this vastgeplakt staat aan de functie van de positie
            this.showError
        );
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(this.showPosition);
    }

    showPosition(position){
        console.log(position);
        let x = position.coords.latitude;
        let y = position.coords.longitude;
        console.log(x);
        this.getWeather(x,y);
    }

    getWeather(x,y){
        //url: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1
        
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('h2').innerHTML = data.current_weather.temperature + ' °C';
        })
        .catch(error => {
            console.log(error)
        })

        //if temperature is under 25 degrees, show a message saying its cold

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
        .then(response => response.json())
        .then(data => {
            var picture = document.querySelector("img");
            if(data.current_weather.temperature <= 20){
                document.querySelector('h1').innerHTML = 'The weather is hot!';
                picture.src = 'images/warm.jpeg'
            } 
            else if(data.current_weather.temperature >= 20){
                document.querySelector('h1').innerHTML = 'The weather is nice!';
                picture.src = 'images/nice.jpg'
            } 
            else if(data.current_weather.temperature >= 15){
                document.querySelector('h1').innerHTML = 'Its cold!';
                picture.src = 'images/cold.avif'
            }
        })
        .catch(error => {
            console.log(error)
        })

        
    }


    showError(error){
        console.log(error);
    }
}