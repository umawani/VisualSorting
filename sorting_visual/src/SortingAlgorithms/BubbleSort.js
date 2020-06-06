export function getBubbleSortAnimations(array){
  const animations = []
  let swapped = true;
  while(swapped){
    swapped = false;
    for(let i = 0; i < array.length - 1; i++){
      animations.push({"compare" : i});
      animations.push({"compare" : i + 1});
      if(array[i] > array[i + 1]){
        swap(array, i, i + 1, animations);
        swapped = true;
      }
      animations.push({"normal" : i});
      animations.push({"normal" : i + 1});
    }
  }
  return animations;
}

function swap(array, indexOne, indexTwo, animations){
  let temp = array[indexTwo];
  animations.push({"swap" : [indexTwo, array[indexOne]]});
  array[indexTwo] = array[indexOne];
  animations.push({"swap" : [indexOne, temp]});
  array[indexOne] = temp;
}
