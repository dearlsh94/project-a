import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const autoHideDuration: number = 6000;

/* example handle function at parrent component
** add state
    isOpenSnack: boolean,
    snackMessage: string,

** Open Alert
    openSnackbar = (message: string) => {
        this.setState({
            isOpenSnack: true,
            snackMessage: message,
        })

        setTimeout(() => {
            this.setState({
                isOpenSnack: false,
            });
        }, autoHideDuration);
    }
** Close Alert
    closeSnackbar = () => {
        this.setState({
            isOpenSnack: false,
        });
    }
*/
const styles: any = {
    root: {
        width: '100%',
        textAlign: 'center' as 'center',
    },
    content: {
    }
}

// Css override
const GlobalCss = withStyles({
    '@global': {
        '.MuiSnackbarContent-root': {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            marginTop: "50%",
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        }
    }
})(() => null);

interface IProps {
    classes: any,
    message: string,
    isOpen: boolean,

    closeSnackbar?: () => void,
}
interface IState {
    
}

class MySnackBar extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render(){
        const { classes, message, isOpen, closeSnackbar } = this.props;

        return(
            <div
                className={classes.root}>
            <GlobalCss/>
            {isOpen &&
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={true}
                    autoHideDuration={autoHideDuration}
                    onClose={closeSnackbar}
                    message={message}
                    action={
                    <React.Fragment>
                        {/*
                        <Button color="secondary" size="small" onClick={closeSnackbar}>
                        UNDO
                        </Button>
                        */}
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            }
            </div>
        )
    }
}

export default withStyles(styles)(MySnackBar);