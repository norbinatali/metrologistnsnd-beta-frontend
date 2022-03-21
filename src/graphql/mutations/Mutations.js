import gql from "graphql-tag";

export const LETTER_MUTATION = gql`mutation ($from: String!, $text: String!, $subject: String!){createNewLetter(text:$text , subject: $subject,from:$from){text,subject,from}}`
export const LOGIN_QUERY = gql`mutation ($email:String!, $password:String!) { login(email:$email , password: $password){token,user{id, posts{id, title}}}}`;
export const SIGNUP_MUTATION = gql`mutation ($email: String!, $password: String!, $name: String!, $companyName:String){signup(email:$email , password: $password,name:$name, companyName: $companyName){token}}`;
