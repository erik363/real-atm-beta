local function insertAccount(citizenid, accountName, accountBalance, accountUsers, accountType)
    local isSuccess = MySQL.insert.await('INSERT INTO bank_accounts (citizenid, account_name, account_balance, account_type, users) VALUES (?, ?, ?, ?, ?)', { citizenid, accountName, accountBalance, accountType, accountUsers })
    return isSuccess
end

local function updateBankAccountBalance(accountName, amount)
    local isSuccess = MySQL.update.await('UPDATE bank_accounts SET account_balance = account_balance + ? WHERE account_name = ?', { amount, accountName })
    return isSuccess
end

local function deleteAccount(accountName, citizenid)
    local isSuccess = MySQL.rawExecute.await('DELETE FROM bank_accounts WHERE account_name = ? AND citizenid = ?', { accountName, citizenid })
    return isSuccess
end

-- userer manage

local function addUser(accountName, citizenid, usersData)
    local isSuccess = MySQL.update.await('UPDATE bank_accounts SET users = ? WHERE account_name = ? AND citizenid = ?', { usersData, accountName, citizenid })
end

local function RmUser(accountName, citizenid, usersData)
    local isSuccess = MySQL.update.await('UPDATE bank_accounts SET users = ? WHERE account_name = ? AND citizenid = ?', { usersData, accountName, citizenid })
    return isSuccess
end

--history

local function insertHistory(citizenid, account, amount, reason, statementType)
    local isSuccess = MySQL.insert.await('INSERT INTO bank_statements (citizenid, account_name, amount, reason, statement_type) VALUES (?, ?, ?, ?, ?)', { citizenid, account, amount, reason, statementType })
    return isSuccess
end

-- getters
local function getBankAccounts()
    local accounts = MySQL.query.await('SELECT * FROM bank_accounts')
    return accounts
end

local function getHistories()
    local histories = MySQL.query.await('SELECT * FROM bank_statements')
    return histories
end

DB = {
    insertAccount = insertAccount,
    updateBankAccountBalance = updateBankAccountBalance,
    deleteAccount = deleteAccount,
    addUser = addUser,
    RmUser = RmUser,
    insertHistory = insertHistory,
    getBankAccounts = getBankAccounts,
    getHistories = getHistories
}


