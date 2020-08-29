var app = new Vue({
    el: '#app',
    data: {
        //Numero de teléfono al que se va a enviar el mensaje
        number: 5493515996448, 

        //Variable que va a contener el mensaje cuando se vaya creando
        msg: '', 

        //Propiedades para mostrar y ocultar el popup de agregar
        mostrarPopup: false,
        tipoElegido: '',
        
        //Objeto con todas las cosas que CHEBU ofrece
        ofertas: {
            hamburguesas: [
                {
                    id: Number,
                    nombre: 'Hamburguesa Simple',
                    precio: 250,
                    editando: false,
                    toppings: [
                        {nombre: '🥓 Panceta', estado: true},  
                        {nombre: '🧅 Cebolla caramelizada', estado: true}, 
                        {nombre: '🥬 Lechuga', estado: true},
                        {nombre: '🍅 Tomate', estado: true},
                        {nombre: '🥣 Salsa CHEBU', estado: true},
                        {nombre: '🌶️ Salsa Picante', estado: false}
                    ],
                    extras: [
                        {nombre: '🥓 Doble Panceta', precio: 30, estado: false},
                        {nombre: '🧀 Doble Chedar', precio: 30, estado: false},
                        {nombre: '🍟 Papas con doble chedar', precio: 40, estado: false}
                    ]
                },
                {
                    id: Number,
                    nombre: 'Hamburguesa Doble',
                    precio: 300,
                    editando: false,
                    toppings: [
                        {nombre: '🥓 Panceta', estado: true},  
                        {nombre: '🧅 Cebolla caramelizada', estado: true}, 
                        {nombre: '🥬 Lechuga', estado: true},
                        {nombre: '🍅 Tomate', estado: true},
                        {nombre: '🥣 Salsa CHEBU', estado: true},
                        {nombre: '🌶️ Salsa Picante', estado: false}
                    ],
                    extras: [
                        {nombre: '🥓 Doble Panceta', precio: 30, estado: false},
                        {nombre: '🧀 Doble Chedar', precio: 30, estado: false},
                        {nombre: '🍟 Papas con doble chedar', precio: 40, estado: false}
                    ]
                },
                {
                    id: Number,
                    nombre: 'Hamburguesa Triple',
                    precio: 350,
                    editando: false,
                    toppings: [
                        {nombre: '🥓 Panceta', estado: true},  
                        {nombre: '🧅 Cebolla caramelizada', estado: true}, 
                        {nombre: '🥬 Lechuga', estado: true},
                        {nombre: '🍅 Tomate', estado: true},
                        {nombre: '🥣 Salsa CHEBU', estado: true},
                        {nombre: '🌶️ Salsa Picante', estado: false}
                    ],
                    extras: [
                        {nombre: '🥓 Doble Panceta', precio: 30, estado: false},
                        {nombre: '🧀 Doble Chedar', precio: 30, estado: false},
                        {nombre: '🍟 Papas con doble chedar', precio: 40, estado: false}
                    ]
                },
            ],
            papas: [
                {id: Number, nombre: 'P. de Papas', precio: 150},
                {id: Number, nombre: 'P. de Papas con Chedar', precio: 200}
            ],
            bebidas: [
                {id: Number, nombre:'Coca 500ml', precio: 60},
                {id: Number, nombre:'Coca 1,5L', precio: 150},
                {id: Number, nombre:'Coca Zero 500ml', precio: 60},
                {id: Number, nombre:'Coca Zero 1,5L', precio: 150},
                {id: Number, nombre:'Sprite 1,5L', precio: 150},
                {id: Number, nombre:'Cerveza Andes Rubia', precio: 90},
                {id: Number, nombre:'Cerveza Andes Roja', precio: 100},
                {id: Number, nombre:'Cerveza Andes IPA', precio: 100},
                {id: Number, nombre:'Cerveza Budweiser', precio: 80},
                {id: Number, nombre:'Cerveza Schneider', precio: 80},
                {id: Number, nombre:'Cerveza Brahma', precio: 80},
                {id: Number, nombre:'Cerveza Quilmes', precio:80}
            ]
        },

        //Objeto que contiene todos los pedidos actuales del cliente
        pedido: {
                hamburguesas: [],
                papas: [],
                bebidas: []
        },
        
        //Datos del cliente
        nombre: '', 
        direccion: '',
        observaciones: ''
    },
    methods: {
        //Agregar al pedido
        add: function(item, arr){
            item.id = Date.now();
            arr.push(item);
            this.mostrarPopup = false;
            this.tipoElegido = '';
        },

        //Quitar del pedido
        remove: function(i, arr){
            arr.splice(i,1);
        },

        //Calcular precio de las hamburguesas + extras
        calcIndividual: function(hamburguesa){
            var precio = hamburguesa.precio;
            hamburguesa.extras.forEach(ex =>{
                precio += ex.estado? ex.precio : 0;
            })
            return precio;
        },

        //Escribir el mensaje y enviarlo por whatsapp
        send: function() {
            var salto = '%0A';
            this.msg = ''

            this.msg = encodeURI('*Cliente:* ' + this.nombre) + salto;

            this.msg += encodeURI('*Orden:* ') + salto;
            
            this.pedido.hamburguesas.forEach(h => {
                this.msg += h.nombre + ' (con ';
                h.toppings.forEach(top => {
                    this.msg += top.estado? top.nombre + ', ' : '';
                });
                h.extras.forEach(ex => {
                    this.msg += ex.estado? ex.nombre + ', ' : ''; 
                });
                this.msg = this.msg.toString().slice(0, -2);
                this.msg += ')' + salto;
            })

            this.pedido.papas.forEach(p => {
                this.msg += p.nombre + salto;
            });

            this.pedido.bebidas.forEach(b => {
                this.msg += b.nombre + salto;
            });
            
            this.msg += encodeURI('*Total:* $' + this.calcTotal + ' (sin envío incluido)') + salto;

            this.msg += this.observaciones != '' ? encodeURI('*Observaciones:* ' + this.observaciones) + salto : '';
            
            this.msg += encodeURI('*Dirección:* ' + this.direccion);
            
            window.location.replace('https://wa.me/' + this.number + '?text=' + this.msg);
        }
    },
    computed: {
        //Calcular el total del pedido
        calcTotal: function() {
            var total = 0;

            this.pedido.hamburguesas.forEach(hamburguesa => {
                total += hamburguesa.precio;
                hamburguesa.extras.forEach(ex => {
                    total += ex.estado? ex.precio : 0;
                });
            });

            this.pedido.papas.forEach(papa => {
                total += papa.precio;
            });

            this.pedido.bebidas.forEach(bebida => {
                total += bebida.precio;
            });
            return total;
        }
    }
});