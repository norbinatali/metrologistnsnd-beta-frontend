import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, CONFIRM_TEAM_MEMBER, GC_USER_ID, RESET_TOKEN} from '../constants';

import { makeStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";


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
