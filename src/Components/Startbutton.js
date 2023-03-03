import { Midi } from "tonal";
//const { Midi } = require("tonal")



export default function StartButton() {
// get access to web audio api //
  window.AudioContext = window.AudioContext || Window.webKitAudioContext

  let ctx = new AudioContext()

  function midiToFreq(number) {
    const a = 440
    return(a/32)*(2 **((number-9) / 12))
    
  }
 
 

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


    

    //console.log(osc)
  } 


  
  function noteOn(note, velocity) {
    console.log(note, velocity)
    ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    
    oscGain.gain.value = 0.33
    osc.type = "sine"
    osc.frequency.value = Midi.midiToFreq(note)
    
    
    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start()
    
 
    
  }

  

  function noteOff(note) {
    console.log(note)
    //osc.stop()
  }

  function updateDevices(event) {
    //console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State, ${event.port.state}, Type: ${event.port.type}` )
  } 

  function failure() {
    console.log('could not connect')
  }

  const clickHandler = () => console.log('clicked')

  return(
    <button onClick={clickHandler}>
        Start
    </button>
  )

}

StartButton()




