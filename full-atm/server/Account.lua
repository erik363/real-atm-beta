G_Accounts = false
Account = {}
Account.__index = Account

function Account:new(_citizenId, _account_name, _account_balance, _account_type, _users, _statements)
    local self = setmetatable({}, Account)
    self.citizenid = _citizenId
    self.account_name = _account_name
    self.account_balance = _account_balance
    self.account_type = _account_type
    self.users = _users
    self.statements = _statements or {}
    G_Accounts[self.account_name] = self
    return self
end

function Account:createNew(_citizenId, _account_name, _account_balance, _account_type, _users)
    local newAccount = Account:new(_citizenId, _account_name, _account_balance, _account_type, _users)
    local isSuccess = DB.insertAccount(newAccount.citizenid, newAccount.account_name, newAccount.account_balance, newAccount.account_type, newAccount.users)
    if not isSuccess then
        G_Accounts[newAccount.account_name] = nil
        return false
    end
    return isSuccess
end

function Account:getBalance()
    return self.account_balance
end

function Account:deposit(amount, reason)
    if not reason then reason = 'External Deposit' end
    if amount > 0 then
        self.account_balance = self.account_balance + amount
        DB.updateBankAccountBalance(self.account_name, amount)
        local statement = {
            amount = amount,
            reason = reason,
            date = os.time() * 1000,
            statement_type = 'deposit'
        }
        self.statements[#self.statements+1] = statement
        DB.insertHistory(self.citizenid, self.account_name, amount, reason, 'deposit')
        return true
    end
    return false
end

function Account:withdraw(amount)
    if amount > 0 and self.balance >= amount then
        self.balance = self.balance - amount
        return true
    end
    return false
end

function Account:transfer(targetAccount, amount)
    if self:withdraw(amount) then
        targetAccount:deposit(amount)
        return true
    end
    return false
end

return Account