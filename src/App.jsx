import { useRef, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [getTarefas, setTarefas] = useState([])
  const [getEditarefas, setEditarefas] = useState({
    ativo: false,
    tarefa: ""
  })
  const [getInput, setInput] = useState("")
  const inputRef = useRef()

  function salvarTarefas() {
    if (!getInput) {
      alert("Preencha o campo")
      return
    }
    if (getEditarefas.ativo) {
      salvarEdicaoTarefa()
      return
    }
    setTarefas([...getTarefas, getInput])
    toast.success("Tarefa registrada com sucesso", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    setInput("")
    inputRef.current.focus()
  }

  function deletarTarefa(item) {
    const removerTarefa = getTarefas.filter(tarefa => tarefa !== item)
    console.log(removerTarefa)
    setTarefas(removerTarefa)
    toast.success("Tarefa deletada com sucesso", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })

  }

  function salvarEdicaoTarefa() {
    const encontrarIndiceTarefa = getTarefas.findIndex(tarefa => tarefa === getEditarefas.tarefa)
    const todasTarefas = [...getTarefas]

    todasTarefas[encontrarIndiceTarefa] = getInput
    setTarefas(todasTarefas)

    setEditarefas({
      ativo: false,
      tarefa: ""
    })
    setInput("")
    toast.success("Tarefa editada com sucesso", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }


  function editarTarefa(tarefa) {
    setInput(tarefa)
    setEditarefas({
      ativo: true,
      tarefa: tarefa
    })
 

  }

  return (
    <div className="flex flex-col justify-center  items-center mt-40">
      <h1 className="mb-4 font-bold uppercase">Lista de Tarefas</h1>
      <div className="flex items-center gap-2">
        <input className="p-2 border border-gray-500 rounded" ref={inputRef} placeholder="Digite aqui uma tarefa" type="text" value={getInput} onChange={(e) => setInput(e.target.value)} />
        <button className="bg-green-600 p-2 text-slate-50 rounded" onClick={salvarTarefas}>
          {getEditarefas.ativo ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </button>
      </div>

      <ul className="mt-4 w-full max-w-lg flex flex-col gap-2">
        {getTarefas.map((tarefa, index) => (
          <li className="flex items-center justify-between bg-slate-200 p-2 rounded" key={index}>
            <h2 className="font-semibold uppercase">{tarefa}</h2>
            <div className="flex items-center gap-2">
              <button className="bg-red-600 rounded text-white p-1" onClick={() => deletarTarefa(tarefa)}>Excluir</button>
              <button className="bg-zinc-500 rounded text-white  p-1" onClick={() => editarTarefa(tarefa)}>Editar</button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>

  )

}
export default App;

