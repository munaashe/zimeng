import { gql } from "graphql-request";


export const GET_ARTICLES = gql`
  query GetArticles {
    articleCollection {
      items {
        slug
        title
        coverImage {
          url
        }
        author {
          name
          image {
            url
          }
          email
          profession
          qualifications
        }
        content {
          json
        }
      }
    }
  }
`;

export const GET_EMPLOYMENT = gql`
  query GetEmployment {
    employmentCollection {
      items {
        title
        company
        image {
          url
        }
        qualifications {
          json
        }
        responsibilities {
          json
        }
        applyBy
        dueDate
      }
    }
  }
`;

export const GET_TENDERS = gql`
    query GetTenders {
        tendersCollection {
           items {
                institution
                deadline
                title
                description {
                    json
                }
                bid {
                    json
                }
            }
        }
    }
`;


export const GET_EVENTS = gql`
    query GetEvents {
        eventsCollection {
            items {
                title
                date
                venue
                description {
                    json
                }
                rsvp {
                    json
                }
            }
        }
    }
`;