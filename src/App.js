import logo from './logo.svg';
import './App.css';



function App() {

  //```Checking to see if the browser accepts midi  ```
  if(navigator.requestMIDIAccess){
  navigator.requestMIDIAccess().then(success, failure)
  }

  function success(midiAccess) {
    midiAccess.onstatechange = updateDevices

    const inputs = midiAccess.inputs

    inputs.forEach((input) => {
      input.onmidimessage = handleInput
    })
  }

  function handleInput(input) {
    const command = input.data[0]
    const note = input.data[1]
    const velocity = input.data[2]


    switch(command) {
      case 144: //note on
      if(velocity > 0) {
        noteOn(note, velocity)
      } else {
        noteOff(note)
      }
      break
      case 128: //note off
      noteOff(note)
      break
    }
  }
  
  function noteOn(note, velocity) {
    console.log(note, velocity)
  }

  function noteOff(note) {
    console.log(note)
  }

  function updateDevices(event) {
    //console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State, ${event.port.state}, Type: ${event.port.type}` )
  } 

  function failure() {
    console.log('could not connect')
  }

  return (
    <div className="App">

    </div>
  );
}

export default App;
