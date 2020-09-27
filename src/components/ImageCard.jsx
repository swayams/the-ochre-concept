import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Container, Card } from "react-bootstrap";
import Image from "components/Image";
import "./ImageCard.scss";
import bgVideo from "../../content/assets/videos/bg-hero.mp4";

const ImageCard = ({ className, imageFileName, imageAlt, header, subheader, extraInfo }) => {
  return (
    <Card className={clsx("image-card bg-dark text-white text-center", className)}>
      <Image
        className="image d-md-none"
        fileName={imageFileName}
        alt={imageAlt || header || subheader}
      />

      <video className="video d-none d-md-block" autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
        <track kind="captions" />
      </video>
      <Card.ImgOverlay className="no-padding">
        <Container>
          <div className="intro-text">
            <div className="intro-lead-in">{subheader}</div>
            <div className="intro-heading text-uppercase">{header}</div>
            {extraInfo}
          </div>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

ImageCard.propTypes = {
  className: PropTypes.string,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  extraInfo: PropTypes.any,
};

ImageCard.defaultProps = {
  className: null,
  imageFileName: null,
  imageAlt: null,
  header: "",
  subheader: "",
  extraInfo: null,
};

export default ImageCard;
