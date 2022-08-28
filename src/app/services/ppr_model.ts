export interface pprbanks{
    name:string;
    code:string;
}

export interface reportreq{
    date:string;
}

export interface reportresp{
    TotalVolumeInwards: number;
    TotalValueInwards: number;
    TotalVolumeOutwards: number;
    TotalValueOutwards: number;
    TotalVolumeFailed: number;
    TotalValueFailed: number;
    data:reportrespdata;
}

export interface reportrespdata{
    BankName: string;
    Volume: number;
    MarketSharePresentedItem: number;
    InwardValue: number;
    OutwardVolume: number;
    OutwardValue: number;
    FailedVolume: number;
    FailedValue: number;
    mktShareVolumeInward: number;
    mktShareVolumeOutward: number;
    mktShareVolumeFailed: number;
    mktShareValueInward: number;
    mktShareValueOutward: number;
    mktShareValueFailed: number;
}