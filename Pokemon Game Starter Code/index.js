// let firstCard, secondCard;
// let lockBoard = false;
// let matchedPairs = 0;
// let totalPairs = 3;
// let clicks = 0;
// let timerInterval;
// let timeLeft = 60;
// let gameStarted = false;
// let powerUpUsed = false;

// function resetTurn() {
//   firstCard = undefined;
//   secondCard = undefined;
//   lockBoard = false;
// }

// document.getElementById("theme").addEventListener("change", (e) => {
//   const theme = e.target.value;
//   const body = document.body;
//   const gameTitle = document.getElementById("game_title");
//   const message = document.getElementById("message");

//   if (theme === "dark") {
//     body.classList.add("bg-dark", "text-light");
//     body.classList.remove("light", "bg-white", "text-dark");
//     message.classList.add("text-success");
//     gameTitle.classList.add("text-light");
//   } else {
//     body.classList.remove("bg-dark", "text-light");
//     body.classList.add("bg-white", "text-dark");
//     message.classList.remove("text-success");
//     gameTitle.classList.remove("text-light");
//   }
// });

// function updateStatus() {
//   $("#clicks").text(`Clicks: ${clicks}`);
//   $("#pairs").text(`Pairs matched: ${matchedPairs} / ${totalPairs}`);
// }

// function setup() {
//   firstCard = undefined;
//   secondCard = undefined;
//   matchedPairs = 0;
//   clicks = 0;
//   gameStarted = true;
//   updateStatus();

//   $(".card").on("click", function () {
//     if (!gameStarted || lockBoard || $(this).find(".card-inner").hasClass("flip") || this === $(firstCard).closest(".card")[0]) {
//       return;
//     }

//     $(this).find(".card-inner").addClass("flip");
//     clicks++;
//     updateStatus();

//     if (!firstCard) {
//       firstCard = $(this).find(".front_face")[0];
//     } else {
//       secondCard = $(this).find(".front_face")[0];
//       lockBoard = true;

//       if (firstCard.src === secondCard.src) {
//         $(`#${firstCard.id}`).closest(".card").off("click");
//         $(`#${secondCard.id}`).closest(".card").off("click");
//         matchedPairs++;
//         updateStatus();

//         if (matchedPairs === totalPairs) {
//           endGame(true);
//         }
//         resetTurn();
//       } else {
//         setTimeout(() => {
//           $(`#${firstCard.id}`).closest(".card").find(".card-inner").removeClass("flip");
//           $(`#${secondCard.id}`).closest(".card").find(".card-inner").removeClass("flip");
//           resetTurn();
//         }, 1000);
//       }
//     }
//   });
// }

// function endGame(won) {
//   clearInterval(timerInterval);
//   const msg = won ? "Congratulations!! You Win!" : "Time's Up! You Lose!";
//   $("#message").html(`<h2>${msg}</h2>`);
//   $("#game_grid .card").off("click");
//   $("#powerUpBtn").prop("disabled", true); 
// }

// function startTimer() {
//   clearInterval(timerInterval);
//   timeLeft = 60;
//   $("#timer").text(`Time left: ${timeLeft}`);
//   timerInterval = setInterval(() => {
//     timeLeft--;
//     $("#timer").text(`Time left: ${timeLeft}`);
//     if (timeLeft <= 0) {
//       endGame(false);
//     }
//   }, 1000);
// }

// function resetGame() {
//   clearInterval(timerInterval);
//   firstCard = undefined;
//   secondCard = undefined;
//   lockBoard = false;
//   gameStarted = false;
//   matchedPairs = 0;
//   clicks = 0;
//   powerUpUsed = false;

//   $("#game_grid").empty();
//   $("#message").empty();
//   $("#clicks").text("Clicks: 0");
//   $("#timer").text("Time left: 60");
//   $("#pairs").text(`Pairs matched: 0 / ${totalPairs}`);
//   $("#powerUpBtn").prop("disabled", false);
// }

// async function fetchRandomPokemonImages(pairCount = 3) {
//   const maxPokemonId = 898;
//   const usedIds = new Set();
//   const images = [];

//   while (images.length < pairCount) {
//     const id = Math.floor(Math.random() * maxPokemonId) + 1;
//     if (usedIds.has(id)) continue;

//     try {
//       const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//       const data = await res.json();

//       const img = data?.sprites?.other?.['official-artwork']?.front_default;
//       if (!img) continue;

//       images.push(img);
//       usedIds.add(id);
//     } catch (e) {
//       console.warn("Failed to fetch Pokémon:", e);
//       continue;
//     }
//   }

//   return images;
// }

// function createShuffledCardSet(images) {
//   const cardImages = [...images, ...images];
//   return cardImages
//     .map(img => ({ img, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(obj => obj.img);
// }

