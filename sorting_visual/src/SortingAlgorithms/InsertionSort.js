export function getInsertionSortAnimations(array){
  const animations = []
  for(let i = 0; i < array.length; i++){
    animations.push({"frontier" : i});
    for(let j = i; j > 0; j--){
      animations.push({"compare" : j});
      animations.push({"compare" : j - 1});
      if(array[j] < array[j - 1]){
        swap(array, j, j - 1, animations);
      }
      else{
        animations.push({"normal" : j});
        animations.push({"normal" : j - 1});
        if(j === i){
          animations.push({"frontier" : i});
        }
        break;
      }
      animations.push({"normal" : j});
      animations.push({"normal" : j - 1});
      if(j === i){
        animations.push({"frontier" : i});
      }
    }

  }
  animations.push({"normal" : array.length - 1});
  return animations;
}

function swap(array, indexOne, indexTwo, animations){
  let temp = array[indexTwo];
  animations.push({"swap" : [indexTwo, array[indexOne]]});
  array[indexTwo] = array[indexOne];
  animations.push({"swap" : [indexOne, temp]});
  array[indexOne] = temp;
}
