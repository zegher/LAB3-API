//get giphy gif from api
const GIPHY_KEY = "fxsc9bh2cbGGkHpfacOo03JP36u8cOpg";
export default class Giphy{
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
    
    getWord(){
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
        .then(response => response.json())
        .then(data => {
            if(data.current_weather.temperature >= 20){
                let searchWord = 'warm';
                console.log('warm');
            } 
            else if(data.current_weather.temperature >= 20){
                let searchWord = 'nice';
                console.log('nice');
            } 
            else if(data.current_weather.temperature <= 15){
                let searchWord = 'cold';
                console.log('cold');
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}