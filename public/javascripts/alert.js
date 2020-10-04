const Chart = require('chart.js');

function openform(id) {
  let all = document.querySelectorAll(".my-form");
  for (let i = 0; i < all.length; i++) {
    if (all[i].id == id) {
      all[i].style.display = 'block';
    } else {
      all[i].style.display = 'none';
    }
  }
}

function changeStud(selInd) {
  let i = selInd;
  let all = document.querySelectorAll(".change");

  if (i != 0) all[i-1].style.display = 'block';
  for (let j = 0; j < all.length; j++) {
    if (j != i-1) all[j].style.display = 'none';
  }
}
