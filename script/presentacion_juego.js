document.addEventListener("DOMContentLoaded", function(){

    var pedidoURL = "https://jvalenzani.github.io/json-grupo68-2018/camila_choca.json"; 
    var pedido = new XMLHttpRequest();

    pedido.open('GET', pedidoURL);
    pedido.responseType = "json";
    pedido.send();

    var informacion;  //guardo el JSON

    pedido.addEventListener("load", function(){ 

        informacion = pedido.response;

        //cargo la información del juego
        var titulo = document.querySelector('.presento_juego h1'); 
        titulo.textContent = informacion[0].nombreJuego;

        var introduccion = document.querySelector('.presento_juego h2');
        introduccion.textContent = informacion[0].descripcion;

        var imagenPortada = document.querySelector('.presento_juego img');
        imagenPortada.setAttribute("src", informacion[0].portada);
        imagenPortada.setAttribute("title", "Imágen portada de "+ informacion.nombreJuego);

        var categoria = document.querySelector('.asignaciones #cat');
        categoria.textContent = "Categoría: " + informacion[0].categoria;
            
        var valoracion = document.querySelector('.asignaciones #val');
        valoracion.textContent = "Valoración: " + informacion[0].calificacion;

        var precio = document.querySelector('.asignaciones .precio');
        precio.textContent = "Precio: $ " + informacion[0].precio;

        var descripcionGeneral = document.querySelector('#escrito_descr p');
        descripcionGeneral.textContent = informacion[0].parrafo;

            //Detalles de los niveles
        var CualesNieveles = document.querySelectorAll('.por_nivel .nivel'); //ARREGLO DE LOS TRES ARTÍCULOS
        
        for (var j=0; j< CualesNieveles.length; j++){  //recorro el arreglo de los tres articulos
            CargarContenidoArt(CualesNieveles[j], informacion[0].niveles[j],j+1);  //cargo su información
        };

            function CargarContenidoArt(unArticulo, datos,k){

                var numeroNivel = unArticulo.querySelector('h3');  //Referencia al nivel
                numeroNivel.textContent = "Nivel " + k;

                var imagenNivel = unArticulo.querySelector('img');  //imagen del nivel
                imagenNivel.setAttribute("src", datos.imagen);
                imagenNivel.setAttribute("title", "Nivel " + k + " de " + informacion.nombreJuego);

                var parrafoPorNivel = unArticulo.querySelector('p');   //parrafo del nivel
                parrafoPorNivel.textContent = datos.texto;       
            }
        
        //cargo las imágenes extras por niveles
        var todasLasImg = document.querySelectorAll('#mas_niveles>div>img');
        for (var i=0; i<todasLasImg.length; i++){
            todasLasImg[i].setAttribute("src", informacion[0].imagenesAdicionales[i]);
        };


        var imagenes1 = document.querySelector('#muestro1');
        var imagenes2 = document.querySelector('#muestro2');
        var botones = [];
        botones.push(document.querySelector('#atras'));
        botones.push(document.querySelector('#delante'));
        
        for (var i=0; i<2; i++){
            botones[i].addEventListener("click", function(){
                
                if (imagenes1.getAttribute("class")==="mostrando"){
                    imagenes1.removeAttribute("class");
                    imagenes2.setAttribute("class", "mostrando");
                } else {
                    imagenes2.removeAttribute("class");
                    imagenes1.setAttribute("class", "mostrando"); 
                }
            })
        }
 //***************************Creo el formulario de compra***************************

        //Creo el formulario y lo adhiero al HTML dando al botón 'COMPRAR' 
        var cuerpoMain = document.querySelector("main");
        var insertarAntesDe = document.querySelector("#hijoMain");
        var divPrincipal = document.createElement("div"); 
        divPrincipal.setAttribute("id", "comprar_juego"); 

        var formulario_compra = document.createElement("form"); 
        divPrincipal.appendChild(formulario_compra); 
        formulario_compra.setAttribute("id", "form_compra_juego"); 
        var titulo_formulario = document.createElement("h2"); 
        formulario_compra.appendChild(titulo_formulario); 
        titulo_formulario.textContent = "Para realizar la compra por favor completa los siguientes campos";  

        //Creo el primer div, lo adhiero al formulario, y le doy contenido
        var primerDiv = document.createElement("div"); 
        formulario_compra.appendChild(primerDiv); 
        var label_nombre = document.createElement("label");             
        label_nombre.setAttribute("for", "nombre");  
        label_nombre.textContent=" Nombre ";  
        primerDiv.appendChild(label_nombre);  
        var input_nombre = document.createElement("input");              
        input_nombre.setAttribute("type", "text");
        input_nombre.setAttribute("required", true);
        input_nombre.setAttribute("id", "nombre");        
        primerDiv.appendChild(input_nombre);  

        //Creo el segundo div, lo adhiero al formulario, y le doy contenido
        var segundoDiv = document.createElement("div"); 
        formulario_compra.appendChild(segundoDiv);  
        var label_email = document.createElement("label");               
        label_email.setAttribute("for", "email"); 
        label_email.textContent=" E-mail "; 
        segundoDiv.appendChild(label_email);  
        var input_email = document.createElement("input");   
        input_email.setAttribute("type", "email");  
        input_email.setAttribute("id", "email");
        input_email.setAttribute("name", "email");
        input_email.setAttribute("required", "true");
        input_email.textContent=" E-mail ";
        segundoDiv.appendChild(input_email); 

        //Creo el tercer div, lo adhiero al formulario, y le doy contenido
        var tercerDiv = document.createElement("div");  
        formulario_compra.appendChild(tercerDiv);  
        var label_cantidad = document.createElement("label");    
        label_cantidad.setAttribute("for", "cantidad"); 
        label_cantidad.textContent = "Cantidad de unidades "; 
        tercerDiv.appendChild(label_cantidad);  
        var input_cantidad = document.createElement("input");           
        input_cantidad.setAttribute("type", "number");
        input_cantidad.setAttribute("value", "1");
        input_cantidad.setAttribute("min", "1");
        input_cantidad.setAttribute("id", "cantidad");
        tercerDiv.appendChild(input_cantidad); 

        //Creo el cuarto div, lo adhiero al formulario, y le doy contenido
        var cuartoDiv = document.createElement("div"); 
        formulario_compra.appendChild(cuartoDiv);  
        var label_mediosP = document.createElement("label");        
        label_mediosP.setAttribute("for", "mediosPago");
        label_mediosP.textContent = "Medio de pago";
        cuartoDiv.appendChild(label_mediosP);
        var select_mediosP = document.createElement("select", true);    
        select_mediosP.setAttribute("id", "mediosPago");
        select_mediosP.setAttribute("name", "grupos");
        cuartoDiv.appendChild(select_mediosP); 
        var depositoBanc = document.createElement("option");
        depositoBanc.textContent = "Depósito bancario";
        depositoBanc.setAttribute("value", "1");
        select_mediosP.appendChild(depositoBanc); 
        var debitoA = document.createElement("option");
        debitoA.setAttribute("selected",true);
        debitoA.textContent = "Débito A" ;
        debitoA.setAttribute("value", "2");
        select_mediosP.appendChild(debitoA); 
        var debitoB = document.createElement("option");
        debitoB.textContent = "Débito B";
        debitoB.setAttribute("value", "3");
        select_mediosP.appendChild(debitoB);  
        var creditoC = document.createElement("option");
        creditoC.textContent = "Crédito C";
        creditoC.setAttribute("value", "4");
        select_mediosP.appendChild(creditoC);  

        //Creo el quinto div, lo adhiero al formulario, y le doy contenido
        var quintoDiv = document.createElement("div"); 
        formulario_compra.appendChild(quintoDiv); 
        var parrafo_tipo_juego = document.createElement("p");
        parrafo_tipo_juego.textContent = "Seleccione tipo de juego";
        quintoDiv.appendChild(parrafo_tipo_juego); 
        var label_juego_digital = document.createElement("label");
        label_juego_digital.setAttribute("for", "juego_digital");
        label_juego_digital.textContent = "Digital ";
        quintoDiv.appendChild(label_juego_digital);
        var input_juego_digital = document.createElement("input");
        input_juego_digital.setAttribute("type", "radio");
        input_juego_digital.setAttribute("id", "juego_digital");
        input_juego_digital.setAttribute("name", "tipo_de_juego");
        input_juego_digital.setAttribute("checked", true);
        quintoDiv.appendChild(input_juego_digital);
        var label_juego_fisico = document.createElement("label");
        label_juego_fisico.setAttribute("for", "juego_digital");
        label_juego_fisico.textContent = "Fisico ";
        quintoDiv.appendChild(label_juego_fisico); 
        var input_juego_fisico = document.createElement("input");
        input_juego_fisico.setAttribute("type", "radio");
        input_juego_fisico.setAttribute("id", "juego_fisico");
        input_juego_fisico.setAttribute("name", "tipo_de_juego");
        quintoDiv.appendChild(input_juego_fisico);  

        //Creo el sexto div, lo adhiero al formulario, y le doy contenido 
        var sextoDiv = document.createElement("div"); 
        sextoDiv.setAttribute("id", "metodo_envio_jfisico");
        sextoDiv.setAttribute("class","ocultar");
        formulario_compra.appendChild(sextoDiv); 
        var label_direccion_envio = document.createElement("label");
        label_direccion_envio.setAttribute("for","direccion_envio" );
        label_direccion_envio.textContent = "Dirección de envío ";
        sextoDiv.appendChild(label_direccion_envio); 
        var input_direccion_envio = document.createElement("input");
        input_direccion_envio.setAttribute("type", "text");
        input_direccion_envio.setAttribute("id", "direccion_envio");
        sextoDiv.appendChild(input_direccion_envio);

        var p_metodo_envio = document.createElement("p");
        p_metodo_envio.textContent = "Seleccione método de envío";
        sextoDiv.appendChild(p_metodo_envio); 

        var label_comun = document.createElement("label");
        label_comun.setAttribute("for", "metodo_comun");
        label_comun.textContent = "Común ";
        sextoDiv.appendChild(label_comun); 
        var input_comun = document.createElement("input");
        input_comun.setAttribute("type", "radio");
        input_comun.setAttribute("id", "metodo_comun");
        input_comun.setAttribute("name", "metodo_de_envio");
        input_comun.setAttribute("checked", true);
        sextoDiv.appendChild(input_comun);  

        var label_especial = document.createElement("label");
        label_especial.setAttribute("for", "metodo_especial");
        label_especial.textContent = "Especial ";
        sextoDiv.appendChild(label_especial); 
        var input_especial = document.createElement("input");
        input_especial.setAttribute("type", "radio");
        input_especial.setAttribute("id","metodo_especial" );
        input_especial.setAttribute("name", "metodo_de_envio");
        sextoDiv.appendChild(input_especial); 

        var label_premium = document.createElement("label");
        label_premium.setAttribute("for", "metodo_premium");
        label_premium.textContent = "Premium ";
        sextoDiv.appendChild(label_premium); 
        var input_premium = document.createElement("input");
        input_premium.setAttribute("type", "radio");
        input_premium.setAttribute("id", "metodo_premium");
        input_premium.setAttribute("name","metodo_de_envio");
        sextoDiv.appendChild(input_premium); 

        //Creo los botones de confirmación o cancelación de la compra
        var boton_aceptarCompra = document.createElement("button");
        boton_aceptarCompra.setAttribute("id","confirmar_compra" );
        boton_aceptarCompra.setAttribute("class","boton_form_compra" );
        boton_aceptarCompra.setAttribute("type", "submit");
        boton_aceptarCompra.textContent = "Confirmar";
        formulario_compra.appendChild(boton_aceptarCompra); 

        var boton_cancelarCompra = document.createElement("button");
        boton_cancelarCompra.setAttribute("id","cancelar_compra");
        boton_cancelarCompra.setAttribute("class","boton_form_compra");
        boton_cancelarCompra.setAttribute("type", "button");
        boton_cancelarCompra.textContent = "Cancelar"; 
        formulario_compra.appendChild(boton_cancelarCompra);  

        //Creo el div correspondiente al desglose de los costos
        var divDetalles = document.createElement("div");
        divPrincipal.appendChild(divDetalles); 
        divDetalles.setAttribute("id","detalles_compra");

        var detallesH2 = document.createElement("h2");
        detallesH2.textContent = "Detalles de la compra";
        divDetalles.appendChild(detallesH2); 

        var parrafoCantidad = document.createElement("p");
        parrafoCantidad.textContent ="Cantidad de artículos seleccionados: ";
        divDetalles.appendChild(parrafoCantidad);  
        var cantidadArticulos = document.createElement("p");
        cantidadArticulos.setAttribute("id","cantidad_unidades" );
        divDetalles.appendChild(cantidadArticulos); 

        var parrafo_subtotal = document.createElement("p");
        parrafo_subtotal.textContent = "Subtotal (precio unitario/cantidad): ";
        divDetalles.appendChild(parrafo_subtotal);   
        var campo_subtotal = document.createElement("p");
        campo_subtotal.setAttribute("id","precio_unitario");
        divDetalles.appendChild(campo_subtotal); 

        var parrafoImpuestos = document.createElement("p");
        parrafoImpuestos.textContent = "Impuestos: ";
        divDetalles.appendChild(parrafoImpuestos); 
        var precioConImpuestos = document.createElement("p");
        precioConImpuestos.setAttribute("id","precio_impuestos" );
        divDetalles.appendChild(precioConImpuestos); 

        var parrafoPrecioEnvio = document.createElement("p");
        parrafoPrecioEnvio.textContent = "Precio de envío: ";
        divDetalles.appendChild(parrafoPrecioEnvio);  
        var precioEnvio = document.createElement("p");
        precioEnvio.setAttribute("id","precio_envio");
        divDetalles.appendChild(precioEnvio); 

        var parrafoPrecioFinal = document.createElement("p");
        parrafoPrecioFinal.setAttribute("id", "p_final");
        parrafoPrecioFinal.textContent = "Precio final: ";
        divDetalles.appendChild(parrafoPrecioFinal);  
        var precioFinal = document.createElement("p");
        precioFinal.setAttribute("id", "precio_final");
        divDetalles.appendChild(precioFinal);

        var precioUnitario;
        precioUnitario = informacion[0].precio;         
        campo_subtotal.textContent = "$ " +  precioUnitario;
        var impuestosTotal;
        impuestosTotal = parseInt(informacion[0].precio)*0.22;
        precioConImpuestos.textContent ="$ " + Math.round(impuestosTotal);
        var netoEnvio; 
        netoEnvio = 0;
        precioEnvio.textContent = "$ " + netoEnvio;
        var netoFinal; 
        netoFinal = (parseInt(informacion[0].precio)*1.22) + netoEnvio;
        precioFinal.textContent = "$ " + netoFinal;
        var cantidadDeArticulos;
        cantidadDeArticulos = input_cantidad.value;
        cantidadArticulos.textContent = cantidadDeArticulos;
        var subtotal 
        subtotal = cantidadDeArticulos * precioUnitario;

        //despliega el formulario al dar 'comprar' 
        boton_comprarJuego = document.querySelector('#comprar');

        boton_comprarJuego.addEventListener("click", function(){

            precioUnitario = informacion[0].precio;         
            campo_subtotal.textContent = "$ " +  precioUnitario;
            impuestosTotal = parseInt(informacion[0].precio)*0.22;
            precioConImpuestos.textContent ="$ " + Math.round(impuestosTotal);
            netoEnvio = 0;
            precioEnvio.textContent = "$ " + netoEnvio;
            netoFinal = (parseInt(informacion[0].precio)*1.22) + netoEnvio;
            precioFinal.textContent = "$ " + Math.round(netoFinal);
            cantidadDeArticulos = input_cantidad.value;
            cantidadArticulos.textContent = cantidadDeArticulos;
            subtotal = cantidadDeArticulos * precioUnitario;

            cuerpoMain.insertBefore(divPrincipal, insertarAntesDe);

            var pixel_pantalla = window.innerWidth;
            if (pixel_pantalla <= 789) {
                window.scrollTo(0,0);
            } else {
                window.scrollTo(0,100); 
            };
        });

         //si cambia la cantidad de elementos seleccionados
        input_cantidad.addEventListener("change",function(){ 

            cantidadDeArticulos = input_cantidad.value;
            cantidadArticulos.textContent = cantidadDeArticulos; 

            impuestosTotal = (parseInt(cantidadDeArticulos) * informacion[0].precio)*0.22;
            precioConImpuestos.textContent = "$ " + Math.round(impuestosTotal);
   
            subtotal = cantidadDeArticulos * precioUnitario;
            campo_subtotal.textContent = "$ " + subtotal; 
            
            netoFinal = Math.round(impuestosTotal + subtotal + netoEnvio);
            precioFinal.textContent = "$ " + netoFinal; 
     
        });

        //si juego digital es checkeado
        input_juego_digital.addEventListener("change",function(){ 
            
            subtotal = input_cantidad.value * precioUnitario;
            campo_subtotal.textContent = "$ " + subtotal;

            sextoDiv.setAttribute("class", "ocultar");

            netoEnvio = 0 ;
            precioEnvio.textContent = "$ " + netoEnvio; 

            netoFinal = Math.round((subtotal*1.22) + netoEnvio);
            precioFinal.textContent = "$ " + netoFinal;
            
        });

        //si elige juego fisico se muesta el div oculto
        input_juego_fisico.addEventListener("change", function(){
            if(input_juego_fisico.checked){
                sextoDiv.removeAttribute("class", "ocultar");
            }else{
                sextoDiv.setAttribute("class", "ocultar");
            };
            subtotal = input_cantidad.value * precioUnitario;
            campo_subtotal.textContent = "$ " + subtotal;
            if(input_comun.checked){
                netoEnvio = (subtotal + impuestosTotal)*0.05 ;
                precioEnvio.textContent = "$ " + Math.round(netoEnvio); 
                netoFinal = Math.round(((subtotal)*1.22) + netoEnvio);
                precioFinal.textContent = "$ " + netoFinal;
            };
            if(input_especial.checked){
                netoEnvio = (subtotal + impuestosTotal)*0.2 ;
                precioEnvio.textContent = "$ " + Math.round(netoEnvio); 
                netoFinal = ((subtotal)*1.22) + netoEnvio;
                precioFinal.textContent = "$ " + Math.round(netoFinal);
            };
            if(input_premium.checked){
                netoEnvio = (subtotal + impuestosTotal)*0.5 ;
                precioEnvio.textContent = "$ " + Math.round(netoEnvio); 
                netoFinal = ((subtotal)*1.22) + netoEnvio;
                precioFinal.textContent = "$ " + Math.round(netoFinal);
            };  
        });

        input_especial.addEventListener("change", function(){
            if(input_especial.checked){
 
                subtotal = input_cantidad.value * precioUnitario;
                netoEnvio = (subtotal + impuestosTotal)*0.2 ;
                precioEnvio.textContent = "$ " + Math.round(netoEnvio); 

                netoFinal = (subtotal*1.22) + netoEnvio;
                precioFinal.textContent = "$ " + Math.round(netoFinal);
            }
        });

        input_comun.addEventListener("change", function(){
            if(input_comun.checked){
 
                subtotal = input_cantidad.value * precioUnitario;
                netoEnvio = (subtotal + impuestosTotal)*0.05 ;
                precioEnvio.textContent = "$ " + Math.round(netoEnvio); 

                netoFinal = (subtotal*1.22) + netoEnvio;
                precioFinal.textContent = "$ " + Math.round(netoFinal);
            }
        });

        input_premium.addEventListener("change", function(){
            if(input_premium.checked){
 
                subtotal = input_cantidad.value * precioUnitario;
                netoEnvio = (subtotal + impuestosTotal)*0.5 ;
                precioEnvio.textContent = "$ " + Math.round(netoEnvio); 

                netoFinal = (subtotal*1.22) + netoEnvio;
                precioFinal.textContent = "$ " + Math.round(netoFinal);
            }
        }); 

        var boton_cerrar = document.createElement("button");
        var cartelComprado = document.createElement("div"); 
        var parrafoCartel = document.createElement("p");

        //Botón confirmar compra
       boton_aceptarCompra.addEventListener("click", function(e){
            validacion_direccion = true;
            if (input_juego_fisico.checked ) {
                input_direccion_envio.setAttribute("required", "true");
                validacion_direccion = input_direccion_envio.validity.valid;
            };
            if ((input_nombre.validity.valid && input_email.validity.valid) && validacion_direccion) {

                e.preventDefault;
                                
                cuerpoMain.removeChild(divPrincipal);

                cuerpoMain.insertBefore(cartelComprado, insertarAntesDe);
                cartelComprado.setAttribute("id", "compraExitosa");

                cartelComprado.appendChild(parrafoCartel);
                parrafoCartel.textContent= "Su compra ha sido realizada con éxito";


                boton_cerrar.setAttribute("type", "button");
                cartelComprado.appendChild(boton_cerrar);
                boton_cerrar.setAttribute("id", "cerrar_cartel_comprado");
                boton_cerrar.textContent = "x";  
            };
        });    

        //Botón cancelar compra
        boton_cancelarCompra.addEventListener("click", function(){
            sextoDiv.setAttribute("class", "ocultar");
            cuerpoMain.removeChild(divPrincipal);
            formulario_compra.reset();
        });

        boton_cerrar.addEventListener("click", function(){
            formulario_compra.reset();
            cuerpoMain.removeChild(cartelComprado);
        });    
    });
});