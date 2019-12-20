import React, {Component} from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

const classes: any = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

interface IProps {
}

interface IStates {
}

export default class MenuBar extends Component<IProps, IStates> {

    handleMvHome = () => {
        document.location.href="/";
    }

    handleMvSheet = () => {
        document.location.href="/sheet";
    }

    handleMvSheetCreate = () => {
        document.location.href="/sheet/create";
    }

    render() {
        return(
            <div className={classes.root}>
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <Divider />
                    <List>
                    <div>
                        <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" onClick={this.handleMvHome}/>
                        </ListItem>
                        <ListItem button>
                        <ListItemIcon>
                            <AudiotrackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sheet" onClick={this.handleMvSheet}/>
                        </ListItem>
                    </div>  
                    </List>
                  <Divider />
                    <List>
                    <div>
                        <ListSubheader inset>Developer</ListSubheader>
                        <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sheet Create" onClick={this.handleMvSheetCreate}/>
                        </ListItem>
                        <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Menu 2" />
                        </ListItem>
                        <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Menu 3" />
                        </ListItem>
                    </div>
                    </List>
                </Drawer>
            </div>
        );
    }
}