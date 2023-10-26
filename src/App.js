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

    getGiphy(gKey, searchWord){
        fetch(`api.giphy.com/v1/gifs/api_key?q=${gKey}&search?q=${searchWord}&limit=1&offset=0&rating=g&lang=en}`)
        .then(response => response.json())
        .then(data => {
            console.log(data + "gif");
            console.log(searchWord + "gif");
        })
        .catch(error => {
            // console.log(gKey); //hij kan de key lezen!!
            console.log(error + "Probleem met koude gif")
        })
    }

    getWeather(x,y){
        //url: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1
        
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&timezone=GMT&forecast_days=1`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('h2').innerHTML = data.current_weather.temperature + ' °C';
        })
        .catch(error => {
            console.log(error + "error fetching eerst")
        })

        //if temperature is under 25 degrees, show a message saying its cold

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
        .then(response => response.json())
        .then(data => {
            let gKey = "fxsc9bh2cbGGkHpfacOo03JP36u8cOpg";
            this.getGiphy(gKey);
            var picture = document.querySelector("img");
            let backgroundcolor = document.querySelector('#app');
            if(data.current_weather.temperature >= 20){
                document.querySelector('h1').innerHTML = 'The weather is hot!';
                let searchWord = 'warm';
                console.log('warm');
                picture.src = 'images/warm.jpeg'
                backgroundcolor.style.backgroundColor = '#F5360D';
            } 
            else if(data.current_weather.temperature >= 20){
                document.querySelector('h1').innerHTML = 'The weather is nice!';
                
                let searchWord = 'nice';
                console.log('nice');

                picture.src = 'images/nice.jpg'
                backgroundcolor.style.backgroundColor = '#4796FA';
            } 
            else if(data.current_weather.temperature <= 15){
                document.querySelector('h1').innerHTML = 'Its cold!';
                console.log('cold');
                
                // picture.src = 'https://media0.giphy.com/media/3o6Zt2FsmthIOdUm5y/giphy.gif?cid=74b27eab5nlu1fy71u9tua7v7q3w14aqg6epm35t06gb4xcl&ep=v1_gifs_search&rid=giphy.gif&ct=g';

                backgroundcolor.style.backgroundColor = '#B0B2B4';
                
                let searchWord = 'cold';
                this.getGiphy(gKey, searchWord);
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
