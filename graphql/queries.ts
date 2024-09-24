import { gql } from '@apollo/client';

// Query to get all articles
export const GET_ARTICLES_WITH_CATEGORIES = gql`
  query GetArticles($limit: Int!, $skip: Int!, $category: String) {
    engineeringMagazineCollection(limit: $limit, skip: $skip, where: { category: $category }) {
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
      total
    }
    categories: engineeringMagazineCollection {
      items {
        category
      }
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs {
    jobCollection {
      items {
        title
        company
        type
        industry
        location
        advertisedDate
        deadline
        qualifications{
           json
        }
        responsibilities{
          json
        }
        slug
        apply{
          json
        }
      }
    }
    industries: jobCollection {
      items {
        industry
      }
    }
    types: jobCollection {
      items {
        type
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
        slug
        deadline
        institution
        details {
          json
        }
        bid {
          json
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
        venue
        slug
        description {
          json
        }
        rsvp {
          json
        }
        poster {
          url
        }
      }
    }
  }
`;

//query opportunities

export const GET_OPPORTUNITIES = gql`
  query Getopportunities {
    opportunityCollection {
      items {
        title
        slug
        description {
          json
        }
      }
    }
  }
`;