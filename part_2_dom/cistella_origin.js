// TODO: document.addEventListener > Utilizara esto
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

//TODO: no se deberia añadir en afegirProduce > #afegir?
class Cistella {
    constructor(){
        this.productes=[]
        this.total=0
        this.taula=document.querySelector('#taula tbody');
        this.totalHTML=document.querySelector('#total');
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

//DOM ***no entender***
// Crear una instancia de la cesta
const cistella = new Cistella();
// Asignar directamente la función al evento 'onclick' del botón
const botonAñadir = document.querySelector('#afegir');
botonAñadir.onclick = function (){
    // Obtenemos los valores de los campos del formulario    
    const desc = document.querySelector('#desc').value;
    const preu = document.querySelector('#preu').value;
    const quantitat = document.querySelector('#quantitat').value;

    // Validamos que los campos no estén vacíos
    if (desc && preu && quantitat){
        // Creamos un nuevo objeto Producte con los valores del formulario
        const producte=new Producte(desc, preu, quantitat);
        // Añadimos el producto a la cesta
        cistella.afegirProducte(producte)
    }else{
        alert("Complete los campos.")
    }    
}