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
  } = props;

  return (
    <div className="card">
      <h3>{name}</h3>
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
};

export default Card;
