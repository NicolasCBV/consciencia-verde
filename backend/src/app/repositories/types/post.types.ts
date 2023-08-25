export namespace PostTypes {
  export interface ISetContent {
    id?: string;
    name: string;
    content: string[];
    description: string;
  }
  
  export interface ISetImage {
    postId: string;
    file: {
      buffer: Buffer;
      mimetype: string;
      originalName: string;
    };
  }
  
  export interface IDelete {
    id: string;
  }
}
