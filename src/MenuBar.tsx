import React, {Component} from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

const styles: any = {
    root: {
        display: 'flex',
    },
    drawerPaper: {
        zIndex: 1100,
    },
};

interface IProps {
    classes: any,
}

interface IStates {
}

class MenuBar extends Component<IProps, IStates> {

    handleMvHome = () => {
        document.location.href="/";
    }

    handleMvSheet = () => {
        document.location.href="/sheet";
    }

    handleMvSheetCreate = () => {
        document.location.href="/sheet/create";
    }

    handleMvSignUp = () => {
        document.location.href="/user/signup";
    }
    
    handleMvSignIn = () => {
        document.location.href="/user/signin";
    }
    
    handleMvTest = () => {
        document.location.href="/test";
    }

    render() {
        const {classes} = this.props;

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
                        <ListSubheader inset>Dev Quick Link</ListSubheader>
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
                        <ListItemText primary="Sign Up" onClick={this.handleMvSignUp}/>
                        </ListItem>
                        <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign In" onClick={this.handleMvSignIn}/>
                        </ListItem>
                        <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Test" onClick={this.handleMvTest}/>
                        </ListItem>
                    </div>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(MenuBar);