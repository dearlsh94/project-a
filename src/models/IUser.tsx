import IMetaData from "./IMetadata";

export default interface IUser{
    uid: string | null,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAgree: boolean,
    metadata: IMetaData,
}