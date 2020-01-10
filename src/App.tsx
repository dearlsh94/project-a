import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MenuBar from './MenuBar';
import Home from './pages/Home';
import SheetHome from './pages/Sheet/SheetHome';
import SheetCreate from './pages/Sheet/SheetCreate';
import SheetView from './pages/Sheet/SheetView';

import SignUp from './pages/User/SignUp';
import SignUpDone from './pages/User/SignUpDone';
import SignIn from './pages/User/SignIn';

const styles: any = {
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
  },
};

interface IProps {
  classes: any,
}

interface IStates {
}

class App extends Component<IProps, IStates> {

    constructor(props: IProps) {
      super(props);
    }

    render() {
        const { classes } = this.props;

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
                    <Route path="/sheet/view/:key" component={SheetView} />
                    <Route exact path="/user/signup" component={SignUp} />
                    <Route exact path="/user/signup/done" component={SignUpDone} />
                    <Route exact path="/user/signin" component={SignIn} />
                  </BrowserRouter>
              </Container>
            </main>
          </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);