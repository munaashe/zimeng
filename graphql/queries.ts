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
    articleCollection(where: { slug: $slug }) {
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
   suggestedArticles: engineeringMagazineCollection(
      limit: 3
      where: { slug_not: $slug, category_contains_some: $category }
    ) {
      items {
        title
        slug
        company
        publishedDate
        featuredImage {
          url
          title
        }
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
    suggestedJobs: jobCollection(
      limit: 3
      where: { slug_not: $slug, industry_contains_some: $industry }
    ) {
      items {
        title
        slug
        company
        type
        deadline
        advertisedDate
        location
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

