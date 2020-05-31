import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js'


export default class SortingVisualizer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      array : [],
    };
  }

  componentDidMount(){
    this.resetArray();
  }


  resetArray(){
    const array = [];
    for(let i = 0; i < 100; i++){
      array.push(randomIntFromInterval(5,600));
    }
    this.setState({array});
  }

  mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if(isColorChange){
        const [barOneIndx, barTwoIndx] = animations[i];
        const barOneIndxStyle = arrayBars[barOneIndx].style;
        const barTwoIndxStyle = arrayBars[barTwoIndx].style;
        const color = i % 3 === 0 ? 'red' : 'turquoise';
        setTimeout(() => {
          barOneIndxStyle.backgroundColor = color;
          barTwoIndxStyle.backgroundColor = color;
        }, i * 5);
      }
      else{
        setTimeout(() => {
          const [barOneIndx, newHeight] = animations[i];
          const barOneIndxStyle = arrayBars[barOneIndx].style;
          barOneIndxStyle.height = `${newHeight}px`;
        }, i * 5);
      }
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="page-container">
        <div className="title-container">
          Sorting Visualizer!
        </div>
        <div className="array-container">
          {array.map((value, index) => (
            <div className="array-bar"
            key={index}
            style={{backgroundColor : 'turquoise', height : `${value}px`,}}>
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <button onClick={() => this.resetArray()}> Generate Array! </button>
          <button onClick={() => this.mergeSort()}> Merge Sort! </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max-min + 1) + min);
}

function generateRandomArray(){
  let array = []
  let i = 0;
  while(i < 10){
    array.push(randomIntFromInterval(5,600));
    i++;
  }
  return array;
}

function checkSorted(array){
  let i = 0;
  let temp = array[0];
  while(i < array.length){
    if(array[i] < temp){
      return false;
    }
    temp = array[i++];
  }
  return true;
}

function testAlgorithm(){
  let toCheck;
  let i = 0;
  while(i < 100){
    let random = generateRandomArray();
    toCheck = getMergeSortAnimations(random);
    console.log(checkSorted(toCheck));
    i++;
  }
}
