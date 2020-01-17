import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import '../scss/image-gallery.scss';

import { withStyles } from '@material-ui/core/styles';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import IImage from '../models/IImage';

const styles: any = {
    content: {
        width: '100%',
        textAlign: 'center' as 'center',
      },
};

interface ISImage {
    original: string,
    thumbnail: string,
}

interface IProps{
    classes: any,
    imgs: Array<IImage>,

    onReset?: () => void,
}

interface IStates{
    imgUrls: ISImage[],
    isSlideMode: boolean,
}

class SheetImgPreview extends Component<IProps, IStates> {

    constructor(props: IProps){
        super(props);

        const urls: ISImage[] = [];
        
        this.props.imgs.map((image) => {
            const url: ISImage = {
                original: image.fileUrl,
                thumbnail: image.fileUrl,
            }
    
            urls.push(url);
        })
    
        this.state = {
            imgUrls: urls,
            isSlideMode: true,
        }
    }

    handleModeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isSlideMode: e.target.checked,
        });
    };

    removeImgItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        this.setState({
            imgUrls: [],
        })
    };

    render(){

        const { classes, imgs, onReset } = this.props;
        const { imgUrls, isSlideMode } = this.state;

        return(
            <div className={classes.content}>
                <Typography>Preview</Typography>
                <div>
                    <button
                        color="primary"
                        onClick={onReset}
                        id="icon-image-delete"
                        style={{ display: 'none', }}
                    />
                    <label htmlFor="icon-image-delete">
                        <RemoveCircleOutlineIcon/>
                    </label>
                </div>
                <FormControlLabel
                    control={
                    <Switch
                        checked={isSlideMode}
                        onChange={this.handleModeSwitch}
                        value="slide"
                        color="primary"
                    />
                    }
                    label="Slide Mode"
                />
                {
                    isSlideMode ?
                        <ImageGallery
                            items={imgUrls}>
                        </ImageGallery>
                    :
                        imgs.map((image, index) => (
                            <div key={index}>
                                <img id={image.idx.toString()} src={image.fileUrl} alt={image.fileName} width="100%" height="auto"/>
                                <Typography>{image.fileName}</Typography>
                            </div>
                        ))
                }
            </div>
        );
    }
}

export default withStyles(styles)(SheetImgPreview);
