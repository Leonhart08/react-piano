import * as Tone from 'tone'
import { TONES } from "../constants/tones.js";
import { KEYBOARDMAP } from "../constants/keyboardMap.js";

const key2Frequency = (key) => Math.pow(2,(key - 49) / 12) * 440;

export const buildNotes = (octave, n=12, options=null) => {
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
				synth: new Tone.Synth().toDestination()
			}
		});
}




