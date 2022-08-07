var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var GRID = document.querySelector("div.grid");
var KEYBOARD = document.querySelector("div.keygrid");
var url = "https://gist.githubusercontent.com/aryanrsuri/d1263e4cb6f527c4c4e4c3f78134fadb/raw/0b08f0964e50b72c534571018c6ac2de60085af1/words.txt";
var client = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, Error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                if (response.status !== 200) {
                    throw response.status;
                }
                return [4 /*yield*/, response.text()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                Error_1 = _a.sent();
                throw Error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
var game = {
    current: "",
    pos: [0, 1],
    guesses: [],
    eval: [],
    status: "in_progress",
    solution: ""
};
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var words, i, box, i, char, Error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client()];
                case 1:
                    words = _a.sent();
                    game.solution =
                        words.split("\n")[Math.floor(Math.random() * words.split("\n").length)];
                    for (i = 1; i < 31; i++) {
                        box = document.createElement("div");
                        box.classList.add("box");
                        box.id = "".concat(i);
                        GRID.appendChild(box);
                    }
                    for (i = 0; i < 26; i++) {
                        char = document.createElement("div");
                        char.classList.add("box");
                        char.id = String.fromCharCode(65 + i);
                        char.innerHTML = char.id;
                        KEYBOARD.appendChild(char);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    Error_2 = _a.sent();
                    throw Error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("keydown", function (key) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, render(key)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function render(keypress) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (keypress.key === "Backspace") {
                try {
                    if (game.pos[1] > 5 * game.pos[0] + 1) {
                        document.getElementById("".concat(game.pos[1] - 1)).innerHTML = "";
                        game.pos[1] < 1 ? (game.pos[1] = 1) : (game.pos[1] -= 1);
                        game.current = game.current.slice(0, -1);
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
                }
                catch (Error) {
                    throw Error;
                }
            }
            if (keypress.key === "Enter") {
                if (game.current.length == 5) {
                    return [2 /*return*/, evaluate()];
                }
                throw "Length not 5!";
            }
            if (keypress.keyCode > 64 && keypress.keyCode < 91) {
                if (game.current.length < 5) {
                    try {
                        game.current += keypress.key;
                        document.getElementById("".concat(game.pos[1])).innerHTML = game.current.charAt(game.current.length - 1);
                        game.pos[1] > 30 ? (game.pos[1] = 30) : (game.pos[1] += 1);
                        return [2 /*return*/];
                    }
                    catch (Error) {
                        return [2 /*return*/, Promise.reject(Error)];
                    }
                } // [TODO] UX.1 Add a row feedback, max letters alloted 
            }
            else {
                throw "Not a letter!";
            }
            return [2 /*return*/];
        });
    });
}
function evaluate() {
    return __awaiter(this, void 0, void 0, function () {
        var wordlist, row, i, no, curr_pos, charID, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clearOut()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client()];
                case 2:
                    wordlist = _a.sent();
                    if (!wordlist.includes(game.current)) return [3 /*break*/, 5];
                    row = [];
                    for (i in game.current) {
                        no = parseInt(i) + 1;
                        curr_pos = 5 * game.pos[0] + no;
                        charID = game.current[i].toUpperCase();
                        if (game.solution.includes(game.current[i])) {
                            if (game.solution[i] == game.current[i]) {
                                row.push("correct");
                                addClasstoBox(curr_pos, "correct");
                                addClasstoBox(charID, "correct");
                            }
                            row.push("used");
                            addClasstoBox(curr_pos, "used");
                            addClasstoBox(charID, "used");
                        }
                        else {
                            row.push("absent");
                            addClasstoBox(curr_pos, "absent");
                            addClasstoBox(charID, "absent");
                        }
                    }
                    game.guesses.push(game.current);
                    game.eval.push(row);
                    game.pos[0] += 1;
                    game.current = "";
                    if (!(game.current == game.solution)) return [3 /*break*/, 4];
                    return [4 /*yield*/, writeOut("You won! the word was ".concat(game.current))];
                case 3:
                    _a.sent();
                    return [2 /*return*/, win()];
                case 4:
                    if (game.pos[1] > 30) {
                        return [2 /*return*/, lose()];
                    }
                    return [2 /*return*/];
                case 5:
                    for (i = game.pos[1] - 5; i < game.pos[1]; i++) {
                        document.getElementById("".concat(i)).innerHTML = "";
                    }
                    return [4 /*yield*/, writeOut("".concat(game.current, " is not a word!"))];
                case 6:
                    _a.sent();
                    game.current = "";
                    game.pos[1] = 5 * game.pos[0] + 1;
                    throw "Not a real word";
            }
        });
    });
}
function win() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    game.status = "won";
                    return [4 /*yield*/, addClasstoLine("correct")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function lose() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    game.status = "lost";
                    clearGrid();
                    return [4 /*yield*/, writeOut("You lost! the word was ".concat(game.solution))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addClasstoLine(_class) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            for (i = 5 * game.pos[0] + 1; i < game.pos[1]; i++) {
                Promise.resolve(addClasstoBox(i, _class));
            }
            return [2 /*return*/];
        });
    });
}
function addClasstoBox(i, _class) {
    return __awaiter(this, void 0, void 0, function () {
        var box;
        return __generator(this, function (_a) {
            box = document.getElementById("".concat(i));
            box === null || box === void 0 ? void 0 : box.classList.add(_class);
            return [2 /*return*/];
        });
    });
}
function addClasstoChar(i, _class) {
    return __awaiter(this, void 0, void 0, function () {
        var char;
        return __generator(this, function (_a) {
            char = document.getElementById("".concat(i));
            char === null || char === void 0 ? void 0 : char.classList.add(_class);
            return [2 /*return*/];
        });
    });
}
function clearGrid() {
    return __awaiter(this, void 0, void 0, function () {
        var i, box;
        return __generator(this, function (_a) {
            for (i = 1; i < 31; i++) {
                box = document.getElementById("".concat(i));
                //box.classList.remove("absent", "used");
                box.innerHTML = "";
            }
            return [2 /*return*/];
        });
    });
}
function writeOut(text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById("out").innerHTML = text;
            return [2 /*return*/];
        });
    });
}
function clearOut() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById("out").innerHTML = "";
            return [2 /*return*/];
        });
    });
}
init();
