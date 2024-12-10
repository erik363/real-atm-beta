fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'ATM Robbery with NUI'
version '1.0.0'

data_file 'DLC_ITYP_REQUEST' 'stream/rrp_atm_01.ytd'
data_file 'DLC_ITYP_REQUEST' 'stream/rrp_atm_01.ytf'

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/style.css',
    'web/script.js',
    'web/fleeca-logo.webp',
     'stream/rrp_atm_01.ytf',
    'stream/rrp_atm_01.ytd'
}

shared_scripts {
    'config.lua'
}

client_scripts {
    'client_dsc.lua'
}

server_scripts {
    'server.lua'
}
