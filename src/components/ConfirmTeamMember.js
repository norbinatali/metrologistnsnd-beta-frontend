import React, {Component} from "react";
import {Button,Paper} from "@mui/material";
import {GC_USER_ID, RESET_TOKEN} from '../constants';
import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import PropTypes from "prop-types";


export default class ConfirmTeamMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmteammember:true,
            id: "",
            emailMembers: '',
            memberConfirmToken:'',
        };}
        componentDidMount() {
            const urlObj = new URL(window.location.href);
            const emailMembers = urlObj.searchParams.get('emailMembers');
            const memberConfirmToken = urlObj.searchParams.get('memberConfirmToken');
            this.setState({emailMembers, memberConfirmToken});
    }
    render() {
        const TEAM_MEMBER = gql `mutation ($emailMembers:String!, $memberConfirmToken:String! ) { confirMemberEmail(emailMembers: $emailMembers, memberConfirmToken: $memberConfirmToken){ id}}`;
        const { emailMembers, memberConfirmToken} = this.state;

        return(
            <div>
                <Paper style={{backgroundColor:"white"}}>
                    <label  htmlFor="password">Confirm your membership in Team // Metrologist </label>
                    <Mutation mutation={TEAM_MEMBER}  variables={{emailMembers, memberConfirmToken } } onCompleted={() => this._confirm()}>
                        {mutation => (
                            <Button onClick={mutation}>Submit</Button>)}
                    </Mutation>
                </Paper>
            </div>
        )
    }
    _confirm =() => {
        const {resetToken} = this.props.confirmresetpassword;
        this._saveUserData(resetToken);
    };

    _saveUserData =(id, token, resetToken) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(RESET_TOKEN, resetToken)
    }
}
ConfirmTeamMember.propTypes = {
    confirmresetpassword: PropTypes.node

};
