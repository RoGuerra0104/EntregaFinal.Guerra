const verListaCompra = document.getElementById("listadoCompra");

// le añadimos DOM al carrito 

const pintarCarrito = () => {
    divCarrito.innerHTML = "";
    verListaCompra.innerHTML=`<h2 class="carrito">Su carrito está vacio😕</h2>`

    carrito1.forEach((producto) => {
        verListaCompra.innerHTML=`<h2 class="carrito">Listado Compra</h2>`


        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "carritoProducto";
        contenidoCarrito.innerHTML = `
        <p>${producto.bebidas}</p>  
        <span class="resta">-</span>
        <p class="cantidad" >Cantidad: ${producto.cantidad}</p>
        <span class="suma">+</span>
        <p class="total" >Total: $${producto.cantidad * producto.precio}</p>
        `;

        divCarrito.append(contenidoCarrito);
        

        // Función para restarle cantidad al producto del carrito
        let restar = contenidoCarrito.querySelector(".resta");
        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--
                Toastify({
                    text: `Se sacó un ${producto.bebidas}`,
                    duration: 1000,
                    className: "info",
                    style: {
                        borderRadius: "5px",
                        background: "linear-gradient(93deg, rgba(43,45,66,1) 39%, rgba(120,0,0,1) 100%)",
                    }
                }).showToast();
            }

            pintarCarrito();
            guardarLocal();
        });


        // Función para sumarle cantidad al producto del carrito
        let sumar = contenidoCarrito.querySelector(".suma");
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            Toastify({
                text: `Se añadido un ${producto.bebidas} más`,
                duration: 1000,
                className: "info",
                style: {
                    borderRadius: "5px",
                    background: "linear-gradient(93deg, rgba(43,45,66,1) 39%, rgba(120,0,0,1) 100%)",
                }
            }).showToast();
            pintarCarrito();
            guardarLocal();
        });

        // Creamos un botón para eliminar el producto del carrito
        let eliminar = document.createElement("button");
        eliminar.className = "boton";
        eliminar.innerText = "❌";
        contenidoCarrito.append(eliminar);


        eliminar.addEventListener("click", () => {
            Swal.fire({
                title: '¿Estas seguro que lo deseas eliminar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado!',
                        'El producto fue eliminado del carrito correctamente.',
                        'success'

                    )
                    eliminarProducto()
                }
                ;
            })
        });
        console.log(eliminarProducto);

    });

    //creamos una función que sume todos los precios de los productos que se encuentran en el carrito para así obtener el precio total
    const total = carrito1.reduce((sum, el) => sum + el.precio * el.cantidad, 0);
    if (divCarrito != "") {
        const totalCompra = document.createElement("div");
        totalCompra.className = "carrito";
        totalCompra.innerHTML = `<p>total a pagar: $${total}</p>`;
        divCarrito.append(totalCompra);
    }

    //creamos un botón para pagar el cual solo va a aparecer si hay algun producto en el carrito, cuando pulsamos el boton de pagar, se limpia el LocalStorage
    const pagarTotal = total !== 0 ?
        (function () {
            const button = document.createElement("span");
            button.innerHTML = `<button class="inicioCompra" id="btn-compra"><span class="aCompras">Pagar total</span></button>`;
            button.addEventListener("click", function () {
                localStorage.clear();
                divCarrito.innerText = "";
                Swal.fire(
                    'Muchas Gracias por su compra!',
                    'Su pedido ya se está preparando!',
                    'success'
                );
                
            });

            return button;
        })()
        : "";
    divCarrito.append(pagarTotal);
}




verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const buscarId = carrito1.find((producto) => producto.id);

    carrito1 = carrito1.filter((carritoId) => {
        return carritoId !== buscarId
    });

    pintarCarrito();
    guardarLocal();
}


pintarCarrito();

