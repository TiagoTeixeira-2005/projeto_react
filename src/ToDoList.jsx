import React, {useState, useEffect} from "react";
import "./ToDoList.css";
import Icon from "./assets/icon.png";

function ToDoList(){

    const listaStorage = localStorage.getItem('lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");
    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista));
    },[lista]);

    function addItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById("inputEntrada").focus(); 
    }
    function clicado(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }
    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }
    function deletaTudo(){
        setLista([]);
    }

    return(
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={addItem}>
                <input type="text" 
                id="inputEntrada"
                value={novoItem}
                onChange={(e)=>{setNovoItem(e.target.value)}}
                placeholder="Adicione uma tarefa"/>
                <button className="add" type="submit">Add</button>
            </form>
            <div className="ListaTarefas">
                <div style={{textAlign: "center"}}>
                {
                    lista.length <1
                    ?
                    <img className="iconeCentral" src={Icon}/>
                    :
                    lista.map((item, index)=>(
                        <div
                            key={index} 
                            className={item.isCompleted ? "Item Completo" : "Item"}>
                            <span onClick={()=>{clicado(index)}}>{item.text}</span>
                            <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                        </div>
                    ))
                }
                {
                    lista.length > 0 &&
                    <button onClick={()=>{deletaTudo()}} className="delAll">Deletar Todas</button>
                }
                </div>
            </div>
        </div>
    )
}

export default ToDoList