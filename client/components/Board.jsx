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
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  async componentDidMount() {
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

  toggleForm(event) {
    if (event) event.preventDefault();
    const { form } = this.state;
    this.setState({ form: !form });
  }

  static renderMainView({ list, index, atEnd }) {
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
      />
    );
  }

  render() {
    const {
      form,
    } = this.state;

    return (
      <div className="board">
        {Board.renderMainView(this.state)}
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
          <Form toggleForm={this.toggleForm} />
        </div>
      </div>
    );
  }
}

export default Board;