// function renderCards(imageList) {
//   $("#game_grid").empty();
//   $("#message").empty();

//   imageList.forEach((img, index) => {
//     const cardHTML = `
//       <div class="card">
//         <div class="card-inner">
//           <img id="img${index}" class="front_face" src="${img}" alt="pokemon">
//           <img class="back_face" src="back.webp" alt="back">
//         </div>
//       </div>
//     `;
//     $("#game_grid").append(cardHTML);
//   });
// }

// async function startGame() {
//   totalPairs = parseInt($("#difficulty").val());
//   $("#pairs").text(`Pairs matched: 0 / ${totalPairs}`);

//   updateGridLayout(totalPairs);

//   const pokemonImages = await fetchRandomPokemonImages(totalPairs);
//   const shuffledImages = createShuffledCardSet(pokemonImages);
//   renderCards(shuffledImages);
//   setup();
//   startTimer();
//   powerUpUsed = false;
//   $("#powerUpBtn").prop("disabled", false);
// }

// function updateGridLayout(difficulty) {
//   const grid = $("#game_grid");

//   if (difficulty === 3) {
//     grid.css("grid-template-columns", "repeat(3, 1fr)");
//   } else if (difficulty === 6) {
//     grid.css("grid-template-columns", "repeat(4, 1fr)");
//   } else if (difficulty === 9) {
//     grid.css("grid-template-columns", "repeat(6, 1fr)");
//   }
// }


// function applyTheme(theme) {
//   $("body").removeClass("light dark").addClass(theme);
//   $("#theme").val(theme);
//   localStorage.setItem("theme", theme);
// }

// $("#powerUpBtn").on("click", () => {
//   if (powerUpUsed || !gameStarted) {
//     console.log("Power-up blocked: already used or game not started.");
//     return;
//   }

//   powerUpUsed = true;
//   $("#powerUpBtn").prop("disabled", true);

//   const flippedCards = new Set();

//   $(".card").each(function (index) {
//     const inner = $(this).find(".card-inner");
//     const wasFlipped = inner.hasClass("flip");

//     if (wasFlipped) {
//       console.log(`Card ${index} was already flipped.`);
//       flippedCards.add(this); 
//     } else {
//       console.log(`Card ${index} is being flipped temporarily.`);
//       inner.addClass("flip");
//     }
//   });

//   setTimeout(() => {
//     $(".card").each(function (index) {
//       if (!flippedCards.has(this)) {
//         const inner = $(this).find(".card-inner");    
//         inner.removeClass("flip");
//       } else {
//         console.log(`Card ${index} remains flipped.`);
//       }
//     });
//   }, 750);
// });



// $(document).ready(() => {
//   $("#message").empty();

//   // Theme setup
//   const savedTheme = localStorage.getItem("theme") || "light";
//   applyTheme(savedTheme);

//   $("#theme").on("change", function () {
//     const selectedTheme = $(this).val();
//     applyTheme(selectedTheme);
//   });
// });

let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 3;
let clicks = 0;
let timerInterval;
let timeLeft = 60;
let gameStarted = false;
let powerUpUsed = false;

function resetTurn() {
  firstCard = undefined;
  secondCard = undefined;
  lockBoard = false;
}

function updateStatus() {
  $("#clicks").text(`Clicks: ${clicks}`);
  $("#pairs").text(`Pairs matched: ${matchedPairs} / ${totalPairs}`);
}

function setup() {
  firstCard = undefined;
  secondCard = undefined;
  matchedPairs = 0;
  clicks = 0;
  gameStarted = true;
  updateStatus();

  $(".card").on("click", function () {
    if (
      !gameStarted ||
      lockBoard ||
      $(this).find(".card-inner").hasClass("flip") ||
      this === $(firstCard).closest(".card")[0]
    ) {
      return;
    }

    $(this).find(".card-inner").addClass("flip");
    clicks++;
    updateStatus();

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      secondCard = $(this).find(".front_face")[0];
      lockBoard = true;

      if (firstCard.src === secondCard.src) {
        $(`#${firstCard.id}`).closest(".card").off("click");
        $(`#${secondCard.id}`).closest(".card").off("click");
        matchedPairs++;
        updateStatus();

        if (matchedPairs === totalPairs) {
          endGame(true);
        }
        resetTurn();
      } else {
        setTimeout(() => {
          $(`#${firstCard.id}`).closest(".card").find(".card-inner").removeClass("flip");
          $(`#${secondCard.id}`).closest(".card").find(".card-inner").removeClass("flip");
          resetTurn();
        }, 1000);
      }
    }
  });
}

