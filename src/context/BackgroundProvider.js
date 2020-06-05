import React, { Component } from 'react'

export const BackgroundContext = React.createContext();


export class BackgroundProvider extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         isHot: false,
         isEvening: false
      }
    }

    toggleTheme = (b) => {
        this.setState({
            isHot: b
        })
    }

    toggleBackground = (b) => {
        this.setState({
            isEvening: b
        })
    }
    
    render() {
        return (
            <BackgroundContext.Provider
                value={{...this.state, toggleTheme: this.toggleTheme, toggleBackground: this.toggleBackground}}
            >
                {this.props.children}
            </BackgroundContext.Provider>
        )
    }
}


