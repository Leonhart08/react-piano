import * as Tone from 'tone'
import { TONES } from "../constants/tones.js";
import { KEYBOARDMAP } from "../constants/keyboard_map.js";

const key2Frequency = (key) => Math.pow(2,(key - 49) / 12) * 440;

export const buildNotes = (octave, n = 12, options={}) => {
	const keyOctave = 4 + octave*12;

	return Array(n)
		.fill({})
		.map((_, index) => {
			const keyPosition = keyOctave + index;
			const keyMap = KEYBOARDMAP.find(element => element.index === index);

			return {	
				note: keyPosition,
				keyMap: keyMap.key,
				frequency: key2Frequency(keyPosition),
				label: `${TONES[(keyPosition - 4) % 12]}${Math.floor(((keyPosition - 4 )/12)) + 1}`,
				active: false,
				status: 'normal',
				synth: new Tone.Synth(options).toDestination()
			}
		});
}


export const updateNotes = (notes, octave) => {
	const keyOctave = 4 + octave*12;
	
	return notes.map((note, index) => {
		const keyPosition = keyOctave + index;

		return {
			...note,	
			note: keyPosition,
			frequency: key2Frequency(keyPosition),
			label: `${TONES[(keyPosition - 4) % 12]}${Math.floor(((keyPosition - 4 )/12)) + 1}`,
		}
	})
}

const updateSynthSettings = (synth, settings) => {
	const { envelope, oscillator } = settings
	const { attack, decay, sustain, release } = envelope 
	const { type } = oscillator

	if(envelope){
		synth.envelope.attack = attack.current
		synth.envelope.decay = decay.current
		synth.envelope.sustain = sustain.current
		synth.envelope.release = release.current
	}

	if(oscillator){
		synth.oscillator.type = type
	}
	
	return synth
}

export const updateNotesSynth = (notes, settings) => {

	return notes.map((note, _) => {
		const { synth } = note
		return { 
			...note,	
			synth: updateSynthSettings(synth, settings)
		}
	})
}




