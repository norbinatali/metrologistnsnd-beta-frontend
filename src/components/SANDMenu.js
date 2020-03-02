import React from 'react';
import {Grid, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Toolbar} from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import history from '../history'
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles({
    root: {
        marginTop:'50px',
        width: "100%",
        "@media (min-width: 576px)": {
            maxWidth: "540px",
            marginTop:'80px'
        },
        "@media (min-width: 768px)": {
            maxWidth: "720px",
            marginTop:"50px",
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px",
            marginTop:"50px",
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1340px",
            marginTop:"30px",
        },
    },
});


function SANDMenu({t}){
const classes = useStyles();
    const [value, setValue] = React.useState('9001');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const list =   <BottomNavigation value={value} onChange={handleChange}  showLabels className={classes.root}>
        <BottomNavigationAction label="ISO 17025" value={'17025'} onClick={()=>history.push('/sand/17025')}  />
        <BottomNavigationAction label="ISO 9001" value={'9001'}  />
        <BottomNavigationAction label="ISO 17065" value={'17065'} />
        <BottomNavigationAction label="ISO 8000-1" value={'8000'}  />
        
    </BottomNavigation>
return(
<div>
    <Hidden smDown implementation="css">

            <BottomNavigation value={value} onChange={handleChange}  showLabels className={classes.root}>
                <BottomNavigationAction label="ISO 17025" value={'17025'}  icon={<AssignmentIcon />} />
                <BottomNavigationAction label="ISO 9001" value={'9001'} icon={<AssignmentIcon />} />
                <BottomNavigationAction label="ISO 17065" value={'17065'} icon={<AssignmentIcon />} />
                <BottomNavigationAction label="ISO 8000-1"value={'8000'} icon={<AssignmentIcon />} />
            </BottomNavigation>
    </Hidden>
    <Hidden mdUp>
        {list}
    </Hidden>

</div>

)


}
export default withTranslation() (SANDMenu)
