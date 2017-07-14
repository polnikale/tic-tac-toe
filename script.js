let inner = document.getElementsByClassName('innerbox');
let outer = document.getElementsByClassName('outer')[0];
let note = document.getElementsByClassName('note')[0];
let againBtn = document.querySelector('button');
let turn = 'X';
let playerWin = false;
let count = 0;


function winner() {
    for (let counter = 1; counter <= 3; counter++) {
        if (inner[3 * (counter - 1) + 0].innerHTML === inner[3 * (counter - 1) + 1].innerHTML && inner[3 * (counter - 1) + 1].innerHTML === inner[3 * (counter - 1) + 2].innerHTML && inner[3 * (counter - 1) + 2].innerHTML !== '') { //проверка на победу в одном ряду
            inner[3 * (counter - 1) + 0].classList.add('winner');
            inner[3 * (counter - 1) + 1].classList.add('winner');
            inner[3 * (counter - 1) + 2].classList.add('winner');
            return inner[3 * (counter - 1) + 0].innerHTML;

        } else if (inner[0 + counter - 1].innerHTML === inner[3 + counter - 1].innerHTML && inner[3 + counter - 1].innerHTML === inner[6 + counter - 1].innerHTML && inner[0 + counter - 1].innerHTML !== '') { //проверка на победу в одном столбце
            inner[0 + counter - 1].classList.add('winner');
            inner[3 + counter - 1].classList.add('winner');
            inner[6 + counter - 1].classList.add('winner');
            return inner[0 + counter - 1].innerHTML;
        } else if (inner[0].innerHTML === inner[4].innerHTML && inner[4].innerHTML === inner[8].innerHTML && inner[0].innerHTML !== '') { //проверка на победу в одном столбце
            for (let counter = 0; counter < inner.length; counter++) {
                inner[counter].classList.add('unable');
            }
            inner[0].classList.add('winner');
            inner[4].classList.add('winner');
            inner[8].classList.add('winner');
            return inner[0].innerHTML;
        } else if (inner[2].innerHTML === inner[4].innerHTML && inner[4].innerHTML === inner[6].innerHTML && inner[6].innerHTML !== '') { //проверка на победу в одном столбце
            inner[2].classList.add('winner');
            inner[4].classList.add('winner');
            inner[6].classList.add('winner');
            return inner[2].innerHTML;
        }
    }
}

function addAgain(elem) {
    elem.style.left = '10px';
    elem.style.transitionTimingFunction = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
}



function addPoint(e) {
    let target = e.target;
    count++;
    if (playerWin) {
        return false;
    }
    if (!target.classList.contains('innerbox')) {
        return;
    }
    if (!(target.innerHTML === '')) {
        return;
    }
    target.innerHTML = turn;
    turn = turn === 'X' ? 0 : 'X';
    note.innerHTML = turn === 'X' ? 'ходят крестики' : 'ходят нолики';

    let res = winner();
    if (res) {
        playerWin = true;
        for (let counter = 0; counter < inner.length; counter++) {
            inner[counter].classList.add('unable');
        }
        note.innerHTML = res === 'X' ? 'выиграли крестики' : 'выиграли нолики';
        note.style.color = '#F93B4E';
        addAgain(againBtn);
    } else if (count === 9) {
        for (let counter = 0; counter < inner.length; counter++) {
            inner[counter].classList.add('unable');
        }
        note.innerHTML = 'ничья';
        note.style.color = '#F93B4E';
        addAgain(againBtn);
    }
}

function restore(e) {
    let target = e.target;
    target.style.left = '-500px';
    target.style.transitionTimingFunction = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
    for (let counter = 0; counter < inner.length; counter++) {
        inner[counter].classList.remove('winner');
        inner[counter].innerHTML = '';
        inner[counter].classList.remove('unable');
        note.innerHTML = 'ходят крестики';
        note.style.color = '';
        count = 0;
        playerWin = false;
        turn = 'X';
    };
}

outer.addEventListener('click', addPoint);
againBtn.addEventListener('click', restore);
