/*
  953104 – Assignment: Human Test – Select All That Match
  Starter code with guidance comments
*/

const TOPICS = [
  {
    label: "cars",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=800",
      "https://images.unsplash.com/photo-1658030017202-7cb98f1c8bae?q=80&w=800",
      "https://images.unsplash.com/photo-1758323782884-80eb0dfc839e?q=80&w=800",
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800",
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=800",
      "https://images.unsplash.com/photo-1757583010761-ffc255a8868c?q=80&w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    ],
    correct: new Set([0, 2, 8]), // indexes of correct images
  },
  {
    label: "cats",
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800",
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=800",
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800",
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800",
      "https://images.unsplash.com/photo-1758438919146-f3f59a6d2544?q=80&w=800",
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=800",
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?q=80&w=800",
      "https://images.unsplash.com/photo-1510337550647-e84f83e341ca?q=80&w=800",
      "https://images.unsplash.com/photo-1526296609207-80e77afde33d?q=80&w=800",
    ],
    correct: new Set([0, 1, 6]), // indexes of correct images
  },
  {
    label: "dogs",
    images: [
      "https://cdn-images-1.medium.com/max/1600/0*-_y_NgWrvhMthKGq",
      "https://pinkiespokemon.home.blog/wp-content/uploads/2019/11/image1.jpg?w=412",
      "https://media.newyorker.com/photos/665f65409ad64d9e7a494208/master/w_2560%2Cc_limit/Chayka-screenshot-06-05-24.jpg",
      "https://preview.redd.it/granzeboma-from-tengen-toppa-gurren-lagann-v0-qjrmgt93ac2b1.jpg?width=640&crop=smart&auto=webp&s=3f16789d45b46191290c32f843041ca1c51ad1cf",
      "https://i0.wp.com/unrememberedyesterdays.wordpress.com/wp-content/uploads/2016/05/thelonedigger.png?fit=1200%2C675&ssl=1",
      "https://pbs.twimg.com/media/G1xa7P8WIAAeBB8?format=jpg&name=small",
      "https://64.media.tumblr.com/3a618929d24e4edf5bc6d698e82b5949/tumblr_inline_ovir5pOE3B1ur0nu7_640.jpg",
      "https://external-preview.redd.it/DYZZBDT-zM7UEOBKfGKWuIVERSu9aXuf0rreL2DMA80.jpg?width=640&crop=smart&auto=webp&s=52963cc6a1a2027b7aae32f82d739445852b4a61",
      "https://assets.mubicdn.net/images/notebook/post_images/28772/images-w1400.png?1565208419",
    ],
    correct: new Set([0, 2, 5]), // dogs n stuff
  },
];

// DOM references
const grid = document.querySelector(".grid");
const promptEl = document.getElementById("prompt");
const submitBtn = document.getElementById("submitBtn");
const newRoundBtn = document.getElementById("newRoundBtn");
const resultEl = document.getElementById("result");

let topic = null; // current topic (cars/cats)
let selected = new Set(); // track user-selected indexes
let locked = false; // prevent changes after submit

// Pick random topic
function pickTopic() {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
}

// Render the grid for current topic
function render() {
  // 1. Update the prompt text with the label of the current topic (e.g. cars/cats)
  promptEl.textContent = `Select all images with ${topic.label}.`;

  // 2. Clear previous grid
  grid.innerHTML = "";
  selected.clear();
  locked = false;
  submitBtn.disabled = true;
  resultEl.textContent = "";

  // TODO:
  // Loop over topic.images and for each:
  // - Create a <button class="tile"> element
  // - Set aria-pressed="false" initially
  topic.images.forEach((url, i) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.setAttribute("aria-pressed", "false");
    // - Add an <img> inside with src and alt
    const img = document.createElement("img");
    img.src = url;
    img.alt = topic.label;

    btn.appendChild(img);
    // - Add click and keydown event listeners to call toggle(i, btn)
    // - Append to the grid
    btn.addEventListener("click", () => toggle(i, btn));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(i, btn);
      }
    });
    grid.appendChild(btn);
  });
}

// Toggle tile selection
function toggle(i, el) {
  if (locked) return;

  // TODO:
  // - If index i is already in selected → remove it, set aria-pressed="false"
  if (selected.has(i)) {
    selected.delete(i);
    el.setAttribute("aria-pressed", "false");
    el.style.borderColor = "transparent";
    el.style.transform = "scale(1)";
    el.style.boxShadow = "none";
  }
  // - Otherwise add it to selected, set aria-pressed="true"
  // - In CSS, style .tile[aria-pressed="true"] to indicate selection (e.g. border, background, box-shadow, transform, transition)
  else {
    selected.add(i);
    el.setAttribute("aria-pressed", "true");
    el.style.borderColor = "var(--sel)";
    el.style.boxShadow = "0 0 0 3px var(--sel)";
    el.style.transform = "scale(0.97)";
  }
  // - Enable submitBtn if at least one tile is selected
  submitBtn.disabled = selected.size === 0;
}

// Validate and mark tiles
function check() {
  if (locked) return;
  locked = true;

  let correctCount = 0;
  let wrongCount = 0;
  const tiles = Array.from(document.querySelectorAll(".tile"));

  // TODO:
  // Loop through all .tile elements

  // - If selected AND correct → add class "correct", show ✓
  // - If selected AND NOT correct → add class "wrong", show ✗
  // // Then check missed correct answers (tiles not selected but should be)
  // - Add class "missed", show label
  // (Use data-state attribute to show ✓/✗/missed via CSS ::after)
  tiles.forEach((tile, i) => {
    if (selected.has(i) && topic.correct.has(i)) {
      tile.classList.add("correct");
      tile.dataset.state = "✓";
      correctCount++;
    } else if (selected.has(i) && !topic.correct.has(i)) {
      tile.classList.add("wrong");
      tile.dataset.state = "✗";
      wrongCount++;
    } else if (!selected.has(i) && topic.correct.has(i)) {
      tile.classList.add("missed");
      tile.dataset.state = "missed";
    }
  });
  // Finally, update resultEl with message:
  // "You found X/Y. Wrong selections: Z"
  resultEl.textContent = `You found ${correctCount}/${topic.correct.size}. Wrong selections: ${wrongCount}`;
}

// Start new round
function newRound() {
  topic = pickTopic(); // returns random topic object
  render();
}

// Event listeners
submitBtn.addEventListener("click", check);
newRoundBtn.addEventListener("click", newRound);

// Init
newRound();
