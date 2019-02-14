import React, { Component } from 'react';
import Card from './Card';
import Form from './Form';

const applyUpdateResult = result => prevState => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
});

const applySetResult = result => prevState => ({
  hits: result.hits,
  page: result.page,
});

class Board extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      list: [{
        name: 'pikachu',
        image: '',
        description: 'test test',
        factoid: 'weeee',
      },
      {
        name: 'pikachu2',
        image: '',
        description: 'test test',
        factoid: 'weeee',
      },
      ],
      atEnd: false,
      form: false,
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.clickFormHandler = this.clickFormHandler.bind(this);
  }

  componentDidMount() {
    // run async call to server here

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

  clickFormHandler(event) {
    event.preventDefault();
    const { form } = this.state;
    this.setState({ form: !form });
  }

  static renderMainView(card, atEnd) {
    const {
      name,
      image,
      description,
      factoid,
    } = card;

    if (atEnd) {
      return (
        <div className="end">
          No more cards available. Make more!
          <button type="button">Toggle Button</button>
        </div>
      );
    }

    return (
      <Card
        name={name}
        image={image}
        description={description}
        factoid={factoid}
      />
    );
  }

  render() {
    const {
      list,
      index,
      atEnd,
      form,
    } = this.state;

    return (
      <div className="board">
        {Board.renderMainView(list[index], atEnd)}
        <div className="button-wrapper">
          <button className="dismiss" type="button" onClick={this.clickHandler}>
            <span role="img" aria-label="thumbs-down">
              👎
            </span>
          </button>
          <button className="favorite" type="button" onClick={this.clickHandler}>
            <span role="img" aria-label="OK-Hand">
              👌
            </span>
          </button>
        </div>
        <div className="add-wrapper">
          <button type="button" className="add" onClick={this.clickFormHandler}>
            Add your own!
          </button>
        </div>
        <div className={!form ? 'hide' : 'scrim'} onClick={this.clickFormHandler}>
          <Form />
        </div>
      </div>
    );
  }
}

export default Board;
