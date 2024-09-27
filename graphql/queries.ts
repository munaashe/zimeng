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
        slug
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
        deadline
        institution
      }
    }
  }
`;


// query single entities

//article
export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    engineeringMagazineCollection(where: { slug: $slug }) {
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

//job
export const GET_JOB_BY_SLUG = gql`
  query GetJobBySlug($slug: String!) {
    jobCollection(where: { slug: $slug }) {
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
  }
`;

//event
export const GET_EVENT_BY_SLUG = gql`
  query GetEventBySlug($slug: String!) {
    eventCollection(where: { slug: $slug }) {
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


//opportunity
export const GET_OPPORTUNITY_BY_SLUG = gql`
  query GetOpportunityBySlug($slug: String!) {
    opportunityCollection(where: { slug: $slug }) {
      items {
        title
        slug
        deadline
        institution
        description {
          json
        }
      }
    }
  }
`;

//tender
export const GET_TENDER_BY_SLUG = gql`
  query GetTenderBySlug($slug: String!) {
    tenderCollection(where: { slug: $slug }) {
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

//suggestions
export const GET_SUGGESTED_ARTICLES = gql`
  query GetSuggestedArticlesByCategory($category: String!, $limit: Int!, $slug: String!) {
    engineeringMagazineCollection(
      where: { 
        category: $category, 
        slug_not: $slug 
      }, 
      limit: $limit, 
      order: publishedDate_DESC
    ) {
      items {
        title
        publishedDate
        featuredImage {
          url
          title
        }
        slug
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

export const GET_SUGGESTED_JOBS = gql`
  query GetSuggestedJobsByIndustryOrType($industry: [String!], $type: String, $limit: Int!, $slug: String!) {
    jobCollection(
      where: {
        OR: [
          { industry_contains_all: $industry }, 
          { type: $type }
        ],
        slug_not: $slug
      }, 
      limit: $limit, 
      order: advertisedDate_DESC
    ) {
      items {
        title
        company
        type
        industry
        location
        advertisedDate
        deadline
        slug
      }
    }
  }
`;