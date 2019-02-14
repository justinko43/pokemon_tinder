import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);
    const {
      title,
      description,
      factoid,
      image,
    } = props;

    this.state = {
      title: title || '',
      description: description || '',
      factoid: factoid || '',
      image: image || '',
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  submitHandler(e) {
    e.preventDefault();
    // perform async call here
    // exit out of form
  }

  render() {
    const {
      title,
      description,
      factoid,
      image,
    } = this.state;

    return (
      <form onSubmit={this.submitHandler} onClick={(e) => e.stopPropagation()}>
        <div className="input-container">
          <div className="input-div">
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
            />
          </div>

          {
            image.length === 0
              ? <img src={image} alt="" />
              : <div className="image-placeholder">Please select an Image</div>
          }

          <div className="input-div">
            <input
              type="file"
              name="image"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="textarea-div">
            <textarea
              name="factoid"
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
              cols="30"
              rows="6"
              value={description}
              onChange={this.handleInputChange}
            />
          </div>

          <button type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  factoid: PropTypes.string,
  image: PropTypes.string,
};

Form.defaultProps = {
  title: '',
  description: '',
  factoid: '',
  image: '',
};

export default Form;
