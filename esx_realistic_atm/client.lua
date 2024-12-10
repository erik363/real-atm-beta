ESX = exports["es_extended"]:getSharedObject()
local PINCODEHASH = nil
ATMCOORDS_STRING = nil

function coordsToString(coords)
    return string.format('%s,%s,%s', coords.x, coords.y, coords.z)
end


local function openATM(data)
    local atmEntity = data.entity
    local atmCoords = GetEntityCoords(atmEntity)
    ATMCOORDS_STRING = coordsToString(atmCoords)
    ESX.TriggerServerCallback('esx_realistic_atm:handlers', function(response, data)
        if response then
            local animData = Config.Anims.OpenATM
            local playerPed = PlayerPedId()
            local timeout = 10000 -- 10 seconds timeout
            local startTime = GetGameTimer()

            -- Calculate the offset position in front of the ATM
            local offset = -0.5 -- 1 meter in front of the ATM
            local heading = GetEntityHeading(atmEntity)
            local offsetCoords = GetOffsetFromEntityInWorldCoords(atmEntity, 0.0, offset, 0.0)
            TaskGoStraightToCoord(playerPed, offsetCoords.x, offsetCoords.y, offsetCoords.z, 1.0, timeout, heading, 0.0)
            Wait(100)
            Citizen.CreateThread(function()
                while (GetGameTimer() - startTime) < timeout do
                    Citizen.Wait(500)
                    local playerCoords = GetEntityCoords(playerPed)
                    if #(playerCoords - offsetCoords) < 1 then
                        -- Player reached the offset position, face the ATM
                        SetEntityHeading(playerPed, heading)
                        
                        -- Perform the card insertion animation
                        ESX.Streaming.RequestAnimDict(animData.AnimDict, function()
                            ESX.Streaming.RequestModel(animData.Model, function()
                                local boneIndex = GetPedBoneIndex(playerPed, animData.Bone)
                                local atmObject = CreateObject(animData.Model, 0, 0, 0, true, true, false)
                                AttachEntityToEntity(atmObject, playerPed, boneIndex, animData.Offset.x, animData.Offset.y, animData.Offset.z, animData.Rot.x, animData.Rot.y, animData.Rot.z, true, true, false, true, 1, true)
                                TaskPlayAnim(playerPed, animData.AnimDict, animData.Anim, 8.0, 8.0, -1, 0, 0, false, false, false)
                                local pincodeHash = data.pincodeHash
                                PINCODEHASH = pincodeHash
                                local bank = data.bank
                                local money = data.money
                                print('pincodeHash', pincodeHash)
                                print('bank', bank)
                                print('money', money)
                                OpenATM(atmEntity, money, bank, pincodeHash)
                            end)
                        end)
                        return
                    end
                end
                -- Timeout reached, stop the task
                ClearPedTasks(playerPed)
            end)

        end
    end, 'useATM', ATMCOORDS_STRING)
end

Citizen.CreateThread(function()
    if Config.TargetOptions.Enable then
        if not Config.TargetOptions.TargetScript then
            print('esx_realistic_atm: TargetScript is not set')
            return
        end

        if Config.TargetOptions.TargetScript == 'ox_target' then
            for modelHash, _ in pairs(Config.ATMs) do
                exports['ox_target']:addModel(modelHash, {
                    label = Config.TargetOptions.TargetOptions.label,
                    icon = Config.TargetOptions.TargetOptions.icon,
                    onSelect = function(entity)
                        openATM(entity)
                    end
                })
            end
        end

        
    end

end)

local nuiHandlers = {
    checkPin = function(data)
        local pin = data.pin
        pin = tostring(pin)
        return {isAccepted = GetHashKey(pin) == PINCODEHASH} 
    end
}

RegisterNUICallback('handlers', function(data, cb)
    if not nuiHandlers[data.nType] then
        return cb(false)
    end
    return cb(nuiHandlers[data.nType](data))

end)

RegisterNUICallback('closeATM', function(data, cb)
    exitATM()
    cb({ok = true})
end)

AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        exitATM()
    end
end)