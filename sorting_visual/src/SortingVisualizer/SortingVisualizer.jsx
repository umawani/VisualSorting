import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js'


export default class SortingVisualizer extends React.Component {
  constructor(props){
    super(props
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
    //getMergeSortAnimations(this.state.array);
    testAlgorithm();
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
    array.push(randomIntFromInterval(1,3000));
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
