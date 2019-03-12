import React, { Component } from 'react';

import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Signin from './components/signin/Signin'
import Register from './components/register/Register'

import './App.css';

const initialState = {
  
    input:'',
    imageUrl:'',
    box:'',
    route: 'signin',
    isSignedIn: false,
    user:{
      id: '',
      name: '',
      email: '',
      entries: 0,  
      joined: ''  
    }  
}



class App extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  

  loadUser = (data)=>{
    this.setState({
      user:{
       id: data.id,
       name:data.name,
       email: data.email,
       entries: data.entries,  
       joined: data.joined
    }
  })
  }

  calculateFaceLocation = (data) => {
  
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box

    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
 
    return{
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow:height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox =(box)=>{
    this.setState({box: box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onButtonSubmit = (input) =>{
    this.setState({imageUrl: this.state.input})
    fetch('https://secure-garden-83369.herokuapp.com/',{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body:JSON.stringify({
      input:this.state.input
      })
    })
    .then(response => response.json())
    .then( response => {
    if(response){
      fetch('https://secure-garden-83369.herokuapp.com/image',{
        method: 'put',
        headers:{'content-type': 'application/json'},
        body:JSON.stringify({
        id:this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count =>{
        this.setState(Object.assign(this.state.user,{entries: count}))
      })
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err => console.log(err))
  }

  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
      <Particles className ="particles" />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
      { this.state.route === 'home' ? 
              <div> 
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
              </div>
              : (
                this.state.route === 'signin' ?
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}  />
              )
              
      }
      </div>
    );
  }
}

export default App;
