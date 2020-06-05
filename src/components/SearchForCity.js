import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typograpyh from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';
import {BackgroundContext} from '../context/BackgroundProvider'
import axios from 'axios'
import '../assets/SearchForCity.css';
import evening from '../images/evening.jpg'
import morning from '../images/morning.jpg'
import Fade from 'react-reveal/Fade';


const styles = theme => ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'white !important',
    }
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },

  cssFocused: {
    color: 'white !important'
  },

  cssLabel: {
    color : 'white'
  },

  cssOutlinedInputB: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'black !important',
    }
  },

  notchedOutlineB: {
    borderWidth: '1px',
    borderColor: 'black !important'
  },

  cssFocusedB: {
    color: 'black !important'
  },

  cssLabelB: {
    color : 'black'
  },
});


class SearchForCity extends Component {

  
  static contextType = BackgroundContext;

  state = {
    city: '',
    datas: null,
    isSubmitted: false,
  };

  componentDidMount() {
    let now = new Date()
    
    now = now.toLocaleString('en-US', { hour: 'numeric', hour12: true })

    now = now.split(' ');

    const {toggleBackground} = this.context
    
    if(parseInt(now[0]) >= 5 && now[1] === 'PM' && parseInt(now[0]) <= 12) {
      toggleBackground(true) 
    }
    else if(parseInt(now[0]) >= 0  && now[1] === 'AM' && parseInt(now[0]) < 6) {
      toggleBackground(true)
    }
    else {
      toggleBackground(false)
    }
    
  }

  

  handleChange = e => {
    this.setState({
      city: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q:      this.state.city,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
                units: 'metric'
            }
        }).then((res) => {
            this.setState({
                datas: res.data,
                isSubmitted: true,
                city: ''
            })
        })

  };

  render() {
    const {classes} = this.props
    const {isEvening} = this.context


    return (
      <div className='components-wrapper' style={{backgroundImage: isEvening ? `url(${evening})` : `url(${morning})`}}>
        {this.state.isSubmitted ? (
          <div className='datas'>
            <CurrentWeather className='current-weather' city={this.state.datas} />
            <DailyForecast className='components' coord={this.state.datas.coord}/>
          </div>
        ) : (
          isEvening ? 
          <Fade top>
            <div className='welcome'>
                <Typograpyh className='welcome-text' variant='h2'>Much Weather!</Typograpyh>
                <Typograpyh className='welcome-text' variant='h3'>Good Evening</Typograpyh>
            </div>
          </Fade> 
                     :  
          <Fade top> 
            <div className='welcome'>
                <Typograpyh className='welcome-text' variant='h2'>Much Weather!</Typograpyh>
                <Typograpyh variant='h3' className='welcome-text'>Have a great day</Typograpyh>
            </div>
          </Fade>
        )}
        <Fade bottom>
          <form
            className='form'
            noValidate
            autoComplete='off'
            onSubmit={this.handleSubmit}
          >
            <TextField
              size='medium'
              className='text-field'
              variant='outlined'
              label='City Name'
              name='name'
              InputLabelProps={{
                classes: {
                  root: isEvening ? classes.cssLabel : classes.cssLabelB,
                  focused: isEvening ? classes.cssFocused : classes.cssFocusedB,
                },
              }}
              InputProps={{
                classes: {root: isEvening ? classes.cssOutlinedInput : classes.cssOutlinedInputB ,
                          focused: isEvening ? classes.cssFocused : classes.cssFocusedB  ,
                          notchedOutline: isEvening ? classes.notchedOutline : classes.notchedOutlineB  
                        },
                inputMode: "numeric"
              }}
              value={this.state.city}
              onChange={this.handleChange}
            />
          </form>
        </Fade>
      </div>
    );
  }
}

export default withStyles(styles)(SearchForCity);
