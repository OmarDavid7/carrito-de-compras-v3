const carrito = document.querySelector("#carrito");
const footer = document.querySelector("#footer");
const fragment = document.createDocumentFragment();
const templatefooter = document.querySelector("#templatefooter");
const templateli = document.querySelector("#templateli");

let carritoArray = [];

//delegacion de eventos
document.addEventListener("click", (e) => {
  //console.log(e.target.matches(".card .btn-outline-primary"));

  if (e.target.matches(".card button")) {
    //console.log("ejecutar agregar al carro")
    agregarCarrito(e);
  }

  if(e.target.matches(".list-group-item .btn-success")){
    btnAumentar(e);
  }

  if(e.target.matches(".list-group-item .btn-danger")){
    btnDisminuir(e);
  }

});

const agregarCarrito = (e) => {
  //console.log(e.target.fruta);

  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  //console.log(producto);

  //buscamos el indice
  const index = carritoArray.findIndex((item) => item.id === producto.id);

  //si no existe empujamos el nuevo elemento
  if (index === -1) {
    carritoArray.push(producto);
  } else {
    //en caso contrario aumentamos su cantidad
    carritoArray[index].cantidad++;
  }

  pintarCarrito();
};

const pintarCarrito = ()=>{
    carrito.textContent = "";
    //recorremos el carrito y pintamos elementos
   carritoArray.forEach((item)=>{
    const clone = templateli.content.cloneNode(true);
    clone.querySelector(".text-white .lead").textContent = item.titulo;
    clone.querySelector(".rounded-pill").textContent = item.cantidad;
    clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;
    clone.querySelector(".btn-success").dataset.id = item.id;
    clone.querySelector(".btn-danger").dataset.id = item.id;

    fragment.appendChild(clone);

   });

    carrito.appendChild(fragment);
    pintarFooter();
};

const pintarFooter = ()=>{
    footer.textContent = "";

    const total = carritoArray.reduce((acc, current)=> acc + current.precio * current.cantidad, 0);

    const clone = templatefooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    // fragment.appendChild(clone);
    footer.appendChild(clone);
};

const btnAumentar = (e) => {
    // console.log(e.target.dataset.id);
    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    // console.log(e.target.dataset.id);
    carritoArray = carritoArray.filter((item) => {
        // console.log(item);
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                // console.log(item);
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    pintarCarrito();
};