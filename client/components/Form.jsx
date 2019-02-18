/* eslint-disable indent */
/**
 * ************************************
 *
 * @module  Form
 * @description Stateful component that updates or creates new pokemon
 *
 * ************************************
 */

 import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetcher from '../util/fetcher';

const helperFetch = fetcher('/');

class Form extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      description,
      factoid,
      image, // current image link
      id,
    } = this.props;

    this.state = {
      name: name || '',
      description: description || '',
      factoid: factoid || '',
      image: image || '',
      file: null,
      id: id || null,
    };

    this.renderImage = this.renderImage.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      name,
      description,
      factoid,
      image, // current image link
      _id,
    } = props;

    if (_id !== state.id) {
      return {
        name,
        description,
        factoid,
        image,
        id: _id,
        file: null,
      };
    }

    return null;
  }

  clearState() {
    const newState = {
      name: '',
      description: '',
      factoid: '',
      image: '',
      file: null,
      id: null,
    };

    this.setState(newState);
  }


  handleImageChange(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        image: reader.result,
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
    const { toggleForm, getPokemons } = this.props;
    const {
      id,
      name,
      description,
      factoid,
      image,
      file,
    } = this.state;
    let location;

    if (!file) {
      location = image;
    } else {
      const { data } = await this.postImage();
      location = data.location;
    }

    const data = {
      name,
      description,
      factoid,
      image: location,
    };

    if (id) {
      await helperFetch(`pokemons/${id}`,
                  'PUT',
                  { 'Content-Type': 'application/json' },
                  data,
                  false);
    } else {
      await helperFetch('pokemons/',
                  'POST',
                  { 'Content-Type': 'application/json' },
                  data,
                  false);
    }
    this.clearState();
    getPokemons();
    toggleForm();
  }

  renderImage() {
    const { image } = this.state;

    if (image) {
      return <img width="200px" height="200px" src={image} alt="" />;
    }

    return (
      <div className="image-placeholder">
        Please upload an image!
      </div>
    )
  }

  render() {
    const {
      name,
      description,
      factoid,
      image,
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

          <div className="current-image">
            <span>Current Image</span>
            {this.renderImage()}
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
  getPokemons: PropTypes.func.isRequired,
};

Form.defaultProps = {
  name: '',
  description: '',
  factoid: '',
  image: '',
  id: null,
};

export default Form;
