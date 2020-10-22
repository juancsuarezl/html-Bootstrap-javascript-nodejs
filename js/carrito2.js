window.onload = function () {
    // Variables
    let bdArepas = [
        {
            id: 1,
            nombre: 'Carne Mechada',
            precio: 150,
            imagen: 'img/arepa-carne.png'
        },
        {
            id: 2,
            nombre: 'Bondiola',
            precio: 160,
            imagen: 'img/bondiola.jpg'
        },
        {
            id: 3,
            nombre: 'Pollo y Palta',
            precio: 150,
            imagen: 'img/reinap.jpg'
        },
        {
            id: 4,
            nombre: 'Huevos Revueltos',
            precio: 150,
            imagen: 'img/perico.jpg'

        },

        {
            id: 5,
            nombre: 'Jamón y Queso',
            precio: 150,
            imagen: 'img/jamonyqueso.jpg'

        },

        {
            id: 6,
            nombre: 'Degustación',
            precio: 120,
            imagen: 'img/miniarepas.jpg'
        },

        {
            id: 7,
            nombre: 'Empanadas Carne Mechada',
            precio: 120,
            imagen: 'img/empanadas.png'
        },

        {
            id: 8,
            nombre: 'Empanadas Carne picada',
            precio: 120,
            imagen: 'img/empanadas.png'
        },

        {
            id: 9,
            nombre: 'Empanadas Pollo',
            precio: 120,
            imagen: 'img/empanadas.png'
        },

        {
            id: 10,
            nombre: 'Empanadas Queso',
            precio: 120,
            imagen: 'img/empanadas.png'
        }

    ];

    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $botonVaciar = document.querySelector('#boton-vaciar');

    // Funciones
    function renderItems() {
        for (let info of bdArepas) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body', 'mt-3');
            /*miNodoCardBody.style.height ='210px';*/
            miNodoCardBody.style.height ='25%';
            // Titulo
            let miNodoTitle = document.createElement('p');
            miNodoTitle.classList.add('card-title', 'text-center', 'm-2');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid', 'rounded-circle');
            miNodoImagen.setAttribute('src', info['imagen']);
            miNodoImagen.style.width='40%'
            // Precio
            let miNodoPrecio = document.createElement('h5');
            miNodoPrecio.classList.add('card-text', 'text-center', 'text-danger');
            miNodoPrecio.textContent = info['precio'] + '$';
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-outline-success');
            miNodoBoton.textContent = 'Añadir al carrito';
            miNodoBoton.style.height ='36px';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito () {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = bdArepas.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            /*let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);*/
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('tr');
            /*miNodo.classList.add('list-group-item', 'text-left', 'mx-2');*/
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
            // Boton de borrar un item
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-outline-danger', 'mr-2');
            miBoton.textContent = 'x';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito() {
        console.log()
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = bdArepas.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderItems();
} 