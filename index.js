import axios from "axios";
import { argv } from "process";

const key = '51c4d41ff96f108a4e7a834be6d24a50';
const city = argv[2];

axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
    .then(response => {
        //console.log('data', response.data);
        console.log(`It is now ${response.data.main.temp} °C in ${response.data.name}, ${response.data.sys.country}`);
        console.log(`The current weather conditions are: ${response.data.weather[0].description}`);
    })
    .catch(err => console.log('Error:', err));