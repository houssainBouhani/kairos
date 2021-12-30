export interface PrimaryMatter {
    id:              number;
    barcode:         string;
    archiver:        boolean;
    lot:             Lot;
    basic:           Basic;
    description:     string;
    insertDate:      number;
    initialQuantity: number;
    quantityUnit:    string;
    openQuantity:    number;
    dateExp:         Date;
}

export interface Basic {
    id:       number;
    basicdes: string;
    archiver: null;
}

export interface Lot {
    id:          number;
    description: string;
    provider:    Provider;
    reposit:     Reposit;
}

export interface Provider {
    contact: Contact;
}

export interface Contact {
    id:     number;
    profil: string;
    email:  string;
}

export interface Reposit {
    id:          number;
    description: string;
}
