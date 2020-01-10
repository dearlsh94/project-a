import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import TopBar from '../TopBar';

const styles: any = {
    heroContent: {
      backgroundColor: "blue",
    },
  };

interface IProps{
    classes: any,
}

interface IState{

}

class Home extends Component<IProps, IState> {

    render() {
        
        const { classes } = this.props;

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

export default withStyles(styles)(Home);