import * as Tone from 'tone'
import { TONES } from "../constants/tones.js";
import { CHORDS } from "../constants/chords.js";
import { KEYBOARDMAP } from "../constants/keyboard_map.js";
import { SCALES } from '../constants/scales.js';

const key2Frequency = (key) => Math.pow(2,(key - 49) / 12) * 440;

export const getChordNotes = (noteIndex, chordIndex) => {
	const chord = CHORDS[chordIndex]

	const chordNotes = chord.value.map(note => TONES[(noteIndex + note) % 12])

	return chordNotes.join(' - ')
}

export const getScaleNotes = (noteIndex, scaleIndex) => {
	const scale = SCALES[scaleIndex]

	const scaleNotes = scale.value.map(note => TONES[(noteIndex + note) % 12])

	return scaleNotes.join(' - ')
}
export const getChordFrequencies = (noteIndex, chordIndex, octave) => {
	const chord = CHORDS[chordIndex]
	const shouldLowOctave = noteIndex >= 9;
	const chordRoot = ((octave + 1)*12 + 4) + noteIndex + (shouldLowOctave ? -12 : 0);
	const chordFrequencies = chord.value.map(note => key2Frequency(chordRoot + note))
	
	return chordFrequencies
}

export const getScaleFrequencies = (noteIndex, scaleIndex, octave) => {
	const scale = SCALES[scaleIndex]
	const shouldLowOctave = noteIndex >= 9;
	const chordRoot = ((octave + 1)*12 + 4) + noteIndex + (shouldLowOctave ? -12 : 0);
	const scaleFrequencies = [...scale.value, 12].map(note => key2Frequency(chordRoot + note))
	
	return scaleFrequencies
}

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


const isKeyInChord = (chord, key, octave, root) => {
	const shouldLowOctave = root >= 9;
	const chordRoot = ((octave + 1)*12 + 4) + root + (shouldLowOctave ? -12 : 0);

	return chord.includes(key-chordRoot) ? 'highlight' : 'normal'
};

const isKeyInScale = (scale, key, octave, root) => {
	const shouldLowOctave = root >= 9;
	const scaleRoot = ((octave + 1)*12 + 4) + root + (shouldLowOctave ? -12 : 0);

	return scale.includes(key-scaleRoot) ? 'highlight' : 'normal'
};

export const updateChord = (notes, params) => {
	const { chordIndex, octave, noteIndex } = params;
	const chord = CHORDS[chordIndex]
	const keyOctave = 4 + octave*12;
	
	if(chordIndex === null || noteIndex === null) {
		return notes
	}

	return notes.map((note, index) => {
		const keyPosition = keyOctave + index;

		return {
			...note,
			active: false,
			status: isKeyInChord(chord.value, keyPosition, octave, noteIndex),
		}
	})
}

export const updateScale = (notes, params) => {
	const { scaleIndex, octave, noteIndex } = params;
	const scale = SCALES[scaleIndex]
	const keyOctave = 4 + octave*12;
	
	if(scaleIndex === null || noteIndex === null) {
		return notes
	}

	return notes.map((note, index) => {
		const keyPosition = keyOctave + index;

		return {
			...note,
			active: false,
			status: isKeyInScale(scale.value, keyPosition, octave, noteIndex),
		}
	})
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

export const updateSynthSettings = (synth, settings) => {
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

export const updatePolySynthSettings = (synth, settings) => {
	const { envelope, oscillator } = settings
	const { attack, decay, sustain, release } = envelope 
	const { type } = oscillator

	synth.set({
		envelope: {
			attack: attack.current,
			decay: decay.current,
			sustain: sustain.current,
			release: release.current
		},
		oscillator: {
			type: type
		}
	})

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




