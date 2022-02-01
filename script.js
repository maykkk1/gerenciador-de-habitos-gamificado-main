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
        document.getElementById('xp-usuario').innerHTML = `<strong>${usuario.xp}</strong> / <strong>${usuario.xpToUp}</strong>`
        if (this.xp >= this.xpToUp) {
            this.xp = this.xp - this.xpToUp
            this.level ++
            this.xpToUp += 35
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




