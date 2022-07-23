let input           = document.querySelectorAll('.input');
let range           = document.querySelector('.input-reglage');
let btns            = document.querySelectorAll('.btn');
let span            = document.querySelector('span');
let inputColor      = document.querySelector('.input-couleur');
let btnRandom       = document.querySelector('.btn-random');
let corps            = document.body;
let index =3;

// initialisation du degradé
let rotation = 45;
let varCouleur = ['#FFB84E','#FFFFFF'];
input[0].value = varCouleur[0];
input[0].style.background = varCouleur[0];

input[1].value = varCouleur[1];
input[1].style.background = varCouleur[1];



document.querySelector('.deg').textContent= Math.floor(rotation) + ' deg'
//la rotation 
range.addEventListener('input',(e)=>{

    rotation = e.target.value *3.6;
    corps.style.backgroundImage =`linear-gradient(${rotation}deg,${varCouleur})`;
    document.querySelector('.deg').textContent= Math.floor(rotation) + ' deg';

});

// rajout / enleve

btns.forEach(btn=>{
    btn.addEventListener('click',ajouterEnlever);
});

function ajouterEnlever(e){
    
    // corps.style.backgroundImage =`linear-gradient(${rotation}deg,${varCouleur})`;
    span.textContent='';
    const allInput = document.querySelectorAll('.input');
    const randomCouleur = Math.floor(Math.random()*16777215).toString(16);
    // console.log(randomCouleur);

    if (e.target.className === 'btn-plus btn') {
        if (allInput.length > 6) {
            span.textContent="impossible de depasser 7 couleur";
            return;
        }
        const nvCouleur = document.createElement('input');

        nvCouleur.className= 'input';
        nvCouleur.setAttribute('data-index',index);
        nvCouleur.setAttribute('max-length',7);

        nvCouleur.value = `#${randomCouleur.toUpperCase()}`;
        nvCouleur.style.backgroundColor = `#${randomCouleur}`;
        inputColor.appendChild(nvCouleur);

        varCouleur.push(`#${randomCouleur.toUpperCase()}`);
        corps.style.backgroundImage =`linear-gradient(${rotation}deg,${varCouleur})`;

        index++;
    }
    else if (e.target.className === 'btn-moins btn'){
        if (allInput.length === 2) {
            span.textContent = 'il faut au moins deux couleur!';
        }
        else{
            varCouleur.pop();
            allInput[allInput.length -1].remove();
            corps.style.backgroundImage =`linear-gradient(${rotation}deg,${varCouleur})`;
            index--;

        }
    }
   
    allInput.forEach(el =>{
            el.addEventListener('input',changeCouleur);
    });

   
};
input.forEach(el =>{
    el.addEventListener('input',changeCouleur);
});
function changeCouleur(e){
    // console.log(e);
    let indexEncour = e.target.getAttribute('data-index');

    e.target.value = e.target.value.toUpperCase();

    varCouleur[indexEncour - 1] = e.target.value.toUpperCase();
    e.target.style.backgroundColor = varCouleur[indexEncour - 1];
    corps.style.backgroundImage =`linear-gradient(${rotation}deg,${varCouleur})`;

}

btnRandom.addEventListener('click',()=>{

    const inputs = document.querySelectorAll('.input');

    for (let i = 0; i < varCouleur.length; i++) {
        varCouleur[i]=`#${Math.floor(Math.random()*16777215).toString(16)}`;
        inputs[i].value = varCouleur[i].toUpperCase();
        inputs[i].style.backgroundColor = varCouleur[i].toUpperCase();
        corps.style.backgroundImage =`linear-gradient(${rotation}deg,${varCouleur})`;
    }

});