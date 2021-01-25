
export const KEY_NUMBERS = 36;

export const INITIAL_SETTINGS = {
  oscillator : {
    type : 'square'
  } ,
  envelope: {
    attack : {
      min: 0,
      max: 2,
      current: 0
     } ,
    decay : {
      min: 0,
      max: 2,
      current: 0.1
     }  ,
    sustain : {
      min: 0,
      max: 1,
      current: 0.3
     } ,
    release : {
      min: 0,
      max: 5,
      current: 1
    }
  }
}