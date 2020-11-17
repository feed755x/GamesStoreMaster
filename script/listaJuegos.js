document.addEventListener("DOMContentLoaded", function(){

    var pedidoURL = "https://jvalenzani.github.io/json-grupo68-2018/camila_choca.json"; 
    var pedido = new XMLHttpRequest();

    pedido.open('GET', pedidoURL);
    pedido.responseType = "json";
    pedido.send();

    var archivoLista;
    var listaPrincipal = document.querySelector('#listado_principal');  //section donde agrego los articulos

    pedido.addEventListener("load", function(){

        archivoLista = pedido.response; //es arreglo

        for (var i=0; i<archivoLista.length; i++){
            var articuloNuevo = CrearArticulo(archivoLista[i]);
            if (i===0){
                articuloNuevo.setAttribute("id","primero")  //le agrego id al primer elemento
            };
            listaPrincipal.appendChild(articuloNuevo);
        };

        function CrearArticulo(juego){
            var nuevoArt = document.createElement("article");  //nuevo articulo y agrego al DOM
            nuevoArt.setAttribute("class","juego");

            var nuevoA = document.createElement("a");   //creo "a" - hijo de article
            nuevoA.setAttribute("href","juego_a.html");
            nuevoArt.appendChild(nuevoA);

            var nuevoH3 = document.createElement("h3"); //creo  h3 con su CLASE - hijo de "a"
            nuevoH3.setAttribute("class","nomb_juego"); 
            nuevoH3.textContent = juego.nombreJuego;
            nuevoA.appendChild(nuevoH3); 

            var nuevaImg = document.createElement("img");  //creo img src
            nuevaImg.setAttribute("src", juego.imagen);
            nuevoA.appendChild(nuevaImg);

            var nuevoP = document.createElement("p");  //creo p
            nuevoP.textContent = juego.descripcion;
            nuevoA.appendChild(nuevoP);

            var nuevalista = document.createElement("ul");   // creo ul
            nuevoA.appendChild(nuevalista);

            var nuevoLi1 = document.createElement("li");   //creo TRES li
            nuevoLi1.textContent = "Calificación: " + juego.calificacion + "/10";
            nuevalista.appendChild(nuevoLi1);

            var nuevoLi2 = document.createElement("li");
            nuevoLi2.textContent = "Categoría: " + juego.categoria;
            nuevalista.appendChild(nuevoLi2);

            var nuevoLi3 = document.createElement("li");
            nuevoLi3.textContent = "Precio: $" + juego.precio;
            nuevoLi3.setAttribute("class","precio");
            nuevalista.appendChild(nuevoLi3);

            return nuevoArt;
        }
    });
})