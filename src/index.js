const express = require('express');
const app = express();
const PORT = 3333;
app.use(express.json());

//Middleware para logar todas as chamadas

app.use((req, res, next) =>{
    console.log(`Solicitação recebida de: ${req.method} - ${req.originalUrl}`)

    next();
})


const produtos = []
//Criando um produto com POST
app.post('/produto', (req, res) => { //usando try catch para manipulação de erros
    try {
        const produto = {nome, preco, descricao}
        produto = req.body;
        produto.id = produtos.length + 1
        produtos.push(produto)

        if(!nome){
            res.status(400).json({mensagem: 'O nome do item é obrigatório'})
        }

        if(!preco){
            res.status(400).json({mensagem: 'O preço do item é obrigatório'})
        }

        if(!descricao){
            res.status(400).json({mensagem: 'A descrição do item é obrigatória'})
        }
        res.status(201).send('Produto adicionado com sucesso')
    } catch (error) {
        res.status(400).send(error)        
    }

});

//rota GET para retornar os produtos do JSON
app.get('/produto', (req, res) =>{
    res.json(produtos)
    

})

app.get('/produto/:id', (req, res)=>{
    try {
        const { id } = req.params
        const index = produtos.findIndex(prod => prod.id === parseInt(id))
        if(index === -1){
            throw new Error('ID do produto não encontrado')
        }else{
            res.send(produtos[index])
    }
        
    } catch (error) {
        res.status(400).send("Not found" + error)
    }
    
})
 
//Rota PUT para atualizar um produto existente
app.put('/produto/:id', (req, res) =>{
    try {
        const { id } = req.params
        const alteraProduto = req.body
        const index = produtos.findIndex(prod => prod.id === parseInt(id)) //procura o produto pelo id
        if (index === -1) {
            throw new Error('ID do produto não encontrado')           
            
        }else {
            produtos[index] = {...produtos[index], ...alteraProduto}
            res.status(200).send(`Produto atualizado: Id: ${produtos[index].id} - Nome: ${produtos[index].produto} - Preço: ${produtos[index].preco} - Descrição: ${produtos[index].descricao}`)
        }
    } catch (error) {
        res.status(400).send("Not found" + error)
    }

    //Rota DELETE para deletar produto 
    app.delete('/produto/:id', (req, res) => {
        try {
            const { id } = req.params
            const index = produtos.findIndex(prod => prod.id === parseInt(id)) //procura o produto pelo id 
            
            if (index === -1){
                throw new Error ('ID não encontrado')
            } else {
                produtos.splice(index, 1)
                res.status(200).send('Produto excluído com sucesso')
            }
            
        } catch (error) {
            res.status(400).send("Not found" + error)            
        }

    })
})





app.listen(PORT, () =>{
    console.log(`Server online in http://localhost:${PORT}`)
});

