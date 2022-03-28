import gql from "graphql-tag";

export const LETTER_MUTATION = gql`mutation ($from: String!, $text: String!, $subject: String!){createNewLetter(text:$text , subject: $subject,from:$from){text,subject,from}}`
export const LOGIN_QUERY = gql`mutation ($email:String!, $password:String!) { login(email:$email , password: $password){token,user{id, posts{id, title}}}}`;
export const SIGNUP_MUTATION = gql`mutation ($email: String!, $password: String!, $name: String!, $companyName:String){signup(email:$email , password: $password,name:$name, companyName: $companyName){token}}`;
export const CREATE_MYDEVICE = gql`mutation($name_device: String!,$brand_device:String!,$series_device:String!,$kind_device: String!,$certificate_calibration:Boolean,$certificate_verification:Boolean,$certificate_conformity:Boolean,$module_device: String, $tr_device:String,$certificate_assessment_number:String,$certificate_verification_number:String,$certificate_calibration_number:String, $department_assessment_center:String,$department_verification_center:String,$department_calibration_center:String,$conformity_data:Date, $calibration_data:Date,$valid_verification:Date,$notes:String,){ createNewMyDevice(name_device:$name_device,brand_device:$brand_device,series_device:$series_device,kind_device:$kind_device,certificate_calibration:$certificate_calibration,certificate_verification:$certificate_verification,certificate_conformity:$certificate_conformity,module_device:$module_device, tr_device: $tr_device,certificate_assessment_number: $certificate_assessment_number, certificate_calibration_number: $certificate_calibration_number, certificate_verification_number: $certificate_verification_number,department_assessment_center: $department_assessment_center, department_calibration_center: $department_calibration_center,department_verification_center: $department_verification_center,conformity_data:$conformity_data,calibration_data: $calibration_data,valid_verification:$valid_verification,notes:$notes){
    id
    name_device
    brand_device
    series_device
    kind_device
    certificate_calibration
    certificate_verification
    certificate_conformity
    module_device
    tr_device
    certificate_assessment_number
    certificate_verification_number
    certificate_calibration_number
    department_assessment_center
    department_verification_center
    department_calibration_center
    conformity_data
    calibration_data
    valid_verification
    notes
    
}}`;
export const DELETE_MYDevice = gql`mutation ($id:ID!){deleteMyDevice(id:$id){ id }}`;
export const CONFRIM_EMAIL = gql`mutation ($email:String!, $emailConfirmToken:String! ) {confirmEmail(email:$email,emailConfirmToken:$emailConfirmToken){token} }`;
export const RESET_PASSWORD = gql`mutation ($email:String!, $resetToken:String!,$password:String! ) { passwordReset(email: $email, resetToken: $resetToken, password: $password){ email  }}`;
export const FORGET_PASSWORD = gql`mutation ($email:String!) { triggerPasswordReset(email: $email){ ok,resetToken }}`;
export const MUTATION_CREATETEAM = gql`mutation($name:String! ){createNewTeam(name: $name){id name payment}}`;
export const MUTATION_ADDMEMBER = gql`mutation($emailMember:String!, $id:ID! ){createTeamMembers(emailMember: $emailMember, id:$id){id emailMember member memberConfirmToken}}`;
export const MUTATION_APPOINTMENTS = gql`mutation ($title:String, $start_date:DateTime, $end_date:DateTime, $location:String, $notes:String){createNewAppointment(title: $title,start_date:$start_date,end_date: $end_date,location: $location,notes: $notes){
    title,
    start_date,
    end_date,
    location,
    notes,
}}`
export const TEAM_MEMBER = gql `mutation ($emailMembers:String!, $memberConfirmToken:String! ) { confirMemberEmail(emailMembers: $emailMembers, memberConfirmToken: $memberConfirmToken){ id}}`;
export const UPGRADE_USER = gql`mutation($email:String!, $country:String, $name:String, $companyName:String){upgradeUser(email: $email,companyName: $companyName,country: $country,name: $name){
        name
        companyName
        country
    }}`
export const CHANGE_PASSWORD = gql`mutation($oldpassword:String!, $newpassword:String!,$email:String!){changePassword(email: $email,oldpassword: $oldpassword,newpassword: $newpassword){
        id
        email
        name
    }}`;
