import React, {Component} from 'react';
import SheetList from './SheetList';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import TopBar from '../../TopBar';

const styles: any = {
    heroContent: {
        content: {
            padding: 100,
            paddingTop: 50,
            paddingBottom: 50,
          },
    },
    heroButtons: {
      marginTop: 20,
    },
  };

interface IProps {
    classes: any,
}

interface IState {
    type: String,
}

class SheetHome extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        
        this.state = {
            type: "C"
        }
    }

    handleMvCreate = () => {
        document.location.href="/sheet/create";
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <TopBar
                    barText="Sheet"/>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Sheet Home
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Contents
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={this.handleMvCreate}>
                                    Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <SheetList/>
            </div>
        );
    }
}

export default withStyles(styles)(SheetHome);