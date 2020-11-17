document.addEventListener("DOMContentLoaded", function(){
    
    var botonNav = document.querySelector('#menu');  //BOTON de menu de barra secundaria -ESCUCHA
    var barraSecundaria = document.querySelector('#barra_secundaria'); //BARRA SECUNDARIA - menu a desplegar

    var botonUsuario = document.querySelector('#usuario'); // BOTON del menu registro e inicio -ESCUCHA
    var menuRegistro = document.querySelector('#registrar'); // LISTA de opciones registro e iniciar sesion

    var botonBusqueda = document.querySelector('#lupa'); // BOTON de buscar - ESCUCHA
    var formBusqueda = document.querySelector('#form_busqueda'); // FORMULARIO de busqueda

   function MostarOcultar(objeto){ 
        if (objeto.style.display === "block"){ 
            objeto.style.display = "none";
        } else {
            objeto.style.display = "block";
        }
    };

    botonNav.addEventListener("click", function(){
        MostarOcultar(barraSecundaria);
    });

    botonUsuario.addEventListener("click", function(){
        MostarOcultar(menuRegistro);
    });

    botonBusqueda.addEventListener("click", function(){
        MostarOcultar(formBusqueda);
    });

    //LISTA ALEATORIA 
    var imagenesAleatorias = document.querySelectorAll('#lista_a>ul>li');
    setInterval(function(){
        var i = 0;
        while (imagenesAleatorias[i].getAttribute("class")!=="actual"){
            i++;
        };
        imagenesAleatorias[i].removeAttribute("class");
        imagenesAleatorias[(i+1)%imagenesAleatorias.length].setAttribute("class", "actual");
    },3000);

    window.addEventListener("resize", function(){

        var tamaño = window.innerWidth;
        if (tamaño >= 810) {
            barraSecundaria.style.display = "";
            menuRegistro.style.display = "";
            formBusqueda.style.display = "";
        }
    });
});