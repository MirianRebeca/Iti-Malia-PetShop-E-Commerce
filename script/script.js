document.addEventListener("DOMContentLoaded", function () {
const entrada = document.getElementById('textNome');
const entrada2 = document.getElementById('textEmail');
const entrada3 = document.getElementById('textEnd');

const salvar = document.getElementById('botaoCadastrar');
  
  salvar.addEventListener('click', function(){
     const dados = { "nome": entrada.value, "email": entrada2.value, "endereco": entrada3.value};
     const ls = localStorage.getItem("infos");
     if(entrada2.value.includes('@' ) && (entrada2.value.includes('.com') && (entrada.value.length >= 2))){
      if(ls){
         var json = JSON.parse(ls);
         json.push(dados);
         json = JSON.stringify(json);
         localStorage.setItem("infos", json);
     }else{
         localStorage.setItem("infos", JSON.stringify([dados]));
     }
     const ls_array = JSON.parse(localStorage.getItem("infos"));
     fechar();  
      }else{
         document.getElementById('alertaEmail').style.visibility = 'visible';
      }
  });

      $(window).scroll(function(){  
      if($(document).scrollTop() > 240){
         $('#freteContainer').hide();     
      } else { 
         $('#freteContainer').show();       
      } 
   });
});

function scrollFunction() {
   const body = document.body; 
   const html = document.documentElement; 
   body.scrollTop = 1665;
   html.scrollTop = 1665; 
}

function fechar(){
   formularioCadastro.reset();
   document.getElementById('alertaEmail', ).style.visibility = 'hidden';
   document.getElementById('popup').style.visibility = 'hidden'
   }
   function abrir(){
   document.getElementById('popup').style.visibility = 'visible';
   }

let nrImagem = 0;
const imagens = [];

imagens[0] = "../assents/banner-desktop3.jpg";
imagens[1] = "../assents/banner-desktop4.jpg";

rodarImagens = function () {
   document.images["banner"].src = imagens[nrImagem]
   nrImagem = (nrImagem + 1) % imagens.length; 
}
const intervalControl = setInterval(rodarImagens, 3000);
rodarImagens();