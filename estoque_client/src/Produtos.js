import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Pagination} from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import { Link } from 'react-router-dom';

class Produtos extends Component {

  constructor(props) {
    super(props);
    this.state = {produtos: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/estoque/produtos')
      .then(response => response.json())
      .then(data => this.setState({produtos: data, isLoading: false}))
	.catch(function(error) {
		console.log('Error: \n', error);
	});
  }

  async remove(id) {
    await fetch(`http://localhost:8080/estoque/produto/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.produtos].filter(i => i.id !== id);
      this.setState({produtos: updatedGroups});
    })
	.catch(function(error) {
		console.log('Error: \n', error);
	});
  }

  render() {
    const {produtos, isLoading} = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }
    const produtosList = produtos.map(produto => {
      return <tr key={produto.id}>
      <td style={{whiteSpace: 'nowrap'}}>{produto.id}</td>
      <td style={{whiteSpace: 'nowrap'}}>{produto.nome}</td>
      <td style={{whiteSpace: 'nowrap'}}>{produto.descricao}</td>
      <td style={{whiteSpace: 'nowrap'}}>{produto.preco}</td>
      <td style={{whiteSpace: 'nowrap'}}>{produto.quantidade}</td>
      <td style={{whiteSpace: 'nowrap'}}>{produto.peso}</td>
      <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/produto/" + produto.id}>Editar</Button>
            <Button size="sm" color="danger" onClick={() =>  this.remove(produto.id)}>Excluir</Button>
          </ButtonGroup>
        
      </td>
      </tr>
    });

    let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

    return (     
      <div>   
        <AppNavbar/>
        <Container fluid>

          <Table>
              <thead>
                <tr>
                  <th width="10%">Código</th>
                  <th width="20%">Nome</th>
                  <th width="20%">Descrição</th>
                  <th width="10%">Preço (R$)</th>
                  <th width="5%">Quantidade</th>
                  <th width="5%">Peso(kg)</th>
                  <th width="10%"></th>
                </tr>
              </thead>
            <tbody>
              {produtosList}
            </tbody>
            
          </Table>
        </Container>
        <div class="d-flex justify-content-center">
              <Button color="success" tag={Link} to="/produto/novo">Incluir Produto</Button>
        </div>
      </div>
    );
  }
}

export default Produtos;