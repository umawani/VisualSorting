import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js'
import {getInsertionSortAnimations} from '../SortingAlgorithms/InsertionSort.js'


export default class SortingVisualizer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      array : [],
      processing : false,
      checked : false,
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
    this.setState({array : array, processing : false});
  }

  mergeSort(){
    let aux = this.state.array.slice();
    let final = this.state.array.slice();
    const animations = getMergeSortAnimations(aux);
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let i = 0; i < animations.length; i++){

      const isColorChange = i % 3 !== 2;
      if(isColorChange){
        const [barOneIndx, barTwoIndx] = animations[i];
        const barOneIndxStyle = arrayBars[barOneIndx].style;
        const barTwoIndxStyle = arrayBars[barTwoIndx].style;
        const color = i % 3 === 0 ? 'red' : 'turquoise';
        setTimeout(() => {
          barOneIndxStyle.backgroundColor = color;
          barTwoIndxStyle.backgroundColor = color;
        }, i * 10);
      }
      else{
        setTimeout(() => {
          const [barOneIndx, newHeight] = animations[i];
          final[barOneIndx] = newHeight;
          this.setState({array : final});
        }, i * 10);
      }
    }
  }

  insertionSort(){
    let aux = this.state.array.slice();
    const animations = getInsertionSortAnimations(this.state.array.slice());
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let  i = 0; i < animations.length; i++){
      if("swap" in animations[i]){
        setTimeout(() => {
        aux[animations[i]["swap"][0]] =animations[i]["swap"][1];
        this.setState({array : aux});
      }, i * 1);
      }
      else if("frontier" in animations[i]){
        setTimeout(() => {
          arrayBars[animations[i]["frontier"]].style.backgroundColor = 'LightGreen';
        },i * 1);
      }
      else if("normal" in animations[i]){
        setTimeout(() => {
          arrayBars[animations[i]["normal"]].style.backgroundColor = 'turquoise';
        },i * 1);
      }
      else{
        setTimeout(() => {
          arrayBars[animations[i]["compare"]].style.backgroundColor = 'red';
        },i * 1);
      }
    }
  }


  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
    this.completeAlgorithm();
  }

  completeAlgorithm(){
    if(checkSorted(this.state.array) && !this.state.checked){
      this.setState({processing : false, checked : true});
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
          <button onClick=
          {() => this.state.processing ? console.log("in process") :
            (this.setState({processing : true}, () => this.resetArray()))}> Generate Array! </button>
          <button onClick=
          {() => this.state.processing ? console.log("in process") :
            (this.setState({processing : true, checked : false} ,
            () => this.mergeSort()))}> Merge Sort! </button>
          <button onClick= {() => this.state.processing ? console.log("in process") :
            (this.setState({processing : true, checked : false} ,
            () => this.insertionSort()))}> Insertion Sort! </button>
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
    toCheck = getInsertionSortAnimations(random);
    console.log(checkSorted(toCheck));
    i++;
  }
}
