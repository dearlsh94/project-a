import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import MySnackBar from '../components/MySnackbar';

interface IState {
    isOpenSnack: boolean,
    snackMessage: string,
}

export default class Test extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        
        this.state = {
            isOpenSnack: false,
            snackMessage: '',
        }
    }
    handleAlert = () => {
        this.setState({
            isOpenSnack: true,
        })
    }

    openSnackbar = () => {
        this.setState({
            isOpenSnack: true,
            snackMessage: "Alert",
        })

        setTimeout(() => {
            this.setState({
                isOpenSnack: false,
            });
        }, 300000);
    }

    closeSnackbar = () => {
        this.setState({
            isOpenSnack: false,
        })
    }
    render(){
        const { isOpenSnack, snackMessage } = this.state;

        return(
            <div
                style={{
                    width: '100%',
                    textAlign: 'center' as 'center',
                  }}>

            <Button onClick={this.openSnackbar}>Open simple snackbar</Button>
            <MySnackBar
                isOpen={isOpenSnack}
                message={snackMessage}
                closeSnackbar={this.closeSnackbar}></MySnackBar>
            </div>
        )
    }
}