const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"];
const suits = ["♠", "♥", "♣", "♦"];
const cardRemOffset = [6, 10]
const spacing = 0.5;
const units = "rem";

const board = document.querySelector("#board")
const shuffleBtn = document.querySelector(".btn[data-action='shuffle']")
const dealBtn = document.querySelector(".btn[data-action='deal']")
const resetBtn = document.querySelector(".btn[data-action='reset']")


createAllCards()
cards = [...document.querySelectorAll(".card")]
reset(cards);

shuffleBtn.addEventListener("click", () => {
    shuffle(cards)
})
dealBtn.addEventListener("click", () => {
    deal(cards)
})
resetBtn.addEventListener("click", () => {
    cards = [...document.querySelectorAll(".card")]
    reset(cards)
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
    let line = 0;
    let left = 0;
    let top = 0;
    let cardsDealed = 0;
    cards.forEach((card, idx) => {
        let i = idx;
        card.style.transform = "translate(0" + units + ",0" + units + ")"
        setTimeout(() => {
            card.style.zIndex = cardsDealed
            if (cardsDealed % 12 == 0) {
                line++;
                left = cardRemOffset[0] + spacing
                top += cardRemOffset[1] + spacing
            } else {
                left += cardRemOffset[0] + spacing
            }
            card.style.transform = "translate(" + left + units + "," + top + units + ")"
            cardsDealed++

        }, idx * 50)
    });
}

function reset(cards) {
    cards.forEach((card, i) => {
        card.style.transform = "translate(0." + i + units + ",0." + i + units + ")"
        card.style.zIndex = cards.length - i
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

