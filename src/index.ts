interface IbankClient {
    firstName: string;
    lastName: string;
};

class BankClient implements IbankClient {

    constructor (
        private readonly _firstName: string,
        private readonly _lastName: string,
        private readonly _bday: number,
        private _number: string | null = null
    ) {}



    public get number(): string {
        if (!this._number) throw new Error('New client');
        return this.number;
    };

    public set number(val: string) {
        this._number = val;
    }

    public get age(): number {
        return new Date().getFullYear() - this._bday;
    }

    public get firstName(): string {
        return this._firstName;
    };

    public get lastName(): string {
        return  this._lastName;
    };

};


class BankAccount {


    constructor(
        private readonly holder: IbankClient,
        private readonly currency: string,
        private readonly iban: string,
        private balance = 0 
    ) {}

    public get holderName(): string {
        return `${this.holder.lastName} ${this.holder.firstName}`
    }

    public get info(): string {
        return `${this.currency}${this.balance}`;
    }

    public get number(): string {
        return this.iban;
    };

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public withdraw(amount: number): void {
        if (this.balance < amount)
        throw new Error (
            `Sorry ${this.holderName}, you dont have enough money`
            );
        this.balance -= amount;    
    }
};

class Bank {
    private static instance: Bank;
    private readonly salaryProvider = new SalaryProvider();
    private readonly creditHistoryProvider = new CreditHistoryProvider();
    private readonly policeDBProvider = new PoliceDBProvider();
    private readonly accounts = new Map<BankAccount['number'], BankAccount>;

    public static getInstance(): Bank {
        if (!Bank.instance) {
            Bank.instance = new Bank();
        }

        return Bank.instance;
    }

    public addAccount(account: BankAccount, client: BankClient): void {
        this.accounts.set(account.number, account);
    };

    public removeAccount(id: BankAccount['number']): BankAccount {
        const account = this.accounts.get(id);

        if (!account) throw new Error('Accounts not exist');

        this.accounts.delete(id);
        return account;
    };

    public getAccount(id: BankAccount['number']): BankAccount {
        const account = this.accounts.get(id);

        if (!account) throw new Error('Accounts not exist');

        return account;
    }

    public deposit(client: BankClient, amount: number): void {
        this.accounts.get(client.number)?.deposit(amount);
    };

    public withdraw(client: BankClient, amount: number): void {
        try {
            this.accounts.get(client.number)?.withdraw(amount);
        } catch (error) {
            console.log(error);
        };
    };

    public getCreditDecision(client: BankClient, amount: number, duration: number): boolean {
        const salary = this.salaryProvider.getAnnularSalary(client.firstName, client.lastName, 12);
        const creditrating = this.creditHistoryProvider.getCreditRating(client.number);
        const criminalRecord = this.policeDBProvider.isCriminal(client.firstName, client.lastName);

        // Dificult calculation
        return true;
    };
};

class SalaryProvider {
    public getAnnularSalary(firstName: string, lastNamae: string, duration: number): number {
        return 37;
    };
};

class CreditHistoryProvider {
    public getCreditRating(bankAccountNumber: string): number {
        return 37;
    };
};

class PoliceDBProvider {
    public isCriminal(firstName: string, lastNamae: string): boolean{
        return false;
    };
};


