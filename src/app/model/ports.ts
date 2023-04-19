export interface Ports {
    count: Number;
    next: Number;
    previous: Number;
    results: PortInformations[];
}

export interface PortInformations {
    id: Number;
    name: String;
    code: String;
    isoLocode:String
    portType: String;
    description: String;
    latitude: Text;
    longitude: String;
    countryId: Text;
    stateId: Text;
    cityId: Text;
    pincode: Text;
    sector: number;
    localIgmRequired: boolean;
    transhipmentIgmRequired: boolean;
    localEgmRequired: boolean;
    countryName: Text;
    countryCode: Text;
    stateName: Text;
    stateCode: Text;
    cityName: Text;
    cityCode: Text;
    sectorName: Text;
    sectorCode: Text;
    currencyId: Text;
    currencyCode: Text;
    primaryOfficeId: Text;

  }

  export interface PostPort {
    name: String;
    code: String;
    portType: String;
    isoLocode: String;
    description: String;
    latitude: String;
    longitude: String;
    countryId: String;
    stateId: String;
    cityId: String;
    pincode: String;
    sector: number;
    localIgmRequired: boolean;
    transhipmentIgmRequired: boolean;
    localEgmRequired: boolean;
    countryName: String;
    countryCode: String;
    stateName: String;
    stateCode: String;
    cityName: String;
    cityCode: String;
    sectorName: String;
    sectorCode: String;
    currencyId: String;
    currencyCode: String;
    primaryOfficeId: String;
   

  }

  export interface Sector {
    count: Number;
    next: Number;
    previous: Number;
    results: SectorInfo[];
}
export interface SectorInfo {
    id: Number;
    name: String;
    code: String;
    description: String;
  }

  export interface Contry {
    count: Number;
    next: Number;
    previous: Number;
    results: ContryInfo[];
}
export interface ContryInfo {
    id: Number;
    name: String;
    codeIso2: String;
    codeIso3: String;
  }

  export interface State {
    count: Number;
    next: Number;
    previous: Number;
    results: StateInfo[];
}
export interface StateInfo {
    id: Number;
    stateCode: String;
    stateName: String;
  }


  

  

