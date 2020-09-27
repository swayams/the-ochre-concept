import React from "react";
import "./Loading.scss";

import { PropTypes } from "prop-types";
import { Spinner } from "react-bootstrap";

const Loading = ({ isVisible }) => {
  return (
    <div hidden={!isVisible} className="loading-main">
      <div className="spinner-container">
        <Spinner animation="grow" variant="primary" size="sm" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="primary" size="sm" className="last-small-spinner" />
      </div>
    </div>
  );
};

Loading.propTypes = {
  isVisible: PropTypes.bool,
};

Loading.defaultProps = {
  isVisible: true,
};

export default Loading;
