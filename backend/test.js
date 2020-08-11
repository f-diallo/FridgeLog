//test driver used in codepen.io

fetch('http://localhost:9000/items/')
  .then(result => {
    return result.json();
  })
  .then(result => {
    console.log(result);
  })

//open console w/ right-click->inspect

