import React, { useState } from 'react';
import '../styles/Form.css';

function Form() {
    const [tarefas, setTarefasNovas] = useState('');
    const [lista, setTarefasLista] = useState([]);

    function createTask() {
        if (tarefas.length <= 0) {
            alert("Adicione um texto a sua tarefa")
            return
            //o limite de 40 caracteres foi estabelecido para que o texto ficasse mais agradável a tela
        } else if (tarefas.length > 42) {
            alert("Adicione um texto de no máximo 42 caracteres")
            return
        }
        setTarefasLista([...lista, { tarefa: tarefas, realizada: false }]);
        setTarefasNovas('');
    }

    function updateTask(index) {
        if (index >= 0 && index < lista.length) {
            const tarefasAtualizadas = [...lista];
            tarefasAtualizadas[index].realizada = !tarefasAtualizadas[index].realizada;
            setTarefasLista(tarefasAtualizadas);
        }
    }

    function deleteTask(index) {
        const listarTarefas = lista.filter((_, i) => i !== index);
        setTarefasLista(listarTarefas);
    }

    const useTarefas = lista?.length > 0 ? (
        lista.map((tarefa, index) => (
            <tr key={index}>
                <td id="task_text">
                    <span
                        style={{
                            color: tarefa.realizada ? 'green' : 'red',
                        }}
                    >
                        {tarefa?.tarefa}
                    </span>
                    <button onClick={() => updateTask(index)} id="update_task">
                        {tarefa?.realizada ? 'Desmarcar' : 'Concluir'}
                    </button>
                    <button onClick={() => deleteTask(index)} id="delete_task">Deletar</button>
                </td>
            </tr>
        ))
    ) : (
        <p>Nenhuma tarefa disponível.</p>
    );

    return (
        <>
            <h1>Lista de tarefas</h1>
            <div className='form'>
                <div id="form_items">
                    <input
                        type="text"
                        name="create"
                        id="input_create"
                        placeholder='Adicione uma nova tarefa'
                        value={tarefas}
                        onChange={(e) => setTarefasNovas(e.target.value)}
                    ></input>
                    <input
                        type="submit"
                        name="button"
                        id="button_create"
                        value={'Adicionar'}
                        onClick={createTask}
                    ></input>
                </div>

                <div id="list_items">
                    <table>
                        {useTarefas}
                    </table>

                </div>
            </div>
        </>
    );
}

export default Form;
