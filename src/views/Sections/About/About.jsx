import React from "react";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
import { Row, Col } from "react-bootstrap";
import TimelineItem from "components/TimelineItem";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import nl2br from "utils/nl2br";

import "./About.scss";

const { delay, duration } = require("../../../../config/site");

const About = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, timeline } = frontmatter;

  return (
    <PageSection className={className} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
        <Col lg={12}>
          <ul className="timeline">
            {timeline.map(({ content, header, imageContent, imageFileName, subheader }, ind) => (
              <Fade delay={delay * (ind / 2)} duration={duration} key={header}>
                <TimelineItem
                  key={header}
                  invert={ind % 2 === 1}
                  imageFileName={imageFileName}
                  header={header}
                  subheader={subheader}
                  content={content}
                  imageContent={
                    imageContent ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: `<h4>${nl2br(imageContent)}</h4>` }}
                      />
                    ) : null
                  }
                />
              </Fade>
            ))}
          </ul>
        </Col>
      </Row>
    </PageSection>
  );
};

About.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

About.defaultProps = {
  className: null,
  frontmatter: null,
};

export default About;
