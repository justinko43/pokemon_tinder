/**
 * ************************************
 *
 * @module  Card
 * @description Reusable functional component that highlights a pokemon factoid with image
 *
 * ************************************
 */

import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const {
    name,
    image,
    description,
    factoid,
    toggleForm,
    toggleEdit,
  } = props;

  return (
    <div className="card">
      <div>
        <h3>{name}</h3>
        <button
          type="button"
          onClick={(e) => {
            toggleForm(e);
            toggleEdit(e);
          }}
        >
          EDIT
        </button>
      </div>
      <img src={image} alt=""/>
      <div className="word-wrapper">
        <p>
          <strong>Description: </strong>
          {description}
        </p>
        <p>
          <strong>Factoid: </strong>
          {factoid}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  factoid: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default Card;
