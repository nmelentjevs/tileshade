const shuffle = (array) => {
  let newArray = array;
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [array[j], array[i]];
  }
  return newArray;
};

export default shuffle;
