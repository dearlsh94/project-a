import React, {Component} from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getAllSheet } from '../../shared/Firebase';

import SheetItem from './SheetItem';

import ISheet from '../../models/ISheet';

const classes: any = makeStyles(theme => createStyles({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

interface IProps {

}

interface IState {
  sheets: Array<ISheet>,
  isLoaded: boolean,
}

export default class SheetList extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    
    this.state = {
      sheets: [],
      isLoaded: false,
    }

    getAllSheet()
      .then((datas: any) => {
        console.log("datas", datas);
        const _sheets: Array<ISheet> = [];

        Object.keys(datas.val()).map((key) => {
          _sheets.push(datas.val()[key]);
        });

        this.setState({
          sheets: _sheets,
          isLoaded: true,
        });
      });
  }

  render() {
    const { sheets, isLoaded } = this.state;

      return (
        <div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              
              {isLoaded ? 
                sheets.map(sheet => (
                  <Grid item key={Number(sheet.key)} xs={12} sm={6} md={4}>
                    <SheetItem
                      sheet={sheet}/>
                    
                  </Grid>
                ))
                : <CircularProgress />
              }
            </Grid>
          </Container>
        </div>
      );  
    }
}