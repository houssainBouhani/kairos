export interface Hr {
    adressetravaille: Adress;
    adresspresonnel:  Adress;
    contact:          Contact;
    id:               number;
    archiver:         boolean;
  }

  export interface Adress {
    adressdes:  string;
    cityname:   string;
    id:         number;
    regionname: string;
    streetname: string;
    streetno:   number;
    zip:        string;
  }

  export interface Contact {
    activeFlag:   string;
    archiver:     boolean;
    email:        string;
    firstname:    string;
    id:           number;
    insertdate:   Date;
    lastname:     string;
    nationalno:   string;
    password:     string;
    profil:       string;
    raisonsocial: string;
    remarque:     string;
    telephone:    string;
    titleid:      number;
  }
