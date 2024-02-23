import express from 'express'
import conexao from './conexao.js'
import cors from 'cors'

const app = express();
const port = 3000

app.listen(port)

// indica para o express ler body com json
app.use(express.json())


app.use(cors());


// GET
app.get('/selecoes', (req, res) => {

    const sql = "SELECT * FROM selecoes"
    conexao.query(sql, (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json({'erro': error})
        }else{
            res.status(200).json(result)
        }
    })
})

// get por parametro de id
app.get('/selecoes/:id', (req, res) => {
   const sql = "SELECT * FROM selecoes WHERE id =?"
   const id = req.params.id

   conexao.query(sql, id, (error, result) => {
    if(error){
        console.log(error)
        res.status(404).json({'erro': error})
    }else{
        res.status(200).json(result)
    }
   })
})

//POST
app.post('/selecoes', (req, res) => {
    const sql = "INSERT INTO selecoes SET ?;"
    const selecao = req.body

    conexao.query(sql, selecao, (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json({'erro': error})
        }else{
            res.status(201).json(result)
        }
    })
})

// DELETE 
app.delete('/selecoes/:id', (req,res) => {
    const id = req.params.id 
    const sql = "DELETE FROM selecoes WHERE id=?;"

    conexao.query(sql, id, (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json(error)
        }else{
            res.status(200).json(result)
        }
    })
})


// PUT
app.put('/selecoes/:id', (req, res) => {
    const id = req.params.id
    const selecao = req.body
    const sql = "UPDATE selecoes SET ? WHERE id=?;"
    
    conexao.query(sql, [selecao, id], (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json({'erro': error})
        }else{
            console.log(result)
            res.status(201).json(result);
        }
    })
})



