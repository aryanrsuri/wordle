const GRID = document.querySelector("div.grid");
const URL =
  "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";

let game = {
  current: "",
  pos: [0, 1], // [line, box] #s
  guesses: [],
  eval: [],
  status: "in_progress",
  solution: "manor",
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
  if (game.pos[1] > 30) {
    return lose();
  }
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
    if (game.current == game.solution) {
      document.getElementById("out").innerHTML = `You won!`;
      return win()
    }

    for (let i in game.current) {
      let no = parseInt(i) + 1; 
      if (game.solution.includes(game.current[i])) {
        curr_pos = 5*game.pos[0] +no;
        if (game.solution[i] == game.current[i]) {
          addClasstoBox(curr_pos, "correct");
        }
        addClasstoBox(curr_pos, "used")
      } else {
        addClasstoBox(no, "absent")
      }
    }

    game.guesses.push(game.current);
    game.pos[0] += 1;

    game.current = "";
    return;
  } else {
    for (let i = game.pos[1] - 5; i < game.pos[1]; i++) {
      document.getElementById(i).innerHTML = ``;
    }
    game.current = "";
    game.pos[1] = 5*game.pos[0] + 1;
    del();
    throw "Not a real word";
  }
}

async function del() {
  //deletes char on backspace
}

async function win() {
  game.status = "won";
  await addClasstoLine("correct")
}

async function lose() {
  game.status = "lost";
  clearGrid();
  document.getElementById("out").innerHTML = `You lost :(, the answer was ${game.solution}`; 
}


async function addClasstoLine(_class) {
  for (let i=5*game.pos[0] + 1; i < game.pos[1]; i++) {
    Promise.resolve(addClasstoBox(i, _class));
  } 
}
async function addClasstoBox(i, _class) {
  let box = document.getElementById(i);
  box.classList.add(_class);
}

function clearLine(i) {
  // for (let i=5*game.pos[0] + 1; i <game.pos[1]; i++) {
  //   document.getElementById(i).innerHTML = ``;
  // }
}

function clearGrid() {
  for (let i=1; i < 31; i++) {
    let box = document.getElementById(i);
    box.classList.remove("absent", "used")
    box.innerHTML = ``;
  }
}