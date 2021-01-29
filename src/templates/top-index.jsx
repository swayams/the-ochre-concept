import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Navbar from "views/Navbar";
import Top from "views/Top";
import Footer from "views/Footer";
import * as Sections from "views/Sections";
import SEO from "components/SEO";
import Loading from "views/Loading";
// import LanguageSelector from "components/LanguageSelector";
import Fade from "react-reveal/Fade";
import fileNameToSectionName from "../utils/fileNameToSectionName";

import "utils/fixFontAwesome";
import breakDownAllNodes from "../utils/breakDownAllNodes";

import "../style/main.scss";

/**
 * get file name list from content/sections folder
 */
export const query = graphql`
  query IndexQuery($langKey: String!) {
    site {
      siteMetadata {
        keywords
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { order: ASC, fields: [fields___directoryName, fields___fileName] }
    ) {
      nodes {
        frontmatter {
          brand
          anchor
          clients {
            href
            imageFileName
          }
          content
          copyright
          header
          email
          imageFileName
          jumpToAnchor
          jumpToAnchorText
          menuText
          portfolios {
            content
            extraInfo
            header
            subheader
            imageFileNameDetail
            imageFileName
          }
          privacyHref
          privacyText
          services {
            content
            header
            iconName
            imageFileName
          }
          social {
            facebook
            github
            linkedin
            medium
            twitter
          }
          subheader
          teamMember {
            header
            imageFileName
            social {
              facebook
              github
              linkedin
              medium
              twitter
            }
            subheader
            about
          }
          telephone
          termsHref
          termsText
          title
          timeline {
            content
            header
            imageContent
            imageFileName
            subheader
          }
        }
        fields {
          fileName
          directoryName
        }
      }
    }
  }
`;

const IndexPage = ({ data, pathContext: { langKey, /* defaultLang, langTextMap */ } }) => {
  const {
    site: {
      siteMetadata: { keywords, description },
    },
    allMarkdownRemark: { nodes },
  } = data;

  const { topNode, navBarNode, anchors, footerNode, sectionsNodes } = breakDownAllNodes(nodes);

  let langSelectorPart;

  // we dont need lanugage selector for now 
  // if (langTextMap != null && Object.keys(langTextMap).length > 1) {
  //   langSelectorPart = (
  //     <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
  //   );
  // }

  const [isVisible, hideLoading] = useState(true);

  // document.body.style.overflow = "hidden";

  const delay = 3000;

  useEffect(() => {
    setTimeout(() => {
      hideLoading({ isVisible: false });
      // document.body.style.overflow = "visible";
    }, delay);
  }, []);

  return (
    <>
      <SEO lang={langKey} title="Top" keywords={keywords} description={description} />
      <Loading {...isVisible} />
      <Fade when={isVisible} delay={delay * 2}>
        <Navbar
          anchors={anchors}
          frontmatter={navBarNode.frontmatter}
          extraItems={langSelectorPart}
        />
        <Top frontmatter={topNode.frontmatter} />
        {
          // dynamically import sections
          sectionsNodes.map(({ frontmatter, fields: { fileName } }, ind) => {
            const sectionComponentName = fileNameToSectionName(fileName);
            const SectionComponent = Sections[sectionComponentName];

            return SectionComponent ? (
              <SectionComponent
                key={sectionComponentName}
                className={ind % 2 === 1 ? "bg-light" : null}
                frontmatter={frontmatter}
              />
            ) : null;
          })
        }
        <Footer frontmatter={footerNode.frontmatter} />
      </Fade>
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object,
};

IndexPage.defaultProps = {
  pathContext: {
    langKey: "en",
    defaultLang: "en",
    langTextMap: {},
  },
};

export default IndexPage;