function endGame(won) {
  clearInterval(timerInterval);
  const msg = won ? "Congratulations!! You Win!" : "Time's Up! You Lose!";
  $("#message").html(`<h2>${msg}</h2>`);
  $("#game_grid .card").off("click");
  $("#powerUpBtn").prop("disabled", true);
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;
  $("#timer").text(`Time left: ${timeLeft}`);
  timerInterval = setInterval(() => {
    timeLeft--;
    $("#timer").text(`Time left: ${timeLeft}`);
    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

function resetGame() {
  clearInterval(timerInterval);
  firstCard = undefined;
  secondCard = undefined;
  lockBoard = false;
  gameStarted = false;
  matchedPairs = 0;
  clicks = 0;
  powerUpUsed = false;

  $("#game_grid").empty();
  $("#message").empty();
  $("#clicks").text("Clicks: 0");
  $("#timer").text("Time left: 60");
  $("#pairs").text(`Pairs matched: 0 / ${totalPairs}`);
  $("#powerUpBtn").prop("disabled", false);
}

async function fetchRandomPokemonImages(pairCount = 3) {
  const maxPokemonId = 898;
  const usedIds = new Set();
  const images = [];

  while (images.length < pairCount) {
    const id = Math.floor(Math.random() * maxPokemonId) + 1;
    if (usedIds.has(id)) continue;

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      const img = data?.sprites?.other?.['official-artwork']?.front_default;
      if (!img) continue;

      images.push(img);
      usedIds.add(id);
    } catch (e) {
      console.warn("Failed to fetch Pokémon:", e);
      continue;
    }
  }

  return images;
}

function createShuffledCardSet(images) {
  const cardImages = [...images, ...images];
  return cardImages
    .map(img => ({ img, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.img);
}

function renderCards(imageList) {
  $("#game_grid").empty();
  $("#message").empty();

  imageList.forEach((img, index) => {
    const cardHTML = `
      <div class="card">
        <div class="card-inner">
          <img id="img${index}" class="front_face" src="${img}" alt="pokemon">
          <img class="back_face" src="back.webp" alt="back">
        </div>
      </div>
    `;
    $("#game_grid").append(cardHTML);
  });
}

async function startGame() {
  totalPairs = parseInt($("#difficulty").val());
  $("#pairs").text(`Pairs matched: 0 / ${totalPairs}`);

  updateGridLayout(totalPairs);

  const pokemonImages = await fetchRandomPokemonImages(totalPairs);
  const shuffledImages = createShuffledCardSet(pokemonImages);
  renderCards(shuffledImages);
  setup();
  startTimer();
  powerUpUsed = false;
  $("#powerUpBtn").prop("disabled", false);
}

function updateGridLayout(difficulty) {
  const grid = $("#game_grid");

  if (difficulty === 3) {
    grid.css("grid-template-columns", "repeat(3, 1fr)");
  } else if (difficulty === 6) {
    grid.css("grid-template-columns", "repeat(4, 1fr)");
  } else if (difficulty === 9) {
    grid.css("grid-template-columns", "repeat(6, 1fr)");
  }
}

function applyTheme(theme) {
  const body = $("body");
  const message = $("#message");
  const gameTitle = $("#game_title");

  if (theme === "dark") {
    body.removeClass("bg-white text-dark").addClass("bg-dark text-light");
    message.addClass("text-success");
    gameTitle.addClass("text-light");
  } else {
    body.removeClass("bg-dark text-light").addClass("bg-white text-dark");
    message.removeClass("text-success");
    gameTitle.removeClass("text-light");
  }

  $("#theme").val(theme);
  localStorage.setItem("theme", theme);
}

$("#powerUpBtn").on("click", () => {
  if (powerUpUsed || !gameStarted) {
    console.log("Power-up blocked: already used or game not started.");
    return;
  }

  powerUpUsed = true;
  $("#powerUpBtn").prop("disabled", true);

  const flippedCards = new Set();

  $(".card").each(function (index) {
    const inner = $(this).find(".card-inner");
    const wasFlipped = inner.hasClass("flip");

    if (wasFlipped) {
      flippedCards.add(this);
    } else {
      inner.addClass("flip");
    }
  });

  setTimeout(() => {
    $(".card").each(function (index) {
      if (!flippedCards.has(this)) {
        $(this).find(".card-inner").removeClass("flip");
      }
    });
  }, 750);
});

$(document).ready(() => {
  $("#message").empty();

  // Apply saved or default theme
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Re-apply on change
  $("#theme").on("change", function () {
    const selectedTheme = $(this).val();
    applyTheme(selectedTheme);
  });
});

// ✅ Fix for HTML onclick
window.startGame = startGame;
window.resetGame = resetGame;
