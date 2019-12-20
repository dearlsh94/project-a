import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { initFirebase } from './shared/Firebase';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MenuBar from './MenuBar';
import Home from './pages/Home';
import SheetHome from './pages/Sheet/SheetHome';
import SheetCreate from './pages/Sheet/SheetCreate';
import SheetView from './pages/Sheet/SheetView';

const classes: any = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  },
}));

interface IStates {
  isLoaded: boolean,
}

export default class App extends Component<{}, IStates> {

    constructor(props: {}) {
      super(props);

      initFirebase();

      this.state = {
        isLoaded: true,
      }
    }

    async loadResource() {
      await new Promise(() => {
        setTimeout(() => {
          console.log("Now Loading...");
        }, 1000);
      })
      .then(() => {
        this.setState({
          isLoaded: true,
        });
      });
    }

    render() {
        const { isLoaded } = this.state;

        if (!isLoaded) {
          return (
            <div>
              isLoaded...
            </div>
          )
        }
        else {
          return (
            <React.Fragment>
              <CssBaseline />
              <MenuBar/>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <BrowserRouter>
                      <Route exact path="/" component={Home}/>
                      <Route exact path="/sheet" component={SheetHome}/>
                      <Route exact path="/sheet/create" component={SheetCreate}/>
                      <Route exact path="/sheet/view" component={SheetView} />
                    </BrowserRouter>
                </Container>
              </main>
            </React.Fragment>
          )
        }
    }
}