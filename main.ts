#! /usr/bin/env node
import inquirer from "inquirer";

//Bank Account interface
// Acount number is (1001 & 1002 & 1003)

interface BankAccount{
    accountNumber: number;
    balance:number;
    withdraw(amount:number):void // Void say value not return just operation perform
    deposit(amount:number):void
    checkBalance():void
}

// Bank Account class 
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number,balance:number){
        this.accountNumber = accountNumber
        this.balance = balance
    }
    // Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(`Withdrawal of $${amount} successfull.Remaining balance: $${this.balance}`);
        }else {
            console.log("Insufficient balance.");
        }
    }
    // Credit money
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1; // $1 fees charged if more than $100 is deposited
        }this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }

    // Check balance 
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
};

// Customer class
class Customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;

    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount)
    {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}

// Create bank acconts 

const accounts:BankAccount[] = [
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000),
];

// Creat customers
const customers:Customer[] = [
    new Customer ("Hamza","khan","Male",35,3163279546,accounts[0]),
    new Customer ("Taha","Hussain","Male",24,3463279546,accounts[1]),
    new Customer ("Maha","khan","Female",35,3336327954,accounts[2],)
]

// Function to interact with bank accont

async function service() {
    do{
        const accountNumberInput = await inquirer .prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your account number:"
        })

        const customer = customers.find(customer =>customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"select an operation",
                choices:["Desposit","withdraw","check Balance","Exit"]
            }]);

            switch (ans.select){
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                    case "withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name:"amount",
                            type:"number",
                            message:"Enter the amount to Withdraw:"
                        })
                        customer.account.withdraw(withdrawAmount.amount)
                        break;
                        case "check Balance":
                            customer.account.checkBalance();
                            break;
                            case "Exit":
                                console.log("Exiting bank program...");
                                console.log("\n Thank you for using our bank services.Have a great day!");
                                return;
            }            
        }else {
            console.log("Invalid account number.please try again.");
        }
    }while(true)
}

service();