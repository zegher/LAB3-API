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
                backgroundcolor.style.backgroundColor = '#F5360D';
                
                let searchWord = 'warm';
                this.getGiphy(gKey, searchWord);

            } 
            else if(data.current_weather.temperature >= 20){
                document.querySelector('h1').innerHTML = 'The weather is nice!';
                backgroundcolor.style.backgroundColor = '#4796FA';

                let searchWord = 'nice';            
                this.getGiphy(gKey, searchWord);
            } 
            else if(data.current_weather.temperature <= 15){
                document.querySelector('h1').innerHTML = 'Its cold!';
                backgroundcolor.style.backgroundColor = '#B0B2B4';

                let searchWord = "cold";
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

    getGiphy(gKey, searchWord){
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${gKey}&q=${searchWord}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            console.log(data + "gif");
            console.log(searchWord + "gif");
            document.querySelector("img").src = data.data[0].images.original.url;
            document.body.appendChild(img);
        })
        .catch(error => {
            // console.log(searchWord); //hij kan de key lezen!!
            console.log(error + "Probleem met koude gif")
        })
    }
}
