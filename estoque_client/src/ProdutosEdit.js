import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import AppNavbar from './components/AppNavbar';

class ProdutosEdit extends Component {

  emptyItem = {
    id: '',
	nome: '',
    descricao: '',
	preco: '',
	quantidade: '',
	peso: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {  
      const produto = await (await fetch(`http://localhost:8080/estoque/produto/${this.props.match.params.id}`)).json();
      this.setState({item: produto});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    let item = {...this.state.item};
    item[id] = value;
	console.log("Valor: ", item);
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch(
	 (item.id) ? 'http://localhost:8080/estoque/produto/'+(item.id) : 'http://localhost:8080/estoque/produto' , {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/produtos');
  }

  render() {
    const {item} = this.state;
    const title = <h6 class="text-muted">{item.id ? 'Editar Produto' : 'Incluir Produto'}</h6>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          
		<Row>
		  <Col  xs="2">
			  <FormGroup>
				<Label for="id">Código *</Label>
				<Input type="text" name="id" id="id" value={item.id || ''}
					   onChange={this.handleChange} autoComplete="id"/>
			  </FormGroup>
			</Col>
		</Row>
		  
		<Row>
			<Col xs="6">
			  <FormGroup>
				<Label for="nome">Nome *</Label>
				<Input type="text" name="nome" id="nome" value={item.nome || ''}
					   onChange={this.handleChange} autoComplete="nome"/>
			  </FormGroup>
			</Col>
		</Row>
         
		<Row>
      <Col xs="6">
			  <FormGroup>
				<Label for="descricao">Descrição *</Label>
				<Input type="text" name="descricao" id="descricao" value={item.descricao || ''}
					   onChange={this.handleChange} autoComplete="descricao-level1"/>
			  </FormGroup>
			</Col>
		</Row>
		  
		<Row>
			<Col xs='2'>
			  <FormGroup>
				<Label for="preco">Preço (R$) *</Label>
				<Input type="text" name="preco" id="preco" value={item.preco || ''}
					   onChange={this.handleChange} autoComplete="descricao-level1"/>
			  </FormGroup>
			</Col>
		  
			<Col xs='2'>
			  <FormGroup>
				<Label for="quantidade">Quantidade</Label>
				<Input type="text" name="quantidade" id="quantidade" value={item.quantidade || ''}
					   onChange={this.handleChange} autoComplete="descricao-level1"/>
			  </FormGroup>
			</Col>
	  
		  <Col xs='2'>
		  <FormGroup>
            <Label for="peso">Peso (Kg)</Label>
            <Input type="text" name="peso" id="peso" value={item.peso || ''}
                   onChange={this.handleChange} autoComplete="descricao-level1"/>
          </FormGroup>
		  </Col>
		</Row>
		
    <Row>
      <Col>
        <FormGroup>
          <Button color="primary" type="submit">Salvar</Button>{' '}
          <Button color="secondary" tag={Link} to="/produtos">Cancelar</Button>
        </FormGroup>
		  </Col>
    </Row>
      
    </Form>
    <i>* Campos obrigatórios</i>
    </Container>
    </div>
  }
}

export default withRouter(ProdutosEdit);