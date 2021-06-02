const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"];
const suits = ["♠", "♥", "♣", "♦"];
const offset = { width: 6, height: 10 }
const spacing = 0.5;
const cardsByLine = 12;
const units = "rem";
let stopAnimation = false;

const board = document.querySelector("#board")
const shuffleBtn = document.querySelector(".btn[data-action='shuffle']")
const dealBtn = document.querySelector(".btn[data-action='deal']")
const resetBtn = document.querySelector(".btn[data-action='reset']")

createAllCards()
cards = [...document.querySelectorAll(".card")]
reset(cards);

document.addEventListener("click", (e) => {
    let target = e.target;
    switch (target.nodeName) {
        case "BUTTON":
            if (target.classList.contains("btn")) {
                if (target.dataset.action == "deal") {
                    deal(cards)
                }
                if (target.dataset.action == "shuffle") {
                    shuffle(cards)
                }
                if (target.dataset.action == "reset") {
                    cards = [...document.querySelectorAll(".card")]
                    reset(cards)
                }
            }
            break;
        case "DIV":
            if (target.classList.contains("topCard")) {
                deal(cards)
            }
            break;
    }
})

function createAllCards() {
    suits.forEach(suit => {
        numbers.forEach(number => {
            createCard(number, suit)
        });
    });
}
function createCard(number, suit) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.textContent = suit
    card.dataset.suit = suit
    card.dataset.number = number
    card.dataset.name = `${number} ${suit}`
    board.append(card)
}

function deal(cards) {
    var execId = deal.execId = (deal.execId || 0) + 1;
    let line = 0;
    let left = 0;
    let top = 0;
    let cardsDealed = 0;
    for (let i = 0; i < cards.length; i++) {
        (function (card, idx) {
            card.classList.remove("topCard")
            card.style.transform = "translate(0" + units + ",0" + units + ")"
            setTimeout(function () {
                if (deal.execId != execId) {
                    return false;
                }
                card.style.zIndex = cardsDealed
                if (cardsDealed % cardsByLine == 0) {
                    line++;
                    left = spacing
                    top += offset.height + spacing
                } else {
                    left += offset.width + spacing
                }
                card.style.transform = "translate(" + left + units + "," + top + units + ")"
                cardsDealed++
            }, idx * 50)
        })(cards[i], i);
    }
}

function reset(cards) {
    const len = cards.length
    cards[0].classList.add("topCard")
    cards.forEach((card, i) => {
        card.style.transform = "translate(0." + i + units + ",0." + i + units + ")"
        card.style.zIndex = len - i
    })
}

function shuffle(cards) {
    for (let i = (cards.length - 1); i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = cards[newIndex]
        cards[newIndex] = cards[i]
        cards[i] = oldValue
    }
    reset(cards)
    return cards
}

