export interface SecondaryComment {
    ID: string;
    authorID: string;
    authorNick: string;
    authorAva: string;

    content: string;
    thumbCount: number;
    hasThumbed: boolean;
    postDate: string;
}
export interface BlogComment {
    ID: string;
    authorID: string;
    authorNick: string;
    authorAva: string;

    content: string;
    thumbCount: number;
    hasThumbed: boolean;
    postDate: string;

    replys: Array<SecondaryComment>;
}
export interface BlogDisplayDetail {
    ID: string;
    authorID: string;
    authorNick: string;
    authorAva: string;

    content: string;
    thumbCount: number;
    starCount: number;
    hasStared: boolean;
    hasThumbed: boolean;

    title: string;
    postDate: string;
    comments: Array<BlogComment>
};
// for list item - display
export interface BlogDisplayMeta {
    ID: string;
    authorID: string;
    authorNick: string;
    authorAva: string;

    thumbCount: number;
    starCount: number;
    hasStared: boolean;
    hasThumbed: boolean;

    title: string;
    postDate: string;
};
export interface Starable {
    starCount: number;
    hasStared: boolean;
}
export interface Thumbable {
    thumbCount: number;
    hasThumbed: boolean;
}