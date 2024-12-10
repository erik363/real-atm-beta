Config = {}

Config.ATMs = {
    [`prop_atm_02`] = {
        canDeposit = true,
        colorHash = '#ff0000',
    },
    [`prop_atm_03`] = {
        canDeposit = true,
        colorHash = '#ff0000',
        waterMarkLink = './fleeca-logo.webp'
    },
    [`prop_fleeca_atm`] = {
        canDeposit = true,
        colorHash = '#ff0000',
    },
}

Config.CustomAccountSupport = true -- like qb-banking script

Config.Scorched = {
    SetScorched = true,
    CustomFuncDisable = function(atmEntity)
        -- insert your custom function here
    end,
    CustomFuncEnable = function(atmEntity)
        -- insert your custom function here
    end
}