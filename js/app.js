'use strict';

const _circleLenght = 550;
const _notesSyllabic = replaceFlatAndSharp(['Do','Do#/Reb','Re','Re#/Mib','Mi','Fa','Fa#/Solb','Sol','Sol#/Lab','La','La#/Sib','Si']);
const _notesAlphabetical = replaceFlatAndSharp(['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B']);
let _noteNotationToggler = true;
let _notes = _notesAlphabetical.map(n => n);
const _intervals = ['Tónica','2m','2M','3m','3M','4J','Tritono','5J','6m','6M','7m','7M'];

// without jQuery (doesn't work in older IEs)
document.addEventListener('DOMContentLoaded', function(){ 
    drawNotes(_notes);
    drawIntervals(_intervals);
}, false);

function drawNotes(notes){
    let noteCells = notes.map((n, i) => document.getElementById(`note-${i+1}`));
    var notesRadius = (_circleLenght / 2) - 70;
    noteCells.forEach((c,i) => {setUpCircleElements(c,i, notes, notesRadius)});
}

function drawIntervals(intervals){
    let intervalCells = intervals.map((n, i) => document.getElementById(`interval-${i+1}`));
    var intervalsRadius = (_circleLenght / 2) - 150;
    intervalCells.forEach((c,i) => {setUpCircleElements(c,i, intervals, intervalsRadius)});
}

function setUpCircleElements(e, i, elements, radius){
        e.innerHTML = elements[i];
        e.style.top =  `${(_circleLenght/2) - (e.clientHeight/2)}px`;
        e.style.left =  `${(_circleLenght/2) - (e.clientWidth/2)}px`;
        e.style.transform = `translate(${getCircleCoordinates(radius, i)})`
        e.style.fontWeight = '1000';
}

function getCircleCoordinates(radius, i){
    var angle = (360 / 12) * (i - 3);
    var x = radius * Math.cos(Math.PI * 2 * angle / 360);
    var y = radius * Math.sin(Math.PI * 2 * angle / 360);
    return `${x}px, ${y}px`;
}

function replaceFlatAndSharp(arr){
    let flat = '&#x266d;';
    let sharp = '&#x266f;';
    return arr.map(s => s.replace('b', flat ).replace('#', sharp));
}

function moveNote(n){
    if(n === 0) return;

    if (n < 0){
        let temp = _notes.shift();
        _notes[_notes.length] = temp;
    }
    if(n > 0){
        let temp = _notes.pop();
        _notes.unshift(temp);
    }


    drawNotes(_notes);
}

function toggleNotesNotation(){
    _notes = _noteNotationToggler === true ? _notesAlphabetical.map(n => n) : _notesSyllabic.map(n => n);
    _noteNotationToggler = !_noteNotationToggler;
    drawNotes(_notes);
}
