"use strict";

describe("Account-Class", function () {

    describe("check the account info after create", function (){
        const account = new Account(1234567890);

        it("check the account number", function () {
            assert.equal("1234567890", account.getNumber());
        });
    
        it("check the account balance", function () {
            assert.equal("0", account.getBalance());
        });
    });

    describe("check the account info after deposit 1000", function (){
        const account = new Account(1234567890);
        account.deposit(1000);

        it("check the account balance", function () {
            assert.equal("1000", account.getBalance());
        });
    });

    describe("check the account info after withdraw 250", function (){
        const account = new Account(1234567890);
        account.deposit(1000);
        account.withdraw(250);

        it("check the account balance", function () {
            assert.equal("750", account.getBalance());
        });

        it("test toString method", function () {
            assert.equal("Account 1234567890: balance 750", account.toString());
        });
    });

});

describe("SavingsAccount-Class", function () {

    describe("check the account info after interest is deposited", function (){
        const account = new SavingsAccount(1234567890, 10);
        
        account.deposit(1000);
        account.addInterest();

        it("check the account balance", function () {
            assert.equal("1100", account.getBalance());
        });

        it("test toString method", function () {
            assert.equal("Account 1234567890: balance 1100: interest 10%", account.toString());
        });
    });

});

describe("CheckingAccount-Class", function () {

    describe("check the account info for negative balance", function (){
        const account = new CheckingAccount(5600000030, 200);
        
        account.deposit(2500);
        account.withdraw(2600);

        it("check the account balance", function () {
            assert.equal("-100", account.getBalance());
        });

        it("test toString method", function () {
            assert.equal("Account 5600000030: balance -100: overdraft limit 200", account.toString());
        });
    });

});

describe("Bank - Class", function () {

    describe("Add all types of bank and check the account report", function (){
        const bank = new Bank();

        const acnr = bank.addAccount();
        const savingAcnr = bank.addSavingsAccount(10);
        const checkingAcnr = bank.addCheckingAccount(2000);

        it("check account info for all accounts", function () {
            assert.equal("Account 2001: balance 5000\nAccount 2002: balance 7000: interest 10%\nAccount 2003: balance -150: overdraft limit 2000", bank.accountReport());
        });

    });

    describe("Add all types of bank and remove the saving account", function (){
        const bank = new Bank();

        const acnr = bank.addAccount();
        const savingAcnr = bank.addSavingsAccount(10);
        const checkingAcnr = bank.addCheckingAccount(2000);

        bank.closeAccount(savingAcnr);

        it("check account info for all accounts", function () {
            assert.equal("Account 2004: balance 5000\nAccount 2006: balance -150: overdraft limit 2000", bank.accountReport());
        });

    });

    describe("Add all types of bank and check end of month report", function (){
        const bank = new Bank();

        const acnr = bank.addAccount();
        const savingAcnr = bank.addSavingsAccount(10);
        const checkingAcnr = bank.addCheckingAccount(2000);

        it("check end of month report", function () {
            assert.equal("Interest added SavingsAccount 2008: balance: 7700 interest: 700\nWarning, low balance CheckingAccount 2009: balance: -150 overdraft limit: 2000", bank.endOfMonth());
        });

    });

});
