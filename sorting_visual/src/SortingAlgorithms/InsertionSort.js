export function getInsertionSortAnimations(array){
  for(let i = 0; i < array.length; i++){
    for(let j = i; j > 0; j--){
      if(array[j] < array[j - 1]){
        swap(array, j, j - 1);
      }
      else{
        break;
      }
    }
  }
  return array;
}

function swap(array, indexOne, indexTwo){
  let temp = array[indexTwo];
  array[indexTwo] = array[indexOne];
  array[indexOne] = temp;
}
