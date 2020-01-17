import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ImageIcon from '@material-ui/icons/Image';

import TopBar from '../../TopBar';
import SheetImgPreview from '../../components/SheetImgPreview';
import ISheet from '../../models/ISheet';
import IImage from '../../models/IImage';

import { createSheet, getSheetByKey, updateSheet, dwFirstImgSheet } from '../../shared/Firebase';
import IMetaData from '../../models/IMetadata';
import MySnackBar, {autoHideDuration} from '../../components/MySnackbar';

const styles: any = {
    heroContent: {
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 10,
    },
  };

interface IProps{
    classes: any,
    match: any,
}

interface IState{
    key: string | null,
    sheet: ISheet | null,

    title: string,
    subTitle: string,
    singer: string,
    remark1: string,
    images: Array<IImage>,
    refPath: string,
    tags: Array<string>,
    isUploaded: Boolean,
    isOpenSnack: boolean,
    snackMessage: string,
}

class SheetCreate extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            key: null,
            sheet: null,
            title: '',
            subTitle: '',
            singer: '',
            remark1: '',
            images: [],
            refPath: '',
            tags: [],
            isUploaded: false,
            isOpenSnack: false,
            snackMessage: '',
        }
    };

    componentDidMount() {
        if (this.props.match && this.props.match.params.key) {
            this.initData();
        }
    }

    initData = () => {
        getSheetByKey(this.props.match.params.key)
            .then((data: ISheet) => {
                this.setState({
                    key: data.key,
                    sheet: data,
                    title: data.title,
                    subTitle: data.subTitle,
                    singer: data.singer,
                    remark1: data.remark1,
                    images: data.images,
                    refPath: data.refPath,
                    tags: [],
                    isUploaded: true,
                });
            });
    }

    checkValidate = () => {
        if (this.state.title === '') {
            this.openSnackbar("Please Input Title");

            return false;
        }
            
        if (this.state.singer === '') {
            this.openSnackbar("Please Input Singer");

            return false;
        }
        
        if (!this.state.isUploaded) {
            this.openSnackbar("Please Input File");

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

    handleChangeSinger = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            singer: e.target.value,
        });
    };

    handleChangeRemark = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            remark1: e.target.value,
        });
    };

    handleChangeRefPath = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            refPath: e.target.value,
        });
    };

    handleClear = () => {
        this.setState({
            title: '',
            subTitle: '',
            singer: '',
            remark1: '',
            refPath: '',
            images: [],
            tags: [],
            isUploaded: false,
        });  
    };

    handleUploadSheetImg = ({target}: any) => {
        let imgs = new Array<IImage>();
        if (this.state.images.length > 0) {
            imgs = this.state.images;
        }

        for (let i=0; i<target.files.length; i++) {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(target.files[i]);

            fileReader.onload = () => {
                const img: IImage = {
                    idx: i,
                    file: target.files[i],
                    fileName: target.files[i].name,
                    fileUrl: URL.createObjectURL(target.files[i]),
                }

                console.log(img);

                imgs.push(img);

                if (i === target.files.length-1) {
                    console.log(imgs);
                    this.setState({
                        images: imgs,
                        isUploaded: true,
                    });
                }
            }
        }
    }

    handleCreateSheet = () => {

        this.setState({
            isOpenSnack: true,
            snackMessage: "Created",
        })
        
        if (this.checkValidate()) { // true is pass, false is fail.
            if (this.state.key && this.state.sheet) {
                //edit mode
                const s: ISheet = this.state.sheet;
                const m: IMetaData = {
                    createDate: s.metadata.createDate,
                    creater: s.metadata.creater,
                    editDate: new Date().getTime(),
                    editer: 'editer',
                    using: true
                }
                s.metadata = m;

                s.title = this.state.title;
                s.subTitle = this.state.subTitle;
                s.singer = this.state.singer;
                s.images = this.state.images;
                s.remark1 = this.state.remark1;
                s.refPath = this.state.refPath;
                s.tags = this.state.tags;

                updateSheet(s)
                    .then((res) => {

                        this.setState({
                            isOpenSnack: true,
                            snackMessage: "Modified",
                        })
                    
                        alert("Modified.");
                    })
                    .catch(() => {
                        alert("Modify Failed!!!");
                    });
            }
            else {
                //create mode
                const metadata: IMetaData = {
                    createDate: new Date().getTime(),
                    creater: 'creater',
                    editDate: new Date().getTime(),
                    editer: 'creater',
                    using: true
                }
                const sheet: ISheet = {
                    key: null,
                    idx: -1,
                    title: this.state.title,
                    subTitle: this.state.subTitle,
                    singer: this.state.singer,
                    images: this.state.images,
                    remark1: this.state.remark1,
                    refPath: this.state.refPath,
                    tags: this.state.tags,
                    metadata: metadata
                }
        
                console.log(sheet);
                
                createSheet(sheet)
                    .then(() => {
                        alert("Created!!");
                    })
                    .catch(() => {
                        alert("Create Failed!!");
                    });
            }
        }
    }
    
    handleResetImages = () => {
        console.log("handleResetImages");
        this.state = {
            ...this.state,
            images: [],
        }
    }

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

    closeSnackbar = () => {
        this.setState({
            isOpenSnack: false,
        });
    }

    render() {
        const { classes } = this.props;
        const {images, isUploaded, isOpenSnack, snackMessage} = this.state;

        return(
            <div>
                <CssBaseline />
                <TopBar
                    barText="Sheet Create"/>
                <MySnackBar
                    isOpen={isOpenSnack}
                    message={snackMessage}
                    closeSnackbar={this.closeSnackbar}></MySnackBar>
                {/*
                    isOpenSnack &&
                    <MySnackBar
                        message={snackMessage}></MySnackBar>
                */}
                <div className={classes.heroContent}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                <AudiotrackIcon/>New Music Sheet
                            </Typography>
                            <form ref="sheet-form" className={classes.form} noValidate>
                            {!this.state.key ?
                                <Typography
                                    onClick={this.handleClear}>
                                    clear
                                </Typography>
                                :
                                <Typography></Typography>
                            }
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
                                    name="singer"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="singer"
                                    label="Singer"
                                    onChange={this.handleChangeSinger}
                                    value={this.state.singer}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="remark1"
                                    variant="outlined"
                                    fullWidth
                                    id="remark1"
                                    label="remark1"
                                    onChange={this.handleChangeRemark}
                                    value={this.state.remark1}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="refPath"
                                    variant="outlined"
                                    fullWidth
                                    id="refPath"
                                    label="Reference Path"
                                    onChange={this.handleChangeRefPath}
                                    value={this.state.refPath}
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
                                        multiple
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
                                        <SheetImgPreview
                                            imgs={images}
                                            onReset={this.handleResetImages}>
                                        </SheetImgPreview>
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
                                    {!this.state.key ?
                                        "Create"
                                        : "Modify"
                                    }
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

export default withStyles(styles)(SheetCreate);