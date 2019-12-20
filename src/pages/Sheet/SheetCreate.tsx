import React, {Component} from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ImageIcon from '@material-ui/icons/Image';

import TopBar from '../../TopBar';
import ISheet from '../../models/ISheet';

import { createSheet } from '../../shared/Firebase';

const classes: any = makeStyles(theme => createStyles({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    create: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

interface IProps{
}

interface IState{
    title: string,
    subTitle: string,
    remark: string,
    file: any,
    fileUrl: any,
    fileName: string,
    isUploaded: Boolean,
}

export default class SheetCreate extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        
        this.state = {
            title: '',
            subTitle: '',
            remark: '',
            file: null,
            fileUrl: null,
            fileName: 'please upload file.',
            isUploaded: false,
        }
    };
    
    checkValidate = () => {
        if (this.state.title === '') {
            alert("Please Input Title");
            return false;
        }
            
        if (this.state.subTitle === '') {
            alert("Please Input Sub Title");
            return false;
        }
        
        if (!this.state.isUploaded) {
            alert("Please Upload File");
            return false;
        }

        return true;
    }

    handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            title: e.target.value,
        });
    };

    handleChangeSubTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            subTitle: e.target.value,
        });
    };

    handleChangeRemark = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            remark: e.target.value,
        });
    };

    handleClear = () => {
        this.setState({
            title: '',
            subTitle: '',
            remark: '',
            file: null,
            fileUrl: null,
            fileName: 'please upload file.',
            isUploaded: false,
        });  
    };

    handleUploadSheetImg = ({target}: any) => {
        const fileReader = new FileReader();
        
        fileReader.readAsDataURL(target.files[0]);

        fileReader.onload = () => {
            this.setState({
                file: target.files[0],
                fileUrl: URL.createObjectURL(target.files[0]),
                fileName: target.files[0].name,
                isUploaded: true,
            });
        }
    }

    handleCreateSheet = () => {

        if (this.checkValidate()) { // true is pass, false is fail.
            const sheet: ISheet = {
                key: '',
                idx: -1,
                title: this.state.title,
                subTitle: this.state.subTitle,
                imageName: this.state.fileName,
                remark1: this.state.remark,
                createDate: new Date().getTime(),
                creater: 'sys',
                editDate: new Date().getTime(),
                editer: 'sys', 
            }
    
            console.log(sheet);
            
            createSheet(sheet, this.state.fileName, this.state.file);

            alert("Success");
        }
        
    }

    render() {
        const {isUploaded} = this.state;

        return(
            <div>
                <CssBaseline />
                <TopBar
                    barText="Sheet Create"/>
                <div className={classes.heroContent}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                <AudiotrackIcon/>New Music Sheet
                            </Typography>
                            <form ref="sheet-form" className={classes.form} noValidate>
                            <Typography
                                onClick={this.handleClear}>
                                clear
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="title"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    onChange={this.handleChangeTitle}
                                    value={this.state.title}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="subtitle"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="subtitle"
                                    label="Sub Title"
                                    onChange={this.handleChangeSubTitle}
                                    value={this.state.subTitle}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="remark"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="remark"
                                    label="Remark"
                                    onChange={this.handleChangeRemark}
                                    value={this.state.remark}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                    color="primary"
                                    accept="image/*"
                                    type="file"
                                    onChange={this.handleUploadSheetImg}
                                    id="button-sheet-file"
                                    style={{ display: 'none', }}
                                    />
                                    <label htmlFor="button-sheet-file">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        component="span"
                                        className={classes.button}
                                        size="large"
                                        color="primary"
                                        startIcon={<ImageIcon/>}
                                    >
                                        Upload *
                                    </Button>
                                    </label>
                                </Grid>
                                {isUploaded &&
                                    <Grid item xs={12}>
                                        <Typography>Preview</Typography>
                                        <img id="sheetImgView" src={this.state.fileUrl} alt={this.state.fileName} width="100%" height="auto"/>
                                        <Typography>{this.state.fileName}</Typography>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.create}
                                    onClick={this.handleCreateSheet}
                                >
                                    Create
                                </Button>
                                </Grid>
                            </Grid>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}