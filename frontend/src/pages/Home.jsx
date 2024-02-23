import React from 'react'
import "./Home.css"
import { useState, useEffect } from 'react'

const Home = () => {

    const [selecoes, setSelecoes] = useState([])
    const [nome, setNome] = useState("")
    const [grupo, setGrupo] = useState("")
    const [id, setId] = useState(1)
    const [newSelecao, setNewSelecao] = useState([])

    const [modal, setModal] = useState(false)

    // GET
    useEffect(() => {
        try{

        const getData = async () => {
            const res = await fetch('http://localhost:3000/selecoes')
            const data = await res.json()
            setSelecoes(data)
        }
        getData();
        }catch(error){
            console.log("Aconteceu o seguinte erro: " + error)
        }
    }, [])

    // POST
    const handleSubmit = async () => {
        const newSelecao = {nome, grupo};

        const res = await fetch('http://localhost:3000/selecoes', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newSelecao)
        })

        if(res.ok){
            setSelecoes((prevSelecoes) => [...prevSelecoes, newSelecao])
        }else{
            console.log("Aconteceu algum erro!")
        }

        setNome("");
        setGrupo("");
        window.location.reload()
    }

    // DELETE
    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/selecoes/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })

        setSelecoes((prevSelecoes) => prevSelecoes.filter((selecao) => {
            return selecao.id !== id
        }));
    }

    // PUT
    const handlePut = async (selecao) => {
        setModal(true);
        setNewSelecao(selecao)
        console.log(selecao)
    }

    const handleCancelPut = () => {
        setModal(false);
    }

    const handleEdit = async () => {

        const id = newSelecao.id;
        
    
        const data = {id, nome,grupo}

        const res = await fetch(`http://localhost:3000/selecoes/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        if(res.ok) {
            setSelecoes((prevSelecoes) => prevSelecoes.filter((selecao) => {
                return selecao.id !== id

            }));

            setSelecoes((prevSelecoes) => [data, ...prevSelecoes])       
        }

        setModal(false)
        setNome("")
        setGrupo("")
    }

    const selecoesOrdenadas = selecoes.sort((a, b) => a.id - b.id);

  return (
    <div>
        <div className='home'>
            <h1>Seleções</h1>

            <form className='form'>

                    <label>Nome</label>
                    <input type="text" placeholder='Insira o nome da seleção' value={nome} onChange={(e) => setNome(e.target.value)}/>
                

                
                    <label>Grupo</label>
                    <input type="text" placeholder='Insira o grupo da seleção' value={grupo} onChange={(e) => setGrupo(e.target.value)}/>
                

                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Cadastrar</button>
            </form>

            
        </div>

        <table className='table'>
            <thead>
                <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Grupo</th>
                <th>Alterar/Deletar</th>
                </tr>
            </thead>

            <tbody>
                {selecoes.length > 0 && selecoesOrdenadas.map((selecao) => (
                    <tr key={selecao.id}>
                        <td>{selecao.id}</td>
                        <td>{selecao.nome}</td>
                        <td>{selecao.grupo}</td>
                        <td>
                            <button className="btn btn-danger botao" onClick={() => handleDelete(selecao.id)}>Excluir</button> 
                            <button className="btn btn-warning botao"onClick={() => handlePut(selecao)}>Alterar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

          {modal && <form className='formModal'>
                  <h3>Atualize a seleção</h3>
                  <label>Nome</label>
                  <input type="text" placeholder='Insira o novo nome da seleção' onChange={(e) => setNome(e.target.value)}/>

                  <label>Grupo</label>
                  <input type="text" placeholder='Insira o novo grupo da seleção' onChange={(e) => setGrupo(e.target.value)}/>

                  <div className='button-modal'>
                  <button type="button" className="btn btn-primary" onClick={handleEdit}>Alterar</button>
                  <button className="btn btn-danger" onClick={handleCancelPut}>Cancelar</button>
                  </div>
          </form>}

    </div>
  )
}

export default Home