local QBCore = exports['qb-core']:GetCoreObject()
local G_Histories = false

MySQL.ready(function()
    G_Accounts = DB.getBankAccounts()
    G_Histories = DB.getHistories()
end)


