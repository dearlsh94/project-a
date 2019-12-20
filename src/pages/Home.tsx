import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import TopBar from '../TopBar';

const classes: any = makeStyles(theme => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
  }));

export default class Home extends Component<{}, {}> {

    render() {
        return(
            <div>
                <TopBar
                    barText="Home"/>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Main Home
                        </Typography>
                    </Container>
                </div>
            </div>
        );
    }
}