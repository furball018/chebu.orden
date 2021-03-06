let app = new Vue({
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
                    nombre: '🍔 Simple',
                    precio: 250,
                    cantidad: 1,
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
                        {nombre: '🧀 Doble Cheddar por Carne', precio: 15, estado: false},
                        {nombre: '🍟 Papas con Cheddar', precio: 40, estado: false},
                        {nombre: '🥣 Tarrito de salsa CHEBU', precio: 20, estado: false}
                    ]
                },
                {
                    id: Number,
                    nombre: '🍔 Doble',
                    precio: 300,
                    cantidad: 1,
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
                        {nombre: '🧀 Doble Cheddar por Carne', precio: 30, estado: false},
                        {nombre: '🍟 Papas con Cheddar', precio: 40, estado: false},
                        {nombre: '🥣 Tarrito de salsa CHEBU', precio: 20, estado: false}
                    ]
                },
                {
                    id: Number,
                    nombre: '🍔 Triple',
                    precio: 350,
                    cantidad: 1,
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
                        {nombre: '🧀 Doble Cheddar por Carne', precio: 45, estado: false},
                        {nombre: '🍟 Papas con Cheddar', precio: 40, estado: false},
                        {nombre: '🥣 Tarrito de salsa CHEBU', precio: 20, estado: false}
                    ]
                },
                {
                    id: Number,
                    nombre: '🍔 Cuadruple',
                    precio: 400,
                    cantidad: 1,
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
                        {nombre: '🧀 Doble Cheddar por Carne', precio: 60, estado: false},
                        {nombre: '🍟 Papas con Cheddar', precio: 40, estado: false},
                        {nombre: '🥣 Tarrito de salsa CHEBU', precio: 20, estado: false}
                    ]
                },
            ],
            papas: [
                {id: Number, nombre: '🍟 Papas simples', precio: 150},
                {id: Number, nombre: '🍟 Papas con Cheddar', precio: 200}
            ],
            gaseosas: [
                {id: Number, nombre:'🥤 Coca-Cola 500ml', precio: 60},
                {id: Number, nombre:'🥤 Coca-Cola Zero 500ml', precio: 60},
                {id: Number, nombre:'🥤 Sprite 500ml', precio: 60},
                {id: Number, nombre:'🥤 Fanta 500ml', precio: 60},
                {id: Number, nombre:'🥤 Coca-Cola 1,5L', precio: 150},
                {id: Number, nombre:'🥤 Coca-Cola Zero 1,5L', precio: 150},
                {id: Number, nombre:'🥤 Sprite 1,5L', precio: 150},
            ],
            cervezas: [
                {id: Number, nombre:'🍺 Andes Rubia', precio: 90}, 
                {id: Number, nombre:'🍺 Andes Roja', precio: 100},
                {id: Number, nombre:'🍺 Andes IPA', precio: 100},
                {id: Number, nombre:'🍺 Budweiser', precio: 80},
                {id: Number, nombre:'🍺 Schneider', precio: 80},
                {id: Number, nombre:'🍺 Brahma', precio: 80},
                {id: Number, nombre:'🍺 Quilmes', precio:80}
            ]
        },

        //Objeto que contiene todos los pedidos actuales del cliente
        pedido: {
                hamburguesas: [],
                papas: [],
                gaseosas: [],
                cervezas: []
        },
        
        //Datos del cliente
        nombre: $cookies.get('clientname') == null? '' : $cookies.get('clientname'), 
        direccion: $cookies.get('clientaddress') == null? '' : $cookies.get('clientaddress'),
        observaciones: ''
    },
    methods: {
        //Agregar al pedido
        add(item, key){
            // (!) hay que clonar el item que se pasa como referencia, sino al agregar el mismo item se guardan como referencias y no como nuevos objetos.
            let newItem = {...item};
            // (!) lo mismo para los arrays de objetos que hay en dentro.
            if (key == 'hamburguesas'){
                newItem.toppings = item.toppings.map(object => ({ ...object }));
                newItem.extras = item.extras.map(object => ({ ...object }));
            }
            newItem.id = Date.now();
            this.pedido[key] = [...this.pedido[key], newItem];
            this.mostrarPopup = false;
            this.tipoElegido = '';
        },

        //Quitar del pedido
        remove(id, key){
            this.pedido[key] = this.pedido[key].filter(item => item.id !== id);
        },

        //Calcular precio de las hamburguesas + extras
        calcIndividual(hamburguesa){
            let precio = hamburguesa.precio;
            hamburguesa.extras.forEach(ex =>{
                precio += ex.estado? ex.precio : 0;
            })
            return precio * hamburguesa.cantidad;
        },

        //Escribir el mensaje y enviarlo por whatsapp
        send(){
            let salto = '%0A';
            this.msg = ''

            this.msg = encodeURI('*Cliente:* ' + this.nombre) + salto;

            this.msg += encodeURI('*Orden:* ') + salto;
            
            this.pedido.hamburguesas.forEach(h => {
                this.msg += h.cantidad > 1? h.cantidad + ' × ' : '';
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

            this.pedido.gaseosas.forEach(b => {
                this.msg += b.nombre + salto;
            });

            this.pedido.cervezas.forEach(b => {
                this.msg += b.nombre + salto;
            });
            
            this.msg += encodeURI('*Total:* $' + this.calcTotal + ' (sin envío incluido)') + salto;

            this.msg += this.observaciones != '' ? encodeURI('*Observaciones:* ' + this.observaciones) + salto : '';
            
            this.msg += encodeURI('*Dirección:* ' + this.direccion);

            $cookies.config('30d');
            $cookies.set('clientname', this.nombre);
            $cookies.set('clientaddress', this.direccion);
            
            window.location.replace('https://wa.me/' + this.number + '?text=' + this.msg);
        }
    },
    computed: {
        //Calcular el total del pedido
        calcTotal() {
            let total = 0;

            this.pedido.hamburguesas.forEach(hamburguesa => {
                let estePrecio = 0;
                estePrecio += hamburguesa.precio;
                hamburguesa.extras.forEach(ex => {
                    estePrecio += ex.estado? ex.precio : 0;
                });
                total += estePrecio * hamburguesa.cantidad;
            });

            this.pedido.papas.forEach(papa => {
                total += papa.precio;
            });

            this.pedido.gaseosas.forEach(gaseosa => {
                total += gaseosa.precio;
            });

            this.pedido.cervezas.forEach(cerveza => {
                total += cerveza.precio;
            });
            return total;
        }
    }
});
