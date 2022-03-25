export interface Bankresponse{
    bankID:number;
    bankName:string;
    bankCode:string;
	bankEmail:string;	
	bankPhone:string;
    bankLogo:string;
	failureThreshold:number;
    volumeThreshold:number;
	bankType:number;
    bankStatus:number;
    
}

export interface UpdateBankRequest{
    bankID:number;
    bankName:string;
    bankCode:string;
	bankEmail:string;	
	bankPhone:string;
    bankLogo:string;
	failureThreshold:number;
    volumeThreshold:number;
	bankType:number;
    bankStatus:number;
}

