import IImage from './IImage';
import IMetadata from './IMetadata';

export default interface ISheet {
    key: string | null,
    idx: Number,
    title: String,
    subTitle: String,
    singer: String,
    images: Array<IImage>,
    remark1: String,
    refPath: string,
    tags: Array<string>,
    metadata: IMetadata,
}