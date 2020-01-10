import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getAllSheet } from '../../shared/Firebase';

import SheetItem from '../../components/SheetItem';

import ISheet from '../../models/ISheet';

const styles: any = {
    heroContent: {
      padding: 100,
    },
    heroButtons: {
      marginTop: 40,
    },
    cardGrid: {
      paddingTop: 80,
      paddingBottom: 80,
    },
    footer: {
      padding: 60,
    },
  };

interface IProps {
  classes: any,
}

interface IState {
  sheets: Array<ISheet>,
  isLoaded: boolean,
}

class SheetList extends Component<IProps, IState> {

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

        if (datas.val()) {
          Object.keys(datas.val()).map((key) => {
            _sheets.push(datas.val()[key]);
          });
  
          this.setState({
            sheets: _sheets,
            isLoaded: true,
          });
        }
        else {
          this.setState({
            isLoaded: true,
          });
        }
      });
  }

  render() {
    const { classes } = this.props;
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

export default withStyles(styles)(SheetList);