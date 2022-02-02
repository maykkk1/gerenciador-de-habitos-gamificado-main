const imgs = document.getElementById("avatar");
const img = document.querySelectorAll("#avatar img");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn")
let i = 0;
previousBtn.addEventListener('click', previousAvatar);
nextBtn.addEventListener('click', nextAvatar);
function previousAvatar() {
    console.log(i)
    i++
    if (i < 0) {
        i = img.length - 1
    }
    imgs.style.transform = `translateX(${-i * 100}px)`;
}
function nextAvatar() {
    console.log(i)
    i++
    if(i > img.length - 1){
        i = 0;
    } 
    imgs.style.transform = `translateX(${-i * 100}px)`;
}

class Usuario {
    nome;
    avatar;
    level = 1;
    xp = 0;
    xpToUp = 100;

    levelUp(xpGain) {
        this.xp += xpGain
        const xpSpan = document.getElementById('xp-span')
        xpSpan.innerHTML = `+${xpGain}xp`
        xpSpan.style.transition = 'ease-out 1000ms'
        xpSpan.style.opacity = '1'
        xpSpan.style.transform = 'translateY(-15px)'
        setTimeout(function(){
            xpSpan.style.opacity = '0'
            xpSpan.style.transition = 'none'
            xpSpan.style.transform = 'translateY(15px)'
        }, 1000);


        document.getElementById('xp-usuario').innerHTML = `<strong>${usuario.xp}</strong> / <strong>${usuario.xpToUp}</strong>`
        if (this.xp >= this.xpToUp) {
            this.xp = this.xp - this.xpToUp
            this.level ++
            const music = new Audio('/music/levelup.mp3')
            music.play();
            music.loop =false;
            const levelUpSpan = document.getElementById('level-up-span')
            levelUpSpan.style.transition = 'ease-out 2000ms'
            levelUpSpan.style.opacity = '1'
            levelUpSpan.style.transform = 'translateY(-15px)'
            setTimeout(function(){
                levelUpSpan.style.opacity = '0'
                levelUpSpan.style.transition = 'none'
                levelUpSpan.style.transform = 'translateY(15px)'
            }, 2000);
            this.xpToUp += 75
            document.getElementById('lv-usuario').innerHTML = `Lv   <strong>${usuario.level}</strong>`
            document.getElementById('xp-usuario').innerHTML = `<strong>${usuario.xp}</strong>/<strong>${usuario.xpToUp}</strong>`
        }
    }
}


function criarPersonagem() {
    usuario = new Usuario;
    usuario.nome = document.getElementById('usuario-nome').value
    usuario.avatar = img[i]
    console.log(usuario.avatar)
    document.getElementById('criacao-de-char').style.display = 'none'
    document.getElementById('painel-do-usuario').style.display = 'block'
    document.getElementById('avatar-img').src=`/images/char_${i+1}.png`
    document.getElementById('nome-usuario').innerHTML = usuario.nome
    document.getElementById('lv-usuario').innerHTML = `Lv   <strong>${usuario.level}</strong>`
    document.getElementById('xp-usuario').innerHTML = `<strong>${usuario.xp}</strong> / <strong>${usuario.xpToUp}</strong>`
}



let escolhaDeDificuldade = ''
function dificuldade (dificuldade) {
    escolhaDeDificuldade = dificuldade
}
const criarHabito = (evento) => {
    evento.preventDefault();
    let habitoConteudo = document.getElementById('criar-habito').value;
    if (habitoConteudo.length <= 0) {
        habitInputError ()
    } else {
        const ul = document.querySelector('ul');

        const habito = document.createElement('li');
        habito.classList.add(escolhaDeDificuldade);
        ul.appendChild(habito);
        let conteudo = habitoConteudo;
        habito.innerHTML = conteudo;
        const div = document.createElement('div');
        div.classList.add('habit-icon-wrapper');
        habito.appendChild(div)
        div.appendChild(doneBtn())
        div.appendChild(eraseBtn())
        fecharSecaoCriarHabitos()
        document.getElementById('criar-habito').value = ''
    }
}

const doneBtn = () => {
    const doneBtn = document.createElement('button')
    doneBtn.addEventListener("click", function(event){
        event.preventDefault()
    });
    doneBtn.addEventListener("click", habitoFeito)
    doneBtn.innerHTML = '<i class="far fa-check-circle"></i>'
    return doneBtn
}

const habitoFeito = (evento) => {
    const doneBtnF = evento.target
    const habitoFeito = doneBtnF.parentElement.parentElement.parentElement
    if (habitoFeito.classList.value == 'habito-comum') {
        usuario.levelUp(15)
    }
    if (habitoFeito.classList.value == 'habito-raro') {
        usuario.levelUp(30)
    }
    if (habitoFeito.classList.value == 'habito-epico') {
        usuario.levelUp(50)
    }
    if (habitoFeito.classList.value == 'habito-lendario') {
        usuario.levelUp(70)
    }
}


const eraseBtn = () => {
    const eraseBtn = document.createElement('button');
    eraseBtn.addEventListener("click", function(event){
        event.preventDefault()
    });
    eraseBtn.addEventListener('click', deletarTarefa)
    eraseBtn.innerHTML = '<i class="far fa-times-circle"></i>';
    return eraseBtn
}

const deletarTarefa = (evento) => {
    const eraseBtnf = evento.target
    const habitoDeletado = eraseBtnf.parentElement.parentElement.parentElement
    habitoDeletado.remove()
}









const btnComum = document.getElementById('habit-tier-comum')
const btnRaro = document.getElementById('habit-tier-raro')
const btnEpico = document.getElementById('habit-tier-epico')
const btnLendario = document.getElementById('habit-tier-lendario')


btnComum.addEventListener('click', function() {
    dificuldade('habito-comum')
});
btnRaro.addEventListener('click', function() {
    dificuldade('habito-raro')
});
btnEpico.addEventListener('click', function() {
    dificuldade('habito-epico')
});
btnLendario.addEventListener('click', function() {
    dificuldade('habito-lendario')
});

btnComum.addEventListener('click', criarHabito);
btnRaro.addEventListener('click', criarHabito);
btnEpico.addEventListener('click', criarHabito);
btnLendario.addEventListener('click', criarHabito);



function abrirSecaoDeCriarHabitos() {
    document.getElementById('painel-do-usuario').style.display = 'none'
    document.getElementById('secao-criacao-de-habito').style.display = 'flex'
}

function fecharSecaoCriarHabitos() {
    document.getElementById('secao-criacao-de-habito').style.display = 'none'
    document.getElementById('painel-do-usuario').style.display = 'flex'
    document.getElementById('criar-habito').value = ''
    habitInputErrorReset()
}



function habitInputError () {
    document.getElementById('criar-habito').style.border = '1px solid red'
}

function habitInputErrorReset() {
    document.getElementById('criar-habito').style.border = 'none'
}







const criarHabitoLoseFocus = document.getElementById('criar-habito')
criarHabitoLoseFocus.addEventListener('keyup',function(e){
    if (e.which == 13) this.blur();
});
const usuarioNomeLoseFocus = document.getElementById('usuario-nome')
usuarioNomeLoseFocus.addEventListener('keyup',function(e){
    if (e.which == 13) this.blur();
});
