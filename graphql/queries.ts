import { gql } from '@apollo/client';

// Query to get all articles
export const GET_ARTICLES = gql`
  query GetArticles {
    engineeringMagazineCollection {
      items {
        title
        description {
          json
        }
        publishedDate
        featuredImage {
          url
          title
        }
        excerpt
        slug
        category
        author {
          name
          qualification
          jobTitle
          picture {
            url
          }
        }
      }
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs {
    jobCollection {
      items {
        title
        location
        description {
          json
        }
        applicationDeadline
        company {
          name
          logo {
            url
          }
        }
      }
    }
  }
`;

// Query to get all tenders
export const GET_TENDERS = gql`
  query GetTenders {
    tenderCollection {
      items {
        title
        closingDate
        description {
          json
        }
        organization {
          name
          logo {
            url
          }
        }
      }
    }
  }
`;

// Query to get all events
export const GET_EVENTS = gql`
  query GetEvents {
    eventCollection {
      items {
        title
        date
        location
        description {
          json
        }
        organizer {
          name
          logo {
            url
          }
        }
      }
    }
  }
`;