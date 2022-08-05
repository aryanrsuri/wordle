const GRID = document.querySelector("div.grid");
const KEYBOARD = document.querySelector("div.keygrid");
const URL =
  "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";
const client = async () => {
  try {
    const response = await fetch(URL);
    if (response.status !== 200) {
      throw response.status;
    }
    return await response.text();
  } catch (Error) {
    throw Error;
  }
};

let game = {
  current: "",
  pos: [0, 1],
  guesses: [],
  eval: [],
  status: "in_progress",
  solution: "",
};

async function init() {
  try {
    const words = await client();
    game.solution =
      words.split("\n")[Math.floor(Math.random() * words.split("\n").length)];

    for (let i = 1; i < 31; i++) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.id = i;
      GRID.appendChild(box);
    }

    for (let i = 0; i < 26; i++) {
      let char = document.createElement("div");
      char.classList.add("box");
      char.id = String.fromCharCode(65 + i);
      char.innerHTML = char.id;
      KEYBOARD.appendChild(char);
    }
  } catch (Error) {
    throw Error;
  }
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
    } // [TODO] UX.1 Add a row feedback, max letters alloted 
  } else {
    throw "Not a letter!";
  }
}

async function evaluate() {
  await clearOut();
  let wordlist = await client();
  
  if (wordlist.includes(game.current)) {
    let row = [];
    for (let i in game.current) {
      const no = parseInt(i) + 1;
      const curr_pos = 5 * game.pos[0] + no;
      const charID = game.current[i].toUpperCase();
      if (game.solution.includes(game.current[i])) {
        if (game.solution[i] == game.current[i]) {
          row.push("correct");
          addClasstoBox(curr_pos, "correct");
          addClasstoBox(charID, "correct");
        }
        row.push("used")
        addClasstoBox(curr_pos, "used");
        addClasstoBox(charID, "used");
      } else {
        row.push("absent")
        addClasstoBox(curr_pos, "absent");
        addClasstoBox(charID, "absent");
      }
    }
    
    game.guesses.push(game.current);
    game.eval.push(row);
    game.pos[0] += 1;
    game.current = "";

    if (game.current == game.solution) {
      await writeOut(`You won! the word was ${game.current}`);
      return win();
    }
    if (game.pos[1] > 30) {
      return lose();
    }
    return
  } else {
    for (let i = game.pos[1] - 5; i < game.pos[1]; i++) {
      document.getElementById(i).innerHTML = ``;
    }
    await writeOut(`${game.current} is not a word!`);
    game.current = "";
    game.pos[1] = 5 * game.pos[0] + 1;
    throw "Not a real word";
  }
}

async function win() {
  game.status = "won";
  await addClasstoLine("correct");
}

async function lose() {
  game.status = "lost";
  clearGrid();
  await writeOut(`You lost! the word was ${game.solution}`);
}

async function addClasstoLine(_class) {
  for (let i = 5 * game.pos[0] + 1; i < game.pos[1]; i++) {
    Promise.resolve(addClasstoBox(i, _class));
  }
}
async function addClasstoBox(i, _class) {
  let box = document.getElementById(i);
  box.classList.add(_class);
}

async function addClasstoChar(charid, _class) {
  let char = document.getElementById(charid);
  char.classList.add(_class);
}

async function clearGrid() {
  for (let i = 1; i < 31; i++) {
    let box = document.getElementById(i);
    //box.classList.remove("absent", "used");
    box.innerHTML = ``;
  }
}
async function writeOut(text) {
  document.getElementById("out").innerHTML = text;
}
async function clearOut() {
  document.getElementById("out").innerHTML = ``;
}

document.body.addEventListener("load", init());
