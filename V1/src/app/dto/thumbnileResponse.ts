
export class ThumbnileResponse{

    entries: Entry[] = [];
}


export class Metadata {


    name: string;
    path_lower: string;
    path_display: string;
    id: string;
    client_modified: string;
    server_modified: string;
    rev: string;
    size: number;
    is_downloadable: boolean;
    content_hash: string;
}

export class Entry {
    '.tag': string;
    metadata: Metadata;
    thumbnail: string;
}


