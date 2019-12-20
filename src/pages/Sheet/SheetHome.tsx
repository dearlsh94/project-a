import React, {Component} from 'react';
import SheetList from './SheetList';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import TopBar from '../../TopBar';

const classes: any = makeStyles(theme => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
  }));

interface ISheetHomeProps {

}

interface ISheetHomeStates{
    type: String,
}

export default class SheetHome extends Component<ISheetHomeProps, ISheetHomeStates> {

    constructor(props: ISheetHomeProps) {
        super(props);
        
        this.state = {
            type: "C"
        }
    }

    handleMvCreate = () => {
        document.location.href="/sheet/create";
    }

    render() {
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