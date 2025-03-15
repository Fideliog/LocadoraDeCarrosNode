// Função de login com validação simples
async function login() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    // Simula validação simples para o usuário "admin"
    if (user === 'admin' && pass === 'admin') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('main').style.display = 'block';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

// Função para fechar a tela de login
function closeLogin() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('main').style.display = 'none';
}

// Função para exibir a tela selecionada
function showPage(pageId) {
    const pages = ['clientes', 'funcionarios', 'veiculos', 'ordens'];
    pages.forEach(id => document.getElementById(id).style.display = (id === pageId ? 'flex' : 'none'));

    if (pageId === 'clientes') exibirClientes();
    else if (pageId === 'funcionarios') exibirFuncionarios();
    else if (pageId === 'veiculos') exibirVeiculos();
    else if (pageId === 'ordens') exibirOrdens();
}

// Função para buscar dados da API
async function fetchData(url, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        try {
            options.body = JSON.stringify(body);
        } catch (e) {
            console.error("Erro ao converter body para JSON:", body);
            throw new Error("Body inválido");
        }
    }

    try {
        const response = await fetch(url, options);
        const contentType = response.headers.get("content-type");

        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

        // Verifica se a resposta é JSON
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            console.warn("Resposta não é JSON, retornando como texto.");
            return await response.text();
        }
    } catch (error) {
        console.error("Erro na função fetchData:", error);
        alert("Erro ao acessar o servidor.");
        return null;
    }
}

function validateFormData(data) {
    for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null) {
            console.error(`Campo ${key} está indefinido ou nulo`);
            alert(`Erro: Campo ${key} não pode estar vazio.`);
            return false;
        }
    }
    return true;
}

// Função para exibir clientes
async function exibirClientes() {
    const clientes = await fetchData('http://localhost:3000/api/clientes');
    const clientesTable = document.getElementById('clientesTable').querySelector('tbody');
    clientesTable.innerHTML = '';

    if (clientes) {
        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.clienteCPF}</td>
                <td>${cliente.clienteNome}</td>
                <td>${cliente.clienteTel}</td>
            `;
            clientesTable.appendChild(row);
        });
    }
}

// Função para exibir funcionários
async function exibirFuncionarios() {
    const funcionarios = await fetchData('http://localhost:3000/api/funcionarios');
    const funcionariosTable = document.getElementById('funcionariosTable').querySelector('tbody');
    funcionariosTable.innerHTML = '';

    if (funcionarios) {
        funcionarios.forEach(funcionario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${funcionario.funcMatricula}</td>
                <td>${funcionario.funcNome}</td>
                <td>${funcionario.funcDepto}</td>
            `;
            funcionariosTable.appendChild(row);
        });
    }
}

// Função para exibir veículos
async function exibirVeiculos() {
    const veiculos = await fetchData('http://localhost:3000/api/veiculos');
    const veiculosTable = document.getElementById('veiculosTable').querySelector('tbody');
    veiculosTable.innerHTML = '';

    if (veiculos) {
        veiculos.forEach(veiculo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veiculo.veicPlaca}</td>
                <td>${veiculo.veicMarca}</td>
                <td>${veiculo.veicModelo}</td>
            `;
            veiculosTable.appendChild(row);
        });
    }
}

// Função para exibir ordens de serviço
async function exibirOrdens() {
    const ordens = await fetchData('http://localhost:3000/api/Ordem_de_Servico');
    const ordensTable = document.getElementById('ordensTable').querySelector('tbody');
    ordensTable.innerHTML = '';

    if (ordens) {
        ordens.forEach(ordem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ordem.OsNum}</td>
                <td>${ordem.OsClienteCPF}</td>
                <td>${ordem.OsVeicPlaca}</td>
            `;
            ordensTable.appendChild(row);
        });
    }
}

// Funções de CRUD
async function salvarRegistro(section) {
    const data = getFormData(section);
    const url = `http://localhost:3000/api/${section}`;
    const result = await fetchData(url, 'POST', data);

    if (result) {
        alert('Registro salvo com sucesso!');
        showPage(section);
    }
}

async function editarRegistro(section) {
    const data = getFormData(section);
    const id = data.id; // Presume que os registros têm um campo 'id'
    const url = `http://localhost:3000/api/${section}/${id}`;
    const result = await fetchData(url, 'PUT', data);

    if (result) {
        alert('Registro atualizado com sucesso!');
        showPage(section);
    }
}

//funções de exclusão
async function excluirRegistroCliente() {
    const cpf = document.getElementById('clienteCPF').value.trim(); // Obtém o CPF do cliente

    if (!cpf) {
        alert('Por favor, informe o CPF do cliente a ser excluído.');
        return;
    }

    const url = `http://localhost:3000/api/clientes/${cpf}`; // URL com o CPF

    try {
        const result = await fetchData(url, 'DELETE');
        if (result) {
            alert('Cliente excluído com sucesso!');
            showPage('clientes'); // Atualiza a página de clientes após exclusão
        } else {
            alert('Erro ao excluir o cliente.');
        }
    } catch (error) {
        console.error("Erro ao excluir o cliente:", error);
        alert('Houve um erro ao excluir o cliente. Tente novamente.');
    }
}

async function excluirRegistroFuncionario() {
    const matricula = document.getElementById('funcMatricula').value.trim();

    if (!matricula) {
        alert('Por favor, informe a matrícula do funcionário a ser excluído.');
        return;
    }

    const url = `http://localhost:3000/api/funcionarios/${matricula}`;

    try {
        const result = await fetchData(url, 'DELETE');
        if (result) {
            alert('Funcionário excluído com sucesso!');
            showPage('funcionarios');
        } else {
            alert('Erro ao excluir o funcionário.');
        }
    } catch (error) {
        console.error('Erro na função excluirRegistroFuncionario:', error);
        alert('Houve um erro ao excluir o funcionário. Verifique os detalhes no console.');
    }
}

async function excluirRegistroVeiculo() {
    const placa = document.getElementById('veicPlaca').value.trim(); // Obtém a placa do veículo

    if (!placa) {
        alert('Por favor, informe a placa do veículo a ser excluído.');
        return;
    }

    const url = `http://localhost:3000/api/veiculos/${placa}`; // URL com a placa

    try {
        const result = await fetchData(url, 'DELETE');
        if (result) {
            alert('Veículo excluído com sucesso!');
            showPage('veiculos'); // Atualiza a página de veículos após exclusão
        } else {
            alert('Erro ao excluir o veículo.');
        }
    } catch (error) {
        console.error("Erro ao excluir o veículo:", error);
        alert('Houve um erro ao excluir o veículo. Tente novamente.');
    }
}

async function excluirRegistroOrdemServico() {
    const numeroOrdem = document.getElementById('OsNum').value.trim(); // Obtém o número da ordem de serviço

    if (!numeroOrdem) {
        alert('Por favor, informe o número da ordem de serviço a ser excluído.');
        return;
    }

    const url = `http://localhost:3000/api/ordens/${numeroOrdem}`; // URL com o número da ordem

    try {
        const result = await fetchData(url, 'DELETE');
        if (result) {
            alert('Ordem de serviço excluída com sucesso!');
            showPage('ordens'); // Atualiza a página de ordens de serviço após exclusão
        } else {
            alert('Erro ao excluir a ordem de serviço.');
        }
    } catch (error) {
        console.error("Erro ao excluir a ordem de serviço:", error);
        alert('Houve um erro ao excluir a ordem de serviço. Tente novamente.');
    }
}

// Funções para preencher tabelas das novas telas
async function exibirGerenciamento() {
    const usuarios = await fetchData('http://localhost:3000/api/usuarios');
    preencherTabela('usuariosTable', usuarios, ['usuario', 'departamento']);
}

async function exibirCategorias() {
    const categorias = await fetchData('http://localhost:3000/api/categorias');
    preencherTabela('categoriasTable', categorias, ['categoriaVeiculo']);
}

async function exibirDepartamentos() {
    const departamentos = await fetchData('http://localhost:3000/api/departamentos');
    preencherTabela('departamentosTable', departamentos, ['nomeDepartamento']);
}

async function exibirCombustiveis() {
    const combustiveis = await fetchData('http://localhost:3000/api/combustiveis');
    preencherTabela('combustiveisTable', combustiveis, ['tipoCombustivel']);
}

// Função genérica para preencher tabelas
function preencherTabela(tableId, data, columns) {
    const tableBody = document.getElementById(tableId).querySelector('tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = columns.map(col => `<td>${item[col]}</td>`).join('');
        tableBody.appendChild(row);
    });
}

// função para buscar cliente
async function ProcurarCli() {
    const cpf = document.getElementById('buscarCliente').value;

    try {
        const clientes = await fetchData(`http://localhost:3000/api/clientes?cpf=${cpf}`);
        console.log(clientes);

        // Filtra os clientes pelo CPF fornecido
        const clienteEncontrado = clientes.find(c => c.clienteCPF.toString() === cpf);

        if (clienteEncontrado) {
            clearForm('clientes'); // Limpa o formulário antes de preencher
            setFormData('clientes', clienteEncontrado); // Preenche com o cliente correto
            alert("Cliente encontrado!");
        } else {
            alert("Cliente não encontrado!");
            clearForm('clientes');
        }
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        alert("Erro ao buscar cliente.");
    }
}

// função para buscar funcionario
async function ProcurarFun() {
    const matricula = document.getElementById('buscarFuncionario').value;

    try {
        const funcionarios = await fetchData(`http://localhost:3000/api/funcionarios/?matricula=${matricula}`);
        console.log(funcionarios);

        // Filtra os funcionários pela matrícula fornecida
        const funcionarioEncontrado = funcionarios.find(f => f.funcMatricula.toString() === matricula);

        if (funcionarioEncontrado) {
            clearForm('funcionarios'); // Limpa o formulário antes de preencher
            setFormData('funcionarios', funcionarioEncontrado); // Preenche com os dados do funcionário
            alert("Funcionário encontrado!");
        } else {
            alert("Funcionário não encontrado!");
            clearForm('funcionarios');
        }
    } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
        alert("Erro ao buscar funcionário.");
    }
}

// função para buscar veiculo
async function ProcurarVei() {
    const placa = document.getElementById('buscarVeiculo').value;

    try {
        const veiculos = await fetchData(`http://localhost:3000/api/veiculos/?placa=${placa}`);
        console.log(veiculos);

        // Filtra os veículos pela placa fornecida
        const veiculoEncontrado = veiculos.find(v => v.veicPlaca === placa);

        if (veiculoEncontrado) {
            clearForm('veiculos'); // Limpa o formulário antes de preencher
            setFormData('veiculos', veiculoEncontrado); // Preenche com os dados do veículo
            alert("Veículo encontrado!");
        } else {
            alert("Veículo não encontrado!");
            clearForm('veiculos');
        }
    } catch (error) {
        console.error("Erro ao buscar veículo:", error);
        alert("Erro ao buscar veículo.");
    }
}

// função para buscar ordem de serviço
async function ProcurarOds() {
    const OsNum = document.getElementById('buscarOrdem').value;

    try {
        const ordensDeServico = await fetchData(`http://localhost:3000/api/Ordem_de_Servico/?OsNum=${OsNum}`);
        console.log(ordensDeServico);

        // Filtra as ordens de serviço pelo número fornecido
        const ordemEncontrada = ordensDeServico.find(o => o.OsNum.toString() === OsNum);

        if (ordemEncontrada) {
            clearForm('ordens'); // Limpa o formulário antes de preencher
            setFormData('ordens', ordemEncontrada); // Preenche com os dados da ordem de serviço
            alert("Ordem de Serviço encontrada!");
        } else {
            alert("Ordem de Serviço não encontrada!");
            clearForm('ordens');
        }
    } catch (error) {
        console.error("Erro ao buscar Ordem de Serviço:", error);
        alert("Erro ao buscar Ordem de Serviço.");
    }
}


  function getFormData(section) {
    const form = document.getElementById(section); // Obtém o formulário pelo ID da seção
    const data = {}; // Objeto para armazenar os dados capturados

    if (!form) {
        console.error(`Formulário não encontrado para a seção: ${section}`);
        return data; // Retorna vazio se o formulário não for encontrado
    }

    // Seleciona todos os campos do formulário
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach((input) => {
        const { id, name, type, value, checked, required } = input;

        // Usa o `name` como prioridade se existir, senão o `id`
        const fieldName = name || id;

        if (!fieldName) return; // Ignora campos sem `name` ou `id`

        switch (type) {
            case 'radio':
                if (checked) data[fieldName] = value;
                break;

            case 'checkbox':
                if (!data[fieldName]) data[fieldName] = [];
                if (checked) data[fieldName].push(value);
                break;

            case 'date':
                if (value) {
                    const date = new Date(value);
                    data[fieldName] = isNaN(date.getTime()) ? null : value; // Verifica validade da data
                } else {
                    data[fieldName] = null;
                }
                break;

            default:
                data[fieldName] = value.trim() || null; // Remove espaços extras e converte valores vazios para `null`
                break;
        }

        // Valida campos obrigatórios
        if (required && (data[fieldName] === null || data[fieldName] === '' || data[fieldName] === undefined)) {
            console.error(`Campo obrigatório não preenchido: ${fieldName}`);
            throw new Error(`Campo obrigatório "${fieldName}" não pode estar vazio.`);
        }
    });

    return data;
}

function setFormData(section, data) {
    const inputs = document.querySelectorAll(`#${section} input, #${section} select`);
    inputs.forEach(input => {
        if (input.type === 'date') {
            // Para o campo de data
            const dateValue = data[input.id];
            if (dateValue) {
                const date = new Date(dateValue);
                const formattedDate = date.toISOString().split('T')[0]; // Formato yyyy-mm-dd
                input.value = formattedDate;
            }
        } else if (input.type === 'radio') {
            // Para os botões de rádio (sexo e ativo)
            if (input.name === "funcSexo") {
                // Marca o rádio baseado no valor de sexo (M ou F)
                input.checked = input.value === data.funcSexo;
            } else if (input.name === "funcAtivo") {
                // Marca o rádio baseado no valor de ativo (1 ou 0)
                // Convertendo o valor de funcAtivo para string, pois no HTML são 'ativo' ou 'inativo'
                input.checked = (input.value === 'ativo' && data.funcAtivo === 1) || (input.value === 'inativo' && data.funcAtivo === 0);
            }
        } else if (input.type === 'select-one') {
            // Para o campo select (sexo)
            input.value = data[input.id] || '';  // Caso o valor não seja encontrado, deixamos em branco
        } else {
            // Preenche os campos de texto, número, etc.
            input.value = data[input.id] || '';
        }
    });
}

function clearForm(section) {
    const inputs = document.querySelectorAll(`#${section} input, #${section} select`);
    inputs.forEach(input => input.value = '');
}
