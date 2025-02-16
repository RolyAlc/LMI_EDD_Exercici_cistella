// TODO: document.addEventListener > Utilizara estoç
// TODO: hacer prueba de error en caso de que el precio sea un numero y no una letra

class Producte{
    constructor(descripcio, preu, quantitat){
        this.descripcio = descripcio;
        this.preu = parseFloat(preu);
        this.quantitat=parseInt(quantitat);
    }
    CalculaSubtotal(){
        return this.preu * this.quantitat;
    }
    generaHTML(){
        const fila=document.createElement('tr');

        const descColumn=document.createElement('td');
        descColumn.textContent=this.descripcio;
        fila.appendChild(descColumn);

        const preuColumn=document.createElement('td');
        preuColumn.textContent=this.preu + ' €';
        fila.appendChild(preuColumn);

        const quantitaColum=document.createElement('td');
        quantitaColum.textContent=this.quantitat;
        fila.appendChild(quantitaColum);

        const subtotalColumn=document.createElement('td');
        subtotalColumn.textContent=this.CalculaSubtotal().toFixed(2) + ' €';
        fila.appendChild(subtotalColumn);

        return fila;
    }
}

class Cistella {
    constructor(){
        this.productes=[];
        this.total=0;
        this.taula=document.querySelector('#taula tbody');
        this.totalHTML=document.querySelector('#total');
        this.configurarBotonAfegir();
    }
    configurarBotonAfegir(){
        const botoAfegir = document.querySelector('#afegir');
        // self ya q dentor de la función anonima, esta no cambie y apunte a class Cistella
        const self = this;
        //evento
        botoAfegir.onclick = function(){
            // recupera los valores de los campos formularios
            const desc = document.querySelector('#desc').value;
            const preu = document.querySelector('#preu').value;
            const quantitat = document.querySelector('#quantitat').value;
            // Verificar si se han completa los campos correspondiente => desc no esta vacio
            if (desc && preu && quantitat) {
                // crea una nueva instancia
                const producte = new Producte(desc, preu, quantitat);
                //llama al metodo
                self.afegirProducte(producte);
            } else {
                alert("Complete los campos.");
            }
        };
    }

    afegirProducte(producte){
        let existe = false;
        for(let i of this.productes){
            if(i.descripcio===producte.descripcio){
                i.quantitat += producte.quantitat;
                existe=true;
                break;                
            }
        }
        if(!existe){
            this.productes.push(producte);
        }
        const filaHTML=producte.generaHTML();
        this.taula.appendChild(filaHTML);

        this.actualizaTotal();
    }
    actualizaTotal(){
        this.total=0;
        for (let producte of this.productes){
            this.total += producte.CalculaSubtotal();
        }
        this.totalHTML.textContent=this.total.toFixed(2) + ' €';
    }
}
//Crea nueva instancia e inicializa la class Cistella
const cistella = new Cistella();
