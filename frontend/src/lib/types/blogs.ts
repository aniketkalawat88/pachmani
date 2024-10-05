export interface Image {
    fileId:string | any,
    url:string | any
}

export interface blogs {
    _id:string,
    content : string,
    author:string,
    title:string,
    tag:[],
    image:Image,
    createdAt:string,
}