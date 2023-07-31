


const tipoBebidas = document.getElementById("tipoBebidas");
const verCarrito = document.getElementById("ver-carrito");
const divCarrito = document.getElementById("carrito");





let carrito1 = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async()=> {
    const respuesta = await fetch("../bebidas.json");
    const datos = await respuesta.json();
    // tipoBebidas.innerHTML=""
// Recorremos las bebidas con un forEach y generamos su contenido en el DOM
datos.forEach((producto) => {
    
    
let contenido = document.createElement("div");
    contenido.className = "tipoBebidas";
    contenido.innerHTML =
        `
    <img src="${producto.img}" alt="">
    <br><p class="nombreProd">${producto.bebidas}</p><br>
    <p class="precio">$${producto.precio}</p>
`;tipoBebidas.append(contenido);
    


    //Creamos un botón para añadir el producto al carrito
    let comprar = document.createElement("button");
    comprar.innerHTML = `<button class="btnAniadirProd"><i class="fa-solid fa-cart-plus fa-2xl" id="btnCarrito"></i></button>`;
    contenido.appendChild(comprar)
    

    comprar.addEventListener("click", () => {

        Toastify({
            text: `${producto.bebidas} añadido`,
            duration: 2000,
            destination: "",
            newWindow: false,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                borderRadius: "5px",
                background: "linear-gradient(93deg, rgba(43,45,66,1) 39%, rgba(120,0,0,1) 100%)",
            },
            onClick: function () {}, // Callback after click
        }).showToast();
        

        const productoRepetido = carrito1.some((repetirProducto) => repetirProducto.id === producto.id)

        if (productoRepetido === true) {
            //si el producto está repetido añadimos mas cantidad
            carrito1.map((prod) => {
                if (prod.id === producto.id) {
                    prod.cantidad++;
                }
            })
        } else {
            //si el producto no está en el carrito, lo añadimos
            carrito1.push({
                id: producto.id,
                bebidas: producto.bebidas,
                precio: producto.precio,
                cantidad: producto.cantidad
            });
        }
        guardarLocal();
        console.log(carrito1);
    })

})
}




const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito1));
}

JSON.parse(localStorage.getItem("carrito"));

getProductos();

