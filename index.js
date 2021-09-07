import axios from "axios";
import { argv } from "process";
import moment from "moment";

const key = '51c4d41ff96f108a4e7a834be6d24a50';

function returnWeather() {
    if(!argv[2]) {
        console.log('Please specify a city: "node index.js <city>"')
        return;
    }
    const city = argv[2];
    
    // allow forecast call without unit specification
    if (argv[3] === 'forecast') {
        argv.push('forecast');
        argv[3] = 'metric';
    }

    const units = (argv[3] ? argv[3] : 'metric');
    
    if(argv[3] && !(argv[3] === 'metric' || argv[3] === 'imperial')) {
        console.log('Please specify metric or imperial unit system: "node index.js <city> <unit system>"')
        return;
    }

    if (!argv[4]) {
        // Get current weather:
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`)
            .then(response => {
                //console.log('data', response.data);
                console.log(
                    `It is now ${response.data.main.temp} ${(units === 'metric' ? '°C' : '°F')} in ${response.data.name}, ${response.data.sys.country}\n` +
                    `The current weather conditions are: ${response.data.weather[0].description}`
                );
            })
            .catch(err => console.log(err));
    
    } else if (argv[4] === 'forecast') {
        axios
            .get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${units}`)
            .then(response => {
                //console.log('data', response.data.list);
                response.data.list.forEach(element => {
                    console.log(`${moment(element.dt * 1000).format('dddd MMMM Do, [at] hha')} expect ${element.main.temp} ${(units === 'metric' ? '°C' : '°F')} and ${element.weather[0].description}`)
                });
            })
            .catch(err => console.log(err));
    }
}

returnWeather();