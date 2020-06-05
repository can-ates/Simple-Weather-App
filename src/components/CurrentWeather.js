import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../assets/CurrentWeather.css'
import Clouds from '../images/cloud.jpg'
import Rain from '../images/rain.jpg'
import sun from '../images/sun.jpg'
import thunderstorm from '../images/thunderstorm.jpg'
import mist from '../images/mist.jpg'
import moment from 'moment'



function CurrentWeather(props) {


  const showDatas = () => {
    
    let weather = props.city.weather[0].main;

    if(weather === 'Clouds'){
      weather = Clouds
    }
    if(weather === 'Rain'){
      weather = Rain
    }
    if(weather === 'Clear'){
      weather = sun
    }
    if(weather === 'Thunderstorm'){
      weather = thunderstorm
    }
    if(weather === 'Mist'){
      weather = mist
    }
    let current = moment.unix(props.city.dt).format('ll')
    
    return (
    <Card className='current-card' style={{color: 'white !important', width: '30vh', borderRadius: '40%', boxShadow: '1px 10px 101px -8px rgba(0,0,0,1)'}}>
      <CardContent style={{backgroundImage: `url(${weather})`, 
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          textAlign: 'center',
                          textTransform: 'capitalize'
                            }}
                          >
        <Typography color='primary'  gutterBottom={true}>{props.city.name} {props.city.sys.country}</Typography>
        <Typography color='primary'>{current}</Typography>
          <br/>
        <Typography color='primary'>{props.city.main.temp} °C</Typography>
        <Typography color='primary'>{props.city.weather[0].description}</Typography>
        
      </CardContent>
    </Card>
    )
  }

  return (
    

    <div>

      {showDatas()}

    </div>
  )
}

export default CurrentWeather
