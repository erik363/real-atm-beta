local ESX = exports['es_extended']:getSharedObject()
local USED_ATMs = {}
local PINCODES = {}

MySQL.ready(function()
    MySQL.Async.fetchAll('SELECT `identifier`, `pincode` FROM users', {}, function(result)
        for i=1, #result, 1 do
            PINCODES[result[i].identifier] = result[i].pincode
        end
    end)
end)

local function notify(source, msg, ...)
    TriggerClientEvent('esx:showNotification', source, msg, ...)
end

local callbacks = {
    useATM = function(source, coordsString)
        if USED_ATMs[coordsString] then
            local playerId = USED_ATMs[coordsString]
            if ESX.GetPlayerFromId(playerId) then
                notify(source, 'This ATM is currently in use by another player')
                return
            else
                USED_ATMs[coordsString] = nil
            end
        end
        USED_ATMs[coordsString] = source
        local xPlayer = ESX.GetPlayerFromId(source)
        local identifier = xPlayer.getIdentifier()
        local pincode = PINCODES[identifier]
        if not pincode then
            pincode = MySQL.Sync.fetchScalar('SELECT `pincode` FROM users WHERE identifier = ?', {identifier})
            PINCODES[identifier] = pincode
        end

        pincode = tostring(pincode)
        return true, {
            money = xPlayer.getAccount('money').money,
            bank = xPlayer.getAccount('bank').money,
            pincodeHash = GetHashKey(pincode), 
        }
    end,
}

local handlers = {
    exitATM = function(source, atm)
        print(source, atm)
        if not USED_ATMs[atm] then return end
        if USED_ATMs[atm] == source then
            USED_ATMs[atm] = nil
        end
    end
}

RegisterNetEvent('esx_realistic_atm:handlers', function(hType, ...)
    local src = source
    if not handlers[hType] then
        return
    end
    return handlers[hType](src, ...)
end)


ESX.RegisterServerCallback('esx_realistic_atm:handlers', function(source, cb, hType, ...)
    if not callbacks[hType] then
        return cb(false)
    end
    return cb(callbacks[hType](source, ...))
end)
