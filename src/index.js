const GRID = document.querySelector("div.grid");
const URL =
  "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";

let game = {
  current: "",
  pos: [0, 1], // [line, box] #s
  guesses: [],
  eval: [],
  status: "in_progress",
};

localStorage.setItem("wordle", game);

for (let i = 1; i < 31; i++) {
  let box = document.createElement("div");
  box.classList.add("box");
  box.id = i;
  GRID.appendChild(box);
}

document.addEventListener("keydown", async (key) => {
  await render(key);
});

async function render(keypress) {
  if (keypress.key === "Backspace") {
    try {
      if (game.pos[1] > 5 * game.pos[0] + 1) {
        document.getElementById(game.pos[1] - 1).innerHTML = ``;
        game.pos[1] < 1 ? (game.pos[1] = 1) : (game.pos[1] -= 1);
        game.current = game.current.slice(0, -1);
        return;
      }

      return;
    } catch (Error) {
      throw Error;
    }
  }
  if (keypress.key === "Enter") {
    if (game.current.length == 5) {
      return evaluate();
    }
    throw "Length not 5!";
  }
  if (keypress.keyCode > 64 && keypress.keyCode < 91) {
    if (game.current.length < 5) {
      try {
        game.current += keypress.key;
        document.getElementById(game.pos[1]).innerHTML = game.current.charAt(
          game.current.length - 1
        );
        game.pos[1] > 30 ? (game.pos[1] = 30) : (game.pos[1] += 1);

        return;
      } catch (Error) {
        return Promise.reject(Error);
      }
    }
  } else {
    throw "Not a letter!";
  }
}

async function evaluate() {
  const client = await fetch(URL)
  .then((response) => {
    if (response.status !== 200) {
      throw response.status;
    }
    return response.text();
  })
  .catch((Error) => {
    throw Error;
  });

  if (game.guesses.includes(game.current)) {
    throw "Word already used!"
  }
  if (client.includes(game.current)) {
    game.guesses.push(game.current);
    game.pos[0] += 1;

    game.current = "";
    return;
  } else {
    for (let i = game.pos[1] - 5; i < game.pos[1]; i++) {
      document.getElementById(i).innerHTML = ``;
    }
    game.current = "";
    game.pos[1] = 1;
    del();
    throw "Not a real word";
  }
}

async function del() {
  //deletes char on backspace
}


async function clearLine() {

}