/**
 * TODOS: find a better way to add images to forms and proper submission
 * 
 * idea was that we would post image first, get a location of the image back, and then store that image link in our put/post req.
 */

/* eslint-disable indent */


import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetcher from '../util/fetcher';

const helperFetch = fetcher('http://localhost:3000/');

class Form extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      description,
      factoid,
      image, // current image link
      id,
    } = props;

    this.state = {
      name: name || '',
      description: description || '',
      factoid: factoid || '',
      image: image || '',
      file: null,
      id: id || null,
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleImageChange(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
      });
    };
    reader.readAsDataURL(file);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  async postImage() {
    const { file } = this.state;
    const formData = new FormData();
    formData.append('image', file);

    const response = await helperFetch('images/upload', 'POST', {}, formData, true);
    return response;
  }

  async submitHandler(event) {
    event.preventDefault();
    const { toggleForm } = this.props;
    const location = await this.postImage();

    const {
      id,
      name,
      description,
      factoid,
      image,
    } = this.state;

    const data = {
      name,
      description,
      factoid,
      image: location.data.location,
    };

    if (id) {
      helperFetch(`pokemons/${id}`,
                  'PUT',
                  { 'Content-Type': 'application/json' },
                  data,
                  false);
    } else {
      helperFetch('pokemons/',
                  'POST',
                  { 'Content-Type': 'application/json' },
                  data,
                  false);
    }
    
    toggleForm();
  }

  render() {
    const {
      name,
      description,
      factoid,
    } = this.state;

    return (
      <form onSubmit={this.submitHandler} onClick={(e) => e.stopPropagation()}>
        <h3>Pokemon Card</h3>
        <div className="input-container">
          <div className="input-div">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="input-div">
            <input
              type="file"
              name="image"
              onChange={this.handleImageChange}
            />
          </div>

          <div className="textarea-div">
            <textarea
              name="factoid"
              placeholder="Factoid"
              id="factoid"
              cols="30"
              rows="6"
              value={factoid}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="textarea-div">
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              cols="30"
              rows="6"
              value={description}
              onChange={this.handleInputChange}
            />
          </div>

          <button type="submit" className="add">
            SUBMIT
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  factoid: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
  toggleForm: PropTypes.func.isRequired,
};

Form.defaultProps = {
  name: '',
  description: '',
  factoid: '',
  image: '',
  id: null,
};

export default Form;
