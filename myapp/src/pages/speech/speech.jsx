import React, { useRef, useState } from 'react';

const Speech = () => {
    const [currentText,setCurrentText] = useState(null)

    const textContent = useRef()
    var words;
    var wordsIndex;
    const [text,setText]  = useState('In "the" HTML file, lets set up: 1. An empty  you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: http   categary:  Try the new cross-platform PowerShell https://aka.ms/pscore6 ')    
    let synth = window.speechSynthesis;
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = text;
    utter.volume = 0.9;
    
    utter.onstart = function(start)
    {
        words   = text.split(' ');
        wordsIndex = 0;        
    }
    utter.onboundary = function(result)
    {
        var it = '';
        for(var i = 0; i < words.length; i++){
            if(i === wordsIndex){
                it += `<span class='red'>${words[i]}</span>`
            } else {
                it += words[i];
            }
            it += ' ';
        }
        textContent.current.innerHTML = it;
        wordsIndex++;        
    }

    utter.onpause = function(pause) 
    {
        console.log(pause)
    }
    utter.onresume = function(result)
    {
        console.log(result)   
    }
    utter.onmark = function(event) {
        console.log('A mark was reached: ' + event.name);
      }    
    return (
        <div>
            <p ref={textContent}>{text}</p>
            <button onClick={() => synth.speak(utter)}>start</button>
            <button onClick={() => synth.resume()}>resume</button>
            <button onClick={() => synth.pause()}>pause</button>
           <p>{currentText}</p>
        </div>
    );
}

export default Speech;
