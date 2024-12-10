
RegisterNuiCallback("getter", function(data, cb)
    if getters[data.getter] then
        cb(getters[data.getter]())
    end
end)