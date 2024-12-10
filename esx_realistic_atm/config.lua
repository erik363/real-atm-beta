Config = {}

Config.TargetOptions = {
    Enable = true,
    TargetScript = 'ox_target',
    TargetOptions = {
        label = 'Open ATM',
        icon = 'fas fa-university',
    }
}

Config.Anims = {
     OpenATM = {
        AnimDict = 'amb@prop_human_atm@male@enter',
        Anim = 'enter',
        Model = 'prop_cs_credit_card',
        Bone = 28422,
        Offset = vector3(0.1, 0.03, -0.05),
        Rot = vector3(0.0, 0.0, 180.0),
     },
    CloseATM = {
        AnimDict = 'amb@prop_human_atm@male@exit',
        Anim = 'exit',
        Model = 'prop_cs_credit_card',
        Bone = 28422,
        Offset = vector3(0.1, 0.03, -0.05),
        Rot = vector3(0.0, 0.0, 180.0),
    },
}

Config.Objects = {
    Money = 'prop_cash_pile_01',
}

Offsets = {
    CardPos = {
        [`prop_atm_02`] = vector3(0.1, 0.03, -0.05),
        [`prop_atm_03`] = vector3(0.1, 0.03, -0.05),
        [`prop_fleeca_atm`] = vector3(0.1, 0.03, -0.05),
    },
    MoneyInPos = {
        [`prop_atm_02`] = vector3(0.1, 0.03, -0.05),
        [`prop_atm_03`] = vector3(0.1, 0.03, -0.05),
        [`prop_fleeca_atm`] = vector3(0.1, 0.03, -0.05),
    },
    MoneyOutPos = {
        [`prop_atm_02`] = vector3(0.1, 0.03, -0.05),
        [`prop_atm_03`] = vector3(0.1, 0.03, -0.05),
        [`prop_fleeca_atm`] = vector3(0.1, 0.03, -0.05),
    }
}

Config.ATMs = {
    [`prop_atm_02`] = {
        canDeposit = true,
        colorHash = '#ff0000',
        OriginalDict = "prop_atm_02", -- do not change this exept if you know what you are doing
        OriginalTexture = "prop_cashpoint_screen", -- do not change this exept if you know what you are doing
    },
    [`prop_atm_03`] = {
        canDeposit = true,
        colorHash = '#ff0000',
        waterMarkLink = './fleeca-logo.webp',
        OriginalDict = "prop_atm_03", -- do not change this exept if you know what you are doing
        OriginalTexture = "prop_cashpoint_screen", -- do not change this exept if you know what you are doing
    },
    [`prop_fleeca_atm`] = {
        canDeposit = true,
        colorHash = '#ff0000',
        OriginalDict = "prop_fleeca_atm", -- do not change this exept if you know what you are doing
        OriginalTexture = "prop_cashpoint_screen", -- do not change this exept if you know what you are doing
    },
}

Config.Scorched = {
    SetScorched = true,
    CustomFuncDisable = function(atmEntity)
        -- insert your custom function here
    end,
    CustomFuncEnable = function(atmEntity)
        -- insert your custom function here
    end
}