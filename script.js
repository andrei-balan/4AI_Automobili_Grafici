var _btnCarica = null;
var _inputFile = null;

window.onload = function(){
    _btnCarica = document.getElementsByTagName("button")[0];
    _btnCarica.addEventListener("click", onbtnCarica);

    //input[type=file] -> prelevo il primo input di tipo file
    _inputFile = document.querySelector("input[type=file]");


};

function onbtnCarica(){
    alert("Sto per caricare il file");

    console.log(_inputFile);
    console.log(_inputFile.files);

    let reader = new FileReader();
    //Indico alla libreria chi contattare terminata la lettura
    reader.onload =  function(datiletti){
        //console.log(datiletti);
        //console.log(datiletti.currentTarget.result);

        let dati = datiletti.currentTarget.result.split(",");
        console.log(atob(dati[1]));

        let datiDecodificati = atob(dati[1]);

        console.log(datiDecodificati.split("\n"));

        let righe = datiDecodificati.split("\r\n");
        let record = [];
        let colonne = [];


        

        for(let i = 0; i < righe.length; i++){
            righe[i] = righe[i].replaceAll("\"","");
            colonne = righe[i].split(",");
            record.push(colonne);
        }


        console.log(record)
        let main = document.getElementById("main");
               //Creazione dinamica della tabella: 1,3,5,7,8
               let tabella = document.createElement("table");
               let thead = document.createElement("thead");
               let tbody = document.createElement("tbody");
               tabella.appendChild(thead);
               tabella.appendChild(tbody);
                main.appendChild(tabella);
       
               //Intestazione
               let intestazione = "<tr>";
               for(let idColonna in record[0]){
                   if([1,3,5,7,8].includes(parseInt(idColonna)))
                       intestazione += `<th>${record[0][idColonna]}</th>`;
               }
               intestazione += "</tr>";
               thead.innerHTML = intestazione;
       
               //Dati
               dati = "";
               for(let i=1; i< record.length; i++){
                   dati += "<tr>";
                   for(let idcolonna in record[i]){
                       if([1,3,5,7,8].includes(parseInt(idcolonna)))
                           dati += `<td>${record[i][idcolonna]}</td>`;
                   }
                   dati += "</tr>";
               }
               tbody.innerHTML = dati;
        


        

    };

    //Passo il file e avvio la lettura
    reader.readAsDataURL(_inputFile.files[0]);
}