var app = new Vue({
    el: '#app',
    data: {
        number: 5493515996448, //numero de teléfono al que se va a enviar el mensaje
        msg: "", //variable que va a contener el mensaje cuando se vaya creando
        mostrarPopup: false, //bool para mostrar y ocultar el popup de agregar
        tiposDeHamburguesas: [ //tipos básicos de Hamburguesas
            {
                nombre: "Hamburguesa Simple",
                precio: 250
            },
            {
                nombre: "Hamburguesa Doble",
                precio: 300
            },
            {
                nombre: "Hamburguesa Triple",
                precio: 350
            }
        ],
        tiposDePapas: [
            {
                nombre: "P. de Papas",
                precio: 150
            },
            {
                nombre: "P. de Papas con Chedar",
                precio: 200
            }
        ],
        hamburguesas: [], //contenedor para las hamburguesas del pedido
        papas: [], //lo mismo pero para las papas
        total: 0, //contenedor del total
        tweenTotal: 0,
        nombre: "", //datos del cliente
        direccion: "",
        observaciones: ""
    },
    methods: {
        add: function(tipo){
            this.hamburguesas.push({
                id: Date.now(),
                tipo: tipo.nombre,
                precio: tipo.precio,
                editando: false,
                toppings: [
                    {nombre: "🥓 Panceta", precio: 0, estado: true},  
                    {nombre: "🧅 Cebolla caramelizada", precio: 0, estado: true}, 
                    {nombre: "🥬 Lechuga", precio: 0, estado: true},
                    {nombre: "🍅 Tomate", precio: 0, estado: true},
                    {nombre: "🥣 Salsa CHEBU", precio: 0, estado: true},
                    {nombre: "🌶️ Salsa Picante", precio: 0, estado: false}
                ],
                extras: [
                    {nombre: "🥓 Doble Panceta", precio: 30, estado: false},
                    {nombre: "🧀 Doble Chedar", precio: 30, estado: false},
                    {nombre: "🍟Papas con doble chedar", precio: 40, estado: false}
                ]
            });
            this.mostrarPopup = false;
        },
        addPapa: function(tipo){
            this.papas.push({
                id: Date.now(),
                tipo: tipo.nombre,
                precio: tipo.precio,
                editando: false
            });
            this.mostrarPopup = false;
        },
        remove: function(id){
            this.hamburguesas = this.hamburguesas.filter(h => h.id !== id);
        },
        removePapa: function(id){
            this.papas = this.papas.filter(p => p.id !== id);
        },
        calcIndividual: function(hamburguesa){
            var precio = hamburguesa.precio;
            hamburguesa.extras.forEach(ex =>{
                precio += ex.estado? ex.precio : 0;
            })
            return precio;
        },
        send: function() {
            var salto = "%0A";
            this.msg = ""
            this.msg = encodeURI("*Cliente:* " + this.nombre) + salto;
            this.msg += encodeURI("*Orden:* ") + salto;
            
            this.hamburguesas.forEach(h => {
                this.msg += h.tipo + " (con ";
                h.toppings.forEach(top => {
                    this.msg += top.estado? top.nombre + ", " : "";
                });
                h.extras.forEach(ex => {
                    this.msg += ex.estado? ex.nombre + ", " : ''; 
                });
                this.msg = this.msg.toString().slice(0, -2);
                this.msg += ")" + salto;
            })

            this.papas.forEach(p => {
                this.msg += p.tipo + salto;
            });
            
            this.msg += encodeURI("*Total:* $" + this.calcTotal + " (sin envio incluido)") + salto;
            this.msg += this.observaciones != '' ? encodeURI("*Observaciones:* " + this.observaciones) + salto : '';
            this.msg += encodeURI("*Dirección:* " + this.direccion);
            
            window.location.replace("https://wa.me/" + this.number + "?text=" + this.msg);
        }
    },
    computed: {
        calcTotal: function() {
            var total = 0;
            this.hamburguesas.forEach(hamburguesa => {
                total += hamburguesa.precio;
                hamburguesa.extras.forEach(ex => {
                    total += ex.estado? ex.precio : 0;
                });
            });
            this.papas.forEach(papa => {
                total += papa.precio;
            });
            return total;
        }
    }
});