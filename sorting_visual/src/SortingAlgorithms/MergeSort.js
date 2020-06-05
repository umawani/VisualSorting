export function getMergeSortAnimations(array){
  const animations = []
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxArray, animations){
  if(startIdx === endIdx){
    return;
  }
  const midIndx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, midIndx, mainArray, animations);
  mergeSortHelper(auxArray, midIndx + 1, endIdx, mainArray, animations);
  mergeTogether(mainArray, startIdx, midIndx, endIdx, auxArray, animations);
}

function mergeTogether(mainArray, startIdx, midIndx, endIdx, auxArray, animations){
  let k = startIdx;
  let i = startIdx;
  let j = midIndx + 1;

  while(i <= midIndx && j <= endIdx){
    animations.push([i, j]);
    animations.push([i, j]);
    if(auxArray[i] <= auxArray[j]){
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    }
    else{
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }
  while(i <= midIndx){
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }
  while(j <= endIdx){
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}
