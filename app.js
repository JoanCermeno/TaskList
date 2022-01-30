//recoginedo datos de los inputs Y elementos de la interfaz
const btnPut = document.querySelector('#put');
const NombreTarea = document.querySelector('.name_task');
const DescriptionTarea = document.querySelector('.desciption');
const Info = document.querySelector('#info_btn');
const TableBody = document.querySelector('.TableBody');
const miniModal = document.querySelector('.miniModalOp');
const btEditar = document.querySelector('#btnEditar');
const modal = document.querySelector('.modal');
//Variables Globales, Numero de filas y el objeto para almacenar las lista de tareas
let NumeroFilas = 0;
let tareas = [];
// FUNCIONES DEL BASICAS DEL PROGRAMA
const loadTask = () => {
    TableBody.innerHTML = '';
    for (tarea of tareas) {
        let mostrarFila = `
            <div class="row">
                <span class="idRow">${++tarea.id}</span>
                <div class="valorNombre">
                    ${tarea.name_tarea}
                </div>
                <div class="valorDesciption">${tarea.description_tarea}</div>
            </div>
            `;
        TableBody.innerHTML += mostrarFila;
    }
}
const guardarTarea = (title, description) => {
    let nuevaTarea = {
        id: NumeroFilas,
        name_tarea: title,
        description_tarea: description
    }
    tareas.push(nuevaTarea);
}
const editarTarea = (id, title, description) => {
    console.log("ENTRAMOS A EDITAR TAREA")
    id = Number(id);
    --id;
    let tareaFound = tareas.find(tarea => tarea.id == id);
    if (tareaFound != undefined) {
        tareaFound.name_tarea = title;
        tareaFound.description_tarea = description;
        loadTask();
        modal.classList.add('hidden');
    } else {
        return 'Tarea No encontrada';
    }
}
const pintarInTable = (valor1, valor2) => {
    //generamos una nueva fila
    const promesa = new Promise((resolve, reject) => {
        if (valor1 == '' || valor2 == '') {
            reject('Epa! , Mira no puedes dejar campos vacios ok? asi no funciona');
        }
        if (valor1.lenght >= 20 || valor2.lenght >= 60) {
            reject('Error No puede tener tantos caracteres eseciales');
        } else {
            guardarTarea(valor1, valor2);
            resolve('todo ok');
        }
    });
    promesa.then((res) => {
        const rowGenerada = `
            <div class="row">
                <span class="idRow">${++NumeroFilas}</span>
                <div class="valorNombre">
                    ${valor1}
                </div>
                <div class="valorDesciption">
                ${valor2}
                </div>
            </div>
            `;
        TableBody.innerHTML += rowGenerada;
    }).catch((error) => alert(error));
}
const seleccionarFilas = (e) => {
    let contentPadre = e.target.parentNode;
    if (contentPadre.classList[0] == 'table') {
        //esto es por si se da clic en el fondo de la tabla no se mande al mini modal el contenido de la table xD
        console.log('Se selecciono el fonod de la tabla. XD');
    } else {
        //Agarramos todos los datos de la tarea seleccionada desde el array tareas[];
        let idTarea = contentPadre.children[0].innerHTML;
        idTarea--;
        let tituloTarea = tareas[idTarea].name_tarea;
        let desTarea = tareas[idTarea].description_tarea;
        //epezamos con los eventos
        contentPadre.classList.toggle('selec');
        document.querySelector('.miniModalOp').classList.remove('hidden');
        document.querySelector('#titleMiniModal').innerHTML = `Acciones a realizar sobre el elemento ${++idTarea}`;
        //Evento para disparar el evento de editar, se mete aqui dentro para poder pasar argumentos a
        //a la funcion editar
        btEditar.addEventListener('click', (e) => {
            modal.classList.remove('hidden');
            modal.innerHTML = `<form id="formEditar">
               <h2>${e.target.innerHTML} el elemento ${idTarea}</h2>
               <span>Nuevo Titulo</span>
                <input id="valor1" type="text" value="${tituloTarea}">
                <span>Nueva Descripción</span>
                    <input id="valor2" type="text" value="${desTarea}">
                        <footer class="pieFormEditar">
                            <button id="btnSave">
                                Guardar
                            </button>
                            <button id="btnCancel">
                                Cancelar
                            </button>
                        </footer>
                    </input>
                </input>
            </form>
          `;
            const btnSaveCambios = document.querySelector('#btnSave');
            const btnCancelarModal = document.querySelector('#btnCancel');
            btnCancelarModal.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('hidden');
            });
            btnSaveCambios.addEventListener('click', (e) => {
                e.preventDefault();
                let save = confirm("Seguro de que quieres guardar los cambios?");
                if (save) {
                    console.log("SAVE IS TRUE");
                    let newValor1 = document.querySelector('#valor1').value;
                    let newValor2 = document.querySelector('#valor2').value;
                    if(newValor1 == '' || valor2 == ''){
                        alert("NOS PUEDES DEJAR CAMPOS VACIOS")
                    } else{
                        editarTarea(idTarea, newValor1, newValor2);
                    }
                } else {
                    modal.classList.add('hidden');
                }
            }); 
        });
    }
}

const borrarTarea = (idTarea)=>{
    const tareaFound = tareas.find(element => element.id == idTarea);
    if(tareaFound != undefined){
        
    }
}

const clearInput = () => {
    setTimeout(() => {
        NombreTarea.value = '';
        DescriptionTarea.value = '';
    }, 100);
}

//eventos de la interfaz para poder disparar todas la acciones
btnPut.addEventListener('click', (e) => {
    e.preventDefault();
    pintarInTable(NombreTarea.value, DescriptionTarea.value);
    clearInput();
});
Info.addEventListener('click', (e) => {
    e.preventDefault();
    alert('esto sirve para agregar una lista de cosas que hacer en el dia creado por joan cermeño para ganar una apuestsa');
});

TableBody.addEventListener('click', seleccionarFilas);