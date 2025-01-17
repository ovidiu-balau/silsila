import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";
import Layout from "../components/layout";
import GridItem from "../components/grid-item";
import SEO from "../components/SEO";
import { ChildImageSharp } from "../types";

type PageProps = {
  data: {
    firstProject: {
      title: string;
      slug: string;
      cover: ChildImageSharp;
    };
    threeProjects: {
      nodes: {
        title: string;
        slug: string;
        cover: ChildImageSharp;
      }[];
    };
    aboutUs: ChildImageSharp;
    instagram: ChildImageSharp;
  };
};

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;
  grid-template-areas:
    "first-three-projects first-three-projects first-three-projects"
    "three-projects three-projects three-projects";

  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      "first-project first-project first-project about-us"
      "three-projects three-projects three-projects three-projects";
  }

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      "first-project about-us"
      "three-projects three-projects";
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      "first-project"
      "about-us"
      "three-projects"
      "three-projects"
      "three-projects";
  }
`;




const ThreeProjects = styled.div`
  grid-area: three-projects;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;


const FirstThreeProjects = styled.div`
  grid-area: first-three-projects;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;


const Index: React.FunctionComponent<PageProps> = ({
  data: { firstThreeProjects, threeProjects }
}) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        <FirstThreeProjects>
          {firstThreeProjects.nodes.map(project => (
            <GridItem
              to={project.slug}
              key={project.slug}
              aria-label={`View project "${project.title}"`}
            >
              <Img fluid={project.cover.childImageSharp.fluid} />
              <span>{project.title}</span>
            </GridItem>
          ))}
        </FirstThreeProjects>      
        <ThreeProjects>
          {threeProjects.nodes.map(project => (
            <GridItem
              to={project.slug}
              key={project.slug}
              aria-label={`View project "${project.title}"`}
            >
              <Img fluid={project.cover.childImageSharp.fluid} />
              <span>{project.title}</span>
            </GridItem>
          ))}
        </ThreeProjects>
      </Area>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query Index {
    firstThreeProjects: allProjectsYaml(limit: 3, skip: 0) {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    threeProjects: allProjectsYaml(limit: 3, skip: 3) {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
