import React from 'react';
import {Table, TableBody, TableHead, TableRow, TableCell,} from '@mui/material';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {withTranslation} from 'react-i18next';

const GET_Device = gql`query { feedDevice {id name_EN name_UA  module category}}`;

function Categories({t}) {
    return (
        <Query query={GET_Device}>
            {({loading, error, data}) => {
                if (loading) {
                    return <div>Fetching</div>
                }
                if (error) {
                    return <div>error</div>;
                }
                const devicelist = data.feedDevice;
                return (<div><Table aria-label="customized table">
                    <TableHead aria-label="sticky table">
                        <TableRow>
                            <TableCell>{t('Device')}</TableCell>
                            <TableCell>{t('Category')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableRow>{devicelist.map(device =>
                                <div><TableCell component="tr" scope="row"
                                                      key={device.id}>{device.name_EN}</TableCell>
                                </div>)}
                            </TableRow>
                            <TableRow>{devicelist.map(devices =>
                                <div><TableCell component="tr" scope="row"
                                                      key={devices.id}>{devices.name_UA}</TableCell>
                                </div>)}</TableRow></TableRow>
                    </TableBody>
                </Table></div>)
            }}
        </Query>

    );

}

export default withTranslation()(Categories)
