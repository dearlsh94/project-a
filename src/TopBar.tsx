import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const styles: any = {
    root: {
        display: 'relative',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: 1,
    },
    title: {
        flexGrow: 1,
    },
  };

interface IProps {
    classes: any,
    barText: String,
}

interface IStates {

}

class TopBar extends Component<IProps, IStates> {

    render() {
        const {classes, barText} = this.props;

        return(
            <div className={classes.root}>
                <AppBar position="relative" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {barText}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(TopBar);