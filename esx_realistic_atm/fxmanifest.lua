fx_version 'cerulean'
game 'gta5'
lua54 'yes'
author 'RRP scripts'
description 'ESX Realistic ATM'
version '1.0.0'

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/style.css',
    'web/script.js',
    'web/fleeca-logo.webp',
}

shared_scripts {
    'config.lua'
}

client_scripts {
    'client_dsc.lua',
    'client.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server.lua'
}

dependencies {
    'es_extended'
}