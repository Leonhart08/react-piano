import SoundFontPlayer from "soundfont-player";
import AudioContext from "../helpers/AudioContext";
import { TONES } from "../constants/tones.js";
import { KEYBOARDMAP } from "../constants/keyboardMap.js";

const key2Frequency = (key) => Math.pow(2,(key - 49) / 12) * 440;
const isKeyInScale = (scale, key) => scale.includes(TONES[(key - 4)%12]) ? 'highlight' : 'normal';

export const loadInstrument = async () => {
	const player = await SoundFontPlayer.instrument(new AudioContext(), 'acoustic_grand_piano');
	return player;
};

export const Player = loadInstrument();

export const buildScale = (root, scale) => scale ? scale.map(tone => TONES[(root + tone)%12]): [];

export const buildNotes = (octave, n=12, options=null) => {
	const { scale, root} = options;
	const keyOctave = 4 + octave*12;
	const keyScale = scale ? buildScale(root, scale.values) : null;

	return Array(n)
		.fill({})
		.map((note,index) => {
			const keyPosition = keyOctave + index;
			const keyMap = KEYBOARDMAP.find(element => element.index === index);
			return {	
				note: keyPosition,
				keyMap: keyMap.key,
				frequency: key2Frequency(keyPosition),
				label: `${TONES[(keyPosition - 4)%12]}${Math.floor(((keyPosition - 4 )/12)) + 1}`,
				status: keyScale ? isKeyInScale(keyScale, keyPosition) : 'normal',
				active: false,
			}
		});
}




