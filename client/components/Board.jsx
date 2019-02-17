import React, { Component } from 'react';
import Card from './Card';
import Form from './Form';

import fetcher from '../util/fetcher';

const helperFetch = fetcher('http://localhost:3000/');

class Board extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      list: [],
      atEnd: false,
      form: false,
      edit: false,
    };

    this.getPokemons = this.getPokemons.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    this.getPokemons();
  }

  async getPokemons() {
    const response = await helperFetch('pokemons', 'GET', { 'Content-Type': 'application/json' });
    this.setState({
      list: [...response.data],
    });
  }

  clickHandler(event) {
    event.preventDefault();
    const { list, index } = this.state;
    if (index + 1 < list.length) {
      this.setState({
        index: index + 1,
      });
    } else {
      this.setState({
        atEnd: true,
      });
    }
  }

  toggleEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  toggleForm(event) {
    if (event) event.preventDefault();
    const { form, edit } = this.state;
    const state = { form: !form };
    if (edit) {
      state.edit = false;
    }
    this.setState(state);
  }

  renderMainView() {
    const {
      list,
      index,
      atEnd,
    } = this.state;

    if (list.length === 0) return undefined;
    const {
      name,
      image,
      description,
      factoid,
      _id,
    } = list[index];

    if (atEnd) {
      return (
        <div className="end">
          <h3>No more cards available. Make more!</h3>
          <button type="button" className="add">Add More!</button>
        </div>
      );
    }

    return (
      <Card
        id={_id}
        name={name}
        image={image}
        description={description}
        factoid={factoid}
        toggleEdit={this.toggleEdit}
        toggleForm={this.toggleForm}
      />
    );
  }

  renderForm() {
    const {
      list,
      edit,
      index,
    } = this.state;

    if (edit) {
      return (
        <Form
          {...list[index]}
          toggleForm={this.toggleForm}
          getPokemons={this.getPokemons}
        />
      );
    }

    return (
      <Form
        toggleForm={this.toggleForm}
        getPokemons={this.getPokemons}
      />
    )
  }

  render() {
    const {
      form,
    } = this.state;

    return (
      <div className="board">
        {this.renderMainView()}
        <div className="button-wrapper">
          <button className="dismiss circle" type="button" onClick={this.clickHandler}>
            <span role="img" aria-label="thumbs-down">
              👎
            </span>
          </button>
          <button type="button" className="add" onClick={this.toggleForm}>
            Add your own!
          </button>
          <button className="favorite circle" type="button" onClick={this.clickHandler}>
            <span role="img" aria-label="OK-Hand">
              👌
            </span>
          </button>
        </div>
        <div
          className={!form ? 'hide' : 'scrim'}
          onClick={this.toggleForm}>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default Board;
