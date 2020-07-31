const mainDiv = document.getElementById('main');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const random = (n = 20) => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(getRandomInt(100));
  }
  return array;
};

const nums = random(20);
const blocks = nums
  .map((n, i) => {
    const block = document.createElement('div');
    block.classList.add('block');
    block.dataset.value = n;
    block.style.height = `${n * 3}px`;

    block.style.transform = `translateX(${i * 30}px)`;

    const label = document.createElement('label');
    label.classList.add('block__val');
    label.innerHTML = n;

    block.appendChild(label);
    return block;
  })
  .forEach((block) => {
    mainDiv.appendChild(block);
  });

function swap(el1, el2) {
  return new Promise((resolve) => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue('transform');
    const transform2 = style2.getPropertyValue('transform');

    el1.style.transform = transform2;
    el2.style.transform = transform1;
    // mainDiv.insertBefore(el2, el1);

    // window.requestAnimationFrame(() => {
    setTimeout(() => {
      mainDiv.insertBefore(el2, el1);
      resolve();
    }, 250);
    // });
  });
}

let delay = 100;

async function bubbleSort() {
  let blocks = document.querySelectorAll('.block');
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      blocks[j].style.backgroundColor = '#FF4949';
      blocks[j + 1].style.backgroundColor = '#FF4949';

      //   await new Promise((resolve) =>
      //     setTimeout(() => {
      //       resolve();
      //     }, delay),
      //   );

      const value1 = Number(blocks[j].dataset.value);
      const value2 = Number(blocks[j + 1].dataset.value);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll('.block');
      }

      blocks[j].style.backgroundColor = '#58B7FF';
      blocks[j + 1].style.backgroundColor = '#58B7FF';
    }

    blocks[blocks.length - i - 1].style.backgroundColor = '#13CE66';
  }
}

bubbleSort();
