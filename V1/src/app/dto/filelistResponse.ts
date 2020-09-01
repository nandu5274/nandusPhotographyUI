export class filelistResponse {



        entries: Entry[] = [];
        cursor: string;
        has_more: boolean;
    

}

export class Entry {
    '.tag': string;
    name: string;
    path_lower: string;
    path_display: string;
    id: string;
    client_modified: Date;
    server_modified: Date;
    rev: string;
    size: number;
    is_downloadable: boolean;
    content_hash: string;
}
