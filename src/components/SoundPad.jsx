import React, { useState } from 'react';
import './css/SoundPad.css';

// Import sound files directly
import sound1 from '../assets/Sounds/Sound1.mp3';
import sound2 from '../assets/Sounds/Sound2.mp3';
import sound3 from '../assets/Sounds/Sound3.mp3';
import sound4 from '../assets/Sounds/Sound4.mp3';

// Uncomment and add more sound imports as needed
/*
import sound5 from '../assets/Sounds/Sound5.mp3';
import sound6 from '../assets/Sounds/Sound6.mp3';
import sound7 from '../assets/Sounds/Sound7.mp3';
import sound8 from '../assets/Sounds/Sound8.mp3';
import sound9 from '../assets/Sounds/Sound9.mp3';
import sound10 from '../assets/Sounds/Sound10.mp3';
import sound11 from '../assets/Sounds/Sound11.mp3';
import sound12 from '../assets/Sounds/Sound12.mp3';
import sound13 from '../assets/Sounds/Sound13.mp3';
import sound14 from '../assets/Sounds/Sound14.mp3';
import sound15 from '../assets/Sounds/Sound15.mp3';
import sound16 from '../assets/Sounds/Sound16.mp3';
import sound17 from '../assets/Sounds/Sound17.mp3';
import sound18 from '../assets/Sounds/Sound18.mp3';
import sound19 from '../assets/Sounds/Sound19.mp3';
import sound20 from '../assets/Sounds/Sound20.mp3';
import sound21 from '../assets/Sounds/Sound21.mp3';
import sound22 from '../assets/Sounds/Sound22.mp3';
import sound23 from '../assets/Sounds/Sound23.mp3';
import sound24 from '../assets/Sounds/Sound24.mp3';
*/

function SoundPad() {
    const sounds = [
        { name: "Sound 1", src: sound1 },
        { name: "Sound 2", src: sound2 },
        { name: "Sound 3", src: sound3 },
        { name: "Sound 4", src: sound4 },
        /* Uncomment and add more sounds as needed
        { name: "Sound 5", src: sound5 },
        { name: "Sound 6", src: sound6 },
        { name: "Sound 7", src: sound7 },
        { name: "Sound 8", src: sound8 },
        { name: "Sound 9", src: sound9 },
        { name: "Sound 10", src: sound10 },
        { name: "Sound 11", src: sound11 },
        { name: "Sound 12", src: sound12 },
        { name: "Sound 13", src: sound13 },
        { name: "Sound 14", src: sound14 },
        { name: "Sound 15", src: sound15 },
        { name: "Sound 16", src: sound16 },
        { name: "Sound 17", src: sound17 },
        { name: "Sound 18", src: sound18 },
        { name: "Sound 19", src: sound19 },
        { name: "Sound 20", src: sound20 },
        { name: "Sound 21", src: sound21 },
        { name: "Sound 22", src: sound22 },
        { name: "Sound 23", src: sound23 },
        { name: "Sound 24", src: sound24 }
        */
    ];

    const [audio, setAudio] = useState(null); // State to hold the audio element

    // Function to play sound
    const playSound = (src) => {
        const newAudio = new Audio(src);
        setAudio(newAudio);
        newAudio.play().catch(error => console.error("Error playing audio:", error));
    };

    // Function to stop sound
    const stopSound = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setAudio(null);
        }
    };

    return (
        <div className="sound-pad">
            {sounds.map((sound, index) => (
                <button 
                    key={index} 
                    onMouseDown={() => playSound(sound.src)} 
                    onMouseUp={stopSound} 
                    onMouseLeave={stopSound} // Stop sound if mouse leaves the button
                    onTouchStart={() => playSound(sound.src)} 
                    onTouchEnd={stopSound} // Stop sound if touch ends
                >
                    {sound.name}
                </button>
            ))}
        </div>
    );
}

export default SoundPad;
