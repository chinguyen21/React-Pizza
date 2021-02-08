import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state={
    pizzas: [],
    editPizza: {}
  }

  async componentDidMount(){
    const res = await fetch("http://localhost:3000/pizzas")
    const pizzas = await res.json()
    this.setState({pizzas})
  }

  handleEdit = (pizza) => {
    this.setState({editPizza: pizza})
  }


  handleVege = () => {
    this.setState({
      editPizza: {...this.state.editPizza, vegetarian: !this.state.editPizza.vegetarian}
    })
  }

  handleSize =(event) => {
    event.preventDefault()
    this.setState({
      editPizza: {...this.state.editPizza, size: event.target.value}
    })
  }

  handleTopping = (event) => {
     event.preventDefault()
      this.setState({
        editPizza: {...this.state.editPizza, topping: event.target.value}
      })
  }

  handleSubmit = () => {
    let updatePizza = this.state.editPizza
    let reqPackage = {
      headers: {"Content-Type":"application/json"},
      method: "PATCH",
      body: JSON.stringify(updatePizza)
    }

    fetch(`http://localhost:3000/pizzas/${updatePizza.id}`, reqPackage)
    .then(res => res.json())
    .then(uPizza => this.setState({
      pizzas: this.state.pizzas.map(pizza => pizza.id === uPizza.id ? uPizza : pizza)
    }))
    

  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm editPizza={this.state.editPizza} handleVege={this.handleVege} handleSubmit={this.handleSubmit}
        handleSize={this.handleSize} handleTopping = {this.handleTopping}/>
        <PizzaList pizzas={this.state.pizzas} handleEdit={this.handleEdit} />
        
      </Fragment>
    );
  }
}

export default App;
