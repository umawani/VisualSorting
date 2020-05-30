export function getMergeSortAnimations(array){
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray);
  return array;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxArray){
  //console.log("initial = " + mainArray);
  if(startIdx === endIdx){
    return;
  }
  const midIndx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, midIndx, mainArray);
  mergeSortHelper(auxArray, midIndx + 1, endIdx, mainArray);
  mergeTogether(mainArray, startIdx, midIndx, endIdx, auxArray);
}

function mergeTogether(mainArray, startIdx, midIndx, endIdx, auxArray){
  let k = startIdx;
  let i = startIdx;
  let j = midIndx + 1;

  while(i <= midIndx && j <= endIdx){
    if(auxArray[i] <= auxArray[j]){
      mainArray[k++] = auxArray[i++];
    }
    else{
      mainArray[k++] = auxArray[j++];
    }
  }
  while(i <= midIndx){
    mainArray[k++] = auxArray[i++];
  }
  while(j <= endIdx){
    mainArray[k++] = auxArray[j++];
  }

}
