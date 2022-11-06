export class RegisterUser {
    public BusinessName: string;
    public Name: string;
    public State: string;
    public City: string;
    public PinCode: string;
    public GstNo: string;
    public Mobile: string;
    public Email: string;
    public Password: string;
    public Address: string;
    public RoleId: number;
}

export class User {
    public Id: number;
    public BusinessName: string;
    public Name: string;
    public Password: string;
    public Email: string;
    public Mobile: string;
    public State: string;
    public City: string;
    public Address: string;
    public PinCode: string;
    public GstNo: string;
    public BankName: string;
    public AccountNo: string;
    public IfscCode: string;
    public JoiningDateTime: Date;
    public IsApproved: boolean;
    public IsActive: boolean;
    public AdminId: number;
    public RoleId: number;
    public CategoryId: number;
    public WalletId: number;
    public CreateDate: Date;
    public CreateBy: number;
    public UpdateDate: Date;
    public UpdateBy: number;
}


