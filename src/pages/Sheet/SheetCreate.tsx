import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
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
import IImage from '../../models/IImage';

import { createSheet } from '../../shared/Firebase';
import IMetaData from '../../models/IMetadata';

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
}

interface IState{
    title: string,
    subTitle: string,
    singer: string,
    remark: string,
    images: Array<IImage>,
    refPath: string,
    tags: Array<string>,
    isUploaded: Boolean,
}

class SheetCreate extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        
        this.state = {
            title: '',
            subTitle: '',
            singer: '',
            remark: '',
            images: new Array<IImage>(),
            refPath: '',
            tags: [],
            isUploaded: false,
        }
    };
    
    checkValidate = () => {
        if (this.state.title === '') {
            alert("Please Input Title");
            return false;
        }
            
        if (this.state.singer === '') {
            alert("Please Input Singer");
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

    handleChangeSinger = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            singer: e.target.value,
        });
    };

    handleChangeRemark = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            remark: e.target.value,
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
            remark: '',
            refPath: '',
            images: new Array<IImage>(),
            isUploaded: false,
        });  
    };

    handleUploadSheetImg = ({target}: any) => {
        const imgs = new Array<IImage>();

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

        if (this.checkValidate()) { // true is pass, false is fail.
            const metadata: IMetaData = {
                createDate: new Date().getTime(),
                creater: 'sys',
                editDate: new Date().getTime(),
                editer: 'sys',
                using: true
            }

            const sheet: ISheet = {
                key: null,
                idx: -1,
                title: this.state.title,
                subTitle: this.state.subTitle,
                singer: this.state.singer,
                images: this.state.images,
                remark1: this.state.remark,
                refPath: this.state.refPath,
                tags: this.state.tags,
                metadata: metadata
            }
    
            console.log(sheet);
            
            createSheet(sheet);

            alert("Success");
        }
        
    }

    render() {
        const { classes } = this.props;
        const {images, isUploaded} = this.state;

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
                                    name="remark"
                                    variant="outlined"
                                    fullWidth
                                    id="remark"
                                    label="Remark"
                                    onChange={this.handleChangeRemark}
                                    value={this.state.remark}
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
                                        <Typography>Preview</Typography>
                                        {
                                            images.map((image, index) => 
                                            (
                                                <div key={index}>
                                                    <img id={image.idx.toString()} src={image.fileUrl} alt={image.fileName} width="100%" height="auto"/>
                                                    <Typography>{image.fileName}</Typography>
                                                </div>
                                            ))
                                        }
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

export default withStyles(styles)(SheetCreate);