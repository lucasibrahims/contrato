var web3 = new Web3(ethereum);
var lucasAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nome",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_preco",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "nome",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "preco",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "lerDono",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_novoPreco",
          "type": "uint256"
        }
      ],
      "name": "mudarPreco",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_novoNome",
          "type": "string"
        }
      ],
      "name": "mudarNome",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "sacarGrana",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
var lucasEndereco = "0xa911C8355b027DD2178B7896bE813421611Dae12";
let contrato = new web3.eth.Contract(lucasAbi, lucasEndereco);
var infosParagrafo = document.getElementById('infos');
var lerNomeBotao = document.getElementById('nome_btn');
var conectarBotao = document.getElementById('conectar_btn');
var lerPrecoBotao = document.getElementById('preco_btn');
var lerDonoBotao = document.getElementById('dono_btn');
var mudarPrecoBotao = document.getElementById('mudar_preco_btn');
var precoNovoInput = document.getElementById('preco_input');
var mudarNomeBotao = document.getElementById('mudar_nome_btn');
var nomeNovoInput = document.getElementById('nome_input');
var sacarGranaBotao = document.getElementById('sacar_grana_btn');
var addressBotao = document.getElementById('address_btn');
var account = await conectar();


async function conectar(){
    if(ethereum){
        try{
            let accounts = await ethereum.request({method:'eth_requestAccounts'});
            let account = accounts[0];
            alert ("Conectado!");
            return account;
        } catch(err){
            alert('Error');
            console.log(err);
        }
    } else{
        alert('Por favor, instale a carteira');
    }
}

async function lerNome(){
    if(ethereum){
        try {
            let chamada = await contrato.methods.nome().call();
            return chamada;
        }
        catch(err)
        {
            alert('Error');
            console.log(err);
        }
    }
}

async function lerPreco(){
    if(ethereum){
        try {
            let chamada = await contrato.methods.preco().call();
            return chamada;
        }
        catch(err)
        {
            alert('Error');
            console.log(err);
        }
    }
}
async function lerDono(){
    if(ethereum){
        try {
            let chamada = await contrato.methods.lerDono().call();
            return chamada;
        }
        catch(err)
        {
            alert('Error');
            console.log(err);
        }
    }
}
async function mudarPreco(_precoNovoInput){
    try {
        let operacao = await contrato.methods.mudarPreco(_precoNovoInput).send({from:account});
        alert("Preço alterado!");
        return operacao;
    }
    catch (err)
    {
        alert('Error');
        console.log(err);
    }
}
async function mudarNome(_novoNome, _precoAPagar){
    try {
        let operacao = await contrato.methods.mudarNome(_novoNome).send({from:account, value: _precoAPagar});
        alert("Nome alterado!");
        return operacao;
    }
    catch (err)
    {
        alert('Error');
        console.log(err);
    }
}

async function sacarGrana(){
    try {
        let operacao = await contrato.methods.sacarGrana().send({from:account});
        alert("Grana sacada!");
        return operacao;
    }
    catch (err)
    {
        alert('Error');
        console.log(err);
    }
}
function getAddress(){
    try{    
        var address = contrato._address;
        return address;
    }catch(err)
    {
        console.log(err);
    }
}


conectarBotao.addEventListener('click', ()=>{
    conectar().then((response)=>{
        infosParagrafo.innerHTML = `Carteira conectada: ${response}`
    }).catch((err)=>{
        console.log(err);
    });
});

lerNomeBotao.addEventListener('click', ()=>{
    lerNome().then((response)=> {
        infosParagrafo.innerHTML = `O nome do contrato é: ${response}`
    
    }).catch((err)=>{
        console.log(err);
    });
});
lerPrecoBotao.addEventListener('click', ()=>{
    lerPreco().then((response)=>{
        infosParagrafo.innerHTML = `Preço do contrato: ${Number(response)/10 ** 18} ETH`
    }).catch((err)=>{
        console.log(err);
    });
});
lerDonoBotao.addEventListener('click', ()=>{
    lerDono().then((response)=>{
        let accountString = account.toString().toLowerCase();
        let responseString = response.toString().toLowerCase();
        if(accountString === responseString)  
        {
            infosParagrafo.innerHTML = `Eu sou o dono!`;
        }
        else 
        {
            infosParagrafo.innerHTML = `O dono do contrato é: <em>${responseString}</em>`;
        }
    
    }).catch((err)=>{
        console.log(err);
    });
});

mudarPrecoBotao.addEventListener('click', ()=>{
    let novoPreco = Number(precoNovoInput.value) * (10**18)
    mudarPreco(BigInt(novoPreco)).then((response)=>{
        infosParagrafo.innerHTML = `O novo preço é: <em>${novoPreco / (10**18)} ETH</em>`
    }).catch((err)=>{
        console.log(err);
    });
});

mudarNomeBotao.addEventListener('click', async () => {
    let novoNome = nomeNovoInput.value;
    var precoDoContrato = await lerPreco();
    mudarNome(novoNome, precoDoContrato).then((response) =>{
        if(response)
        infosParagrafo.innerHTML = `O novo nome é: <em> ${novoNome}!`
    }).catch((err) => {
        console.log(err);
    });

});
sacarGranaBotao.addEventListener('click', ()=>{
    sacarGrana().then((response)=>{
        if(response) 
        infosParagrafo.innerHTML = `Grana Sacada!`
    }).catch((err)=>{
        console.log(err);
    });
});

addressBotao.addEventListener('click', ()=>{

        infosParagrafo.innerHTML = `O endereço do contrato é: ${getAddress()}.`
});
