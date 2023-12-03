import { gql } from "@apollo/client";

export const GET_FAQS = gql`
  query GetFaqs {
    faq {
      id
      question
      answer
      details
      category
    }
  }
`;
