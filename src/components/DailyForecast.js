import React, {useState, useEffect} from 'react'
import '../assets/DailyForecast.css'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import clouds from '../images/cloud.jpg'
import rain from '../images/rain.jpg'
import sun from '../images/sun.jpg'
import thunderstorm from '../images/thunderstorm.jpg'
import mist from '../images/mist.jpg'

const DailyForecast = (props) => {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        axios.get('https://api.openweathermap.org/data/2.5/onecall', {
                params: {
                    lat:      props.coord.lat,
                    lon:      props.coord.lon,
                    exclude: 'hourly,minutely',
                    appid: process.env.REACT_APP_WEATHER_API_KEY,
                    units: 'metric'
                }
            }).then((res) => {
                setDatas(res.data)
                
            })
    
      }, [props.coord]);

    const pickImage = (forWeather) => {
        
        if(forWeather.weather[0].main === 'Clouds'){
        return clouds
        }
        if(forWeather.weather[0].main === 'Rain'){
        return rain
        }
        if(forWeather.weather[0].main === 'Clear'){
        return sun
        }
        if(forWeather.weather[0].main === 'Thunderstorm'){
        return thunderstorm
        }
        if(forWeather.weather[0].main === 'Mist'){
        return mist
        }
    }

    const showDatas = () => {
    
    return (
            datas.daily.map((days, i) => {
            
            if(i === 0){
                return null
            }
            const backImage = pickImage(days)
            return(
                <Card key={i} className='daily-card' style={{borderRadius: '30%',boxShadow: ' 1px 10px 101px -8px rgba(0,0,0,1)' }}>
                <CardContent className='daily'
                            style={{backgroundImage: `url(${backImage})`, 
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'top',
                            textAlign: 'center',
                            textTransform: 'capitalize'
                            }}
                            >

                    <Typography color='primary'>{moment.unix(days.dt).format('ll')}</Typography>
                    <br/>
                    <Typography color='primary'>{days.temp.day} °C</Typography>
                    <Typography color='primary'>{days.weather[0].description}</Typography>
                
                </CardContent>
                </Card>
            )}))    
    }

    return (
        <div className='daily-wrapper'>
             {datas ? showDatas() : null}
        </div>
    )
}

export default DailyForecast
