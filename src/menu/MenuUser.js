        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: 240,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '80%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        border:"1px solid",
        color: 'inherit',
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },

    Control: {
        color:"White",
        margin: theme.spacing(2),
        minWidth: 50,
    },

}));


 function MenuUser({t}) {

    const classes = useStyles();
    const [component, setComponent] = React.useState(' ');
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [valueLang, setValueLang] = React.useState(''
    );
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
     const userId = localStorage.getItem(GC_USER_ID);
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

    };

    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" value={valueLang} onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>

                   <img src={LogoV2} style={{marginRight:"30%",marginLeft:"40%"}}/>
                    <div>
                        <button style={{backgroundColor:"rgba(0,2,14,0.76)",border:"none",outline:"none"}} onClick={() => changeLanguage('ua')}><img src={FlagUA}/></button>
                        <button  style={{backgroundColor:"rgba(0,1,47,0.84)",border:"none",outline:"none"}} onClick={() => changeLanguage('en')}><img src={FlagUS}/></button>
                    </div>
                </Toolbar>

            </AppBar>
            <Drawer classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}} open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose} >
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List >
                    <ListItem button onClick={() => setComponent('dashboard')} >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('Dashboard')} />
                </ListItem>
                    <ListItem  button onClick={() => setComponent('metrology')}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Metrology')} />
                    </ListItem>
                    <ListItem  button onClick={() => setComponent('mydevice')}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('My devices')} />
                    </ListItem>
                    <ListItem button onClick={() => setComponent('sand')}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('SAND')} />
                    </ListItem>
                    <ListItem button onClick={() => setComponent('forum')}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Forum')} />
                    </ListItem>
                    <ListItem button onClick={() => setComponent('apps')}>
                        <ListItemIcon>
                            <ImportantDevicesIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Apps')} />
                    </ListItem>
        </List>
                <Divider />
                <List> <div>
                    <ListSubheader inset>{t('Settings')}</ListSubheader>
                    <ListItem button nClick={() => setComponent('UserPage')}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Change profile')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('About us')} />
                    </ListItem>
                    <ListItem button onClick={() => setComponent('contactus')}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Contacts')} />
                    </ListItem>
                    {userId ?
                        (  <ListItem button onClick={() => {
                            localStorage.removeItem(GC_USER_ID);
                            localStorage.removeItem(AUTH_TOKEN);
                            history.push(`/`)
                        }}>
                            <ListItemIcon>
                                <ExitToApp/>
                            </ListItemIcon>
                            <ListItemText primary={t('logout')}/>
                        </ListItem>): (<div>Please Login</div>)
                    }
                </div></List>
            </Drawer>
            <main style={{ flexGrow: 1, height: '100vh', overflow: 'auto'}}>
                <div style={{paddingRight: 24}} />

                {  component === 'dashboard' ?
                    <div style={{ marginTop: 40, padding: 30 }}>

                        <div style={{ marginTop: 20, padding: 30, marginRight:"10%" }}>
                                <Dashboard/>
                                <div style={{width:"50%", marginLeft:"30%", backgroundColor:"white"}}>
                                    <Typography variant="h5" component="h2">{t('Contact us')}</Typography>
                                    <ContactUS/>
                                </div>
                        </div>
                        </div>

                        :
                        component === 'metrology' ?
                            <div style={{display:"flex"}}>
                                <div style={{ marginTop: 80, padding: 30 }}>
                                    <Typography variant="h5" component="h2">{t('Metrology')}</Typography>
                                    <div style={{ marginTop: 20, padding: 60 }}>
                                       <History/>
                                    </div>
                                </div>
                                </div>
                            :
                            component === 'mydevice' ?
                                <div style={{display:"flex"}}>
                                    <div style={{ marginTop: 80, padding: 20 }}>
                                        <Typography variant="h5" component="h2">{t('My devices')}</Typography>
                                        <MyDevice />
                                    </div>
                                </div>
                                :
                            component === 'sand' ?
                                <div>
                                    <div style={{ marginTop: 80, padding: 20 }}>
                                        <Typography variant="h5" component="h2">{t('Measuring Instrument')}</Typography>
                                    </div>
                                    <div style={{flexGrow: 1, width: '100%'}}>
                                        <div className={classes.root}>
                                            <Paper style={{backgroundColor:"white"}} >
                                                <Standards />
                                            </Paper>
                                        </div>
                                    </div></div>
                                                :
                                component === 'history' ?
                                <History />
                                :
                                component === 'addDevice' ?
                    <AddDevice/>
                    :
                                    component === 'contactus'?
                                        <div style={{backgroundColor:"white"}}>
                                            <div style={{ marginTop: 40, padding: 30,  }}>
                                                <Typography variant="h5" component="h2">{t('Contact us')}</Typography>
                                            </div>
                                            <div style={{flexGrow: 1, width: '100%'}}>
                                                <ContactUS/>
                                            </div>
                                        </div>
                                        :
                                        component === ' ' ?
                                            <div style={{display:"flex"}}>
                                                <div style={{ marginTop: 40, padding: 30 }}>
                                                    <div style={{ marginTop: 20, padding: 30, marginRight:"10%" }}>
                                                        <Dashboard/>
                                                        <div style={{width:"50%", marginLeft:"30%", backgroundColor:"white"}}>
                                                            <Typography variant="h5" component="h2">{t('Contact us')}</Typography>
                                                            <ContactUS/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : component
                }

            </main>



        </div>


    );

}

export default withTranslation()(MenuUser)
