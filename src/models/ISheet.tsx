import IImage from './IImage';
import IMetadata from './IMetadata';

export default interface ISheet {
    key: string | null,
    idx: Number,
    title: string,
    subTitle: string,
    singer: string,
    images: Array<IImage>,
    remark1: string,
    refPath: string,
    tags: Array<string>,
    metadata: IMetadata,
}