import gql from "graphql-tag";

export const GET_MyDevice = gql`query ($id:ID!){ myDevice(id:$id){ id name_device,brand_device,series_device,kind_device,certificate_calibration,certificate_verification,certificate_conformity,module_device,tr_device,certificate_assessment_number,certificate_verification_number,certificate_calibration_number,department_assessment_center,department_verification_center,department_calibration_center,conformity_data,calibration_data,valid_verification,notes} }`;
export const POSTS_QUERY = gql`query {feed{title,content,author{name}}}`;
export const QUERY_TEAMLIST = gql`query {me{name teams{id name}}}`;
export const QUERY_TEAMMEMBERS = gql`query($id:ID!) {teamList(id:$id){name teamMembers{emailMembers memberConfirmToken member memberConfirmed} author{name}} }`;
export const GET_Device = gql`query { feedDevice {id name_EN name_UA  module category}}`;
export const QUERY_USER = gql`query{me {name, email,country, companyName,appointments{title,location,notes,start_date,end_date},mydevices{certificate_verification,valid_verification,calibration_data,name_device}}}`;

