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
  query GetJobs($type: String, $industry: [String]) {
    jobCollection(where: {
      OR: [
        { type: $type, industry_contains_some: $industry },
        { type: null, industry_contains_some: null }
      ]
    }) {
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
    engineeringMagazineCollection(where: { slug: $slug }, limit: 1) {
     items {
        title
        description {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
              }
            }
          }
        }
        publishedDate
        featuredImage {
          url
        }
        slug
        category
        author {
          name
        }
      }
    }
  }
`;

//job
export const GET_JOB_BY_SLUG = gql`
  query GetJobBySlug($slug: String!) {
    jobCollection(where: { slug: $slug }, limit: 1) {
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
           links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
              }
            }
          }
        }
        responsibilities{
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
              }
            }
          }
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
    eventCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        date
        venue
        slug
        description {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
              }
            }
          }
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
    opportunityCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        deadline
        institution
        description {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

//tender
export const GET_TENDER_BY_SLUG = gql`
  query GetTenderBySlug($slug: String!) {
    tenderCollection(where: { slug: $slug }, limit: 1) {
       items {
        title
        slug
        deadline
        institution
        details {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
              }
            }
          }
        }
        bid {
          json
        }
      }
    }
  }
`;

//egb
export const GET_EGB = gql`
   query GeEgb {
    egbCollection {
      items {
        title
        type
        excerpt
        featuredImage {
          url
          title
        }
        details{
          json
        }
        slug
      }
    }
  }
`;

export const GET_EGB_BY_SLUG = gql`
   query GetEgbBySlug($slug: String!) {
    egbCollection(where: { slug: $slug }, limit: 5) {
      items {
        title
        type
        excerpt
        featuredImage {
          url
          title
        }
        details {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
              }
            }
          }
        }
        slug
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

//pages
export const GET_PAGE_DATA = gql`
  query GetPageData($slug: String!) {
    pageCollection(where: { slug: $slug }) {
      items {
        title
        details{
          json
        }
        slug
      }
    }
  }
`;

export const GET_ADS = gql`
  query GetAds  {
    adCollection {
      items {
        link
        poster {
          url
          title
        }
      }
    }
  }
`;

export const GET_LOGO = gql`
  query GetLogo {
    asset(id: "5i8P1UI9TGSpG8HEft8CT0") {
      url
      title
    }
  }
`;
