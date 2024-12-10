$(function(){
    const ResourceName = 'esx_realistic_atm';
    const settings = {
        numPadAudio: './numPadBeep.flac',
        numPadAudioVolume: 0.5,
        btnAudio: './btnAudio.ogg',
        pincodePage : {
            selectedOptionTitle: "PIN kód bevitel",
            title: "Kérjük, adja meg PIN kódját!",
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            description2: "Kérjük, kezelje PIN kódját bizalmasan!",
        },
        firstPage : {
            title: 'Kérjük, válasszon tranzakciót!',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'Tranzakció választás',
            buttons: {
                pinChange : {
                    label: 'PIN-kód csere',
                    pos : 3,
                    btnFunc : function() {
                        createPinChangePage();
                    }
                },
                balance : {
                    label: 'Egyenleglekérdezés',
                    pos : 6,
                    btnFunc : function() {
                        createBalancePage();
                    }
                },
                withdraw : {
                    label: 'Pénzfelvétel',
                    pos : 7,
                    btnFunc : function() {
                        createWithdrawPage();
                    }
                },
                deposit : {
                    label: 'Készpénzbefizetés',
                    pos : 8,
                    btnFunc : function() {
                        createDepositPage();
                    }
                },
                exit : {
                    label: 'Kilépés',
                    pos : 4,
                    btnFunc : function() {
                        closeATM();
                    }
                }
            }
        },
        pinChangePage : {
            title: 'PIN-kód csere',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'PIN-kód csere',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createFirstPage();
                    }
                },
            }
        },
        pinChange2Page : {
            title: 'Írd be újra az új PIN-kódot!',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'PIN-kód csere',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        pinChangePage(settings.pinChangePage);
                    }
                }
            }
        },

        failedPinPage : {
            title: 'Hibás PIN-kód!',
            description: 'A beírt PIN-kód nem egyezik meg az elsővel!',
            selectedOptionTitle: 'PIN-kód csere',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createFirstPage();
                    }
                }
            }
        },

        succesPinPage : {
            title: 'Sikeres PIN-kód csere!',
            description: 'A PIN-kódod sikeresen megváltozott!',
            selectedOptionTitle: 'PIN-kód csere',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createFirstPage();
                    }
                }
            }
        },
        withdrawPage : {
            title: 'Pénzfelvétel',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'Pénzfelvétel',
            buttons: {
                btn1: {
                    label: '1000 Ft',
                    pos : 2,
                    btnFunc : function() {
                        createReceiptPage(1000);
                    }
                },
                btn2: {
                    label: '2000 Ft',
                    pos : 3,
                    btnFunc : function() {
                        createReceiptPage(2000);
                    }
                },
                btn3: {
                    label: '5000 Ft',
                    pos : 4,
                    btnFunc : function() {
                        createReceiptPage(5000);
                    }
                },
                btn4: {
                    label: '10000 Ft',
                    pos : 6,
                    btnFunc : function() {
                        createReceiptPage(10000);
                    }
                },
                btn5: {
                    label: '20000 Ft',
                    pos : 7,
                    btnFunc : function() {
                        createReceiptPage(20000);
                    }
                },
                btn6: {
                    label: 'Egyéb összeg',
                    pos : 8,
                    btnFunc : function() {
                        createOtherAmountPage();
                    }
                }
            }

        },
        createOtherAmountPage : {
            title: 'Egyéb összeg',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'Pénzfelvétel',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createWithdrawPage();
                    }
                },
            }

        },

        createReceiptPage : {
            title: 'Kérjük, vegye ki a kívánt összeget!',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'Pénzfelvétel',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createFirstPage();
                    }
                },
                moreCash : {
                    label: 'További pénzfelvétel',
                    pos : 8,
                    btnFunc : function() {
                        createWithdrawPage();
                    }
                }
            }

        },
        createDepositPage : {
            title: 'Készpénz befizetés',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'Készpénz befizetés',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createFirstPage();
                    }
                },
                btn1: {
                    label: '1000 Ft',
                    pos : 2,
                    btnFunc : function() {
                        createDepositPageInfo(1000);
                    }
                },
                btn2: {
                    label: '2000 Ft',
                    pos : 3,
                    btnFunc : function() {
                        createDepositPageInfo(2000);
                    }
                },
                btn3: {
                    label: '5000 Ft',
                    pos : 4,
                    btnFunc : function() {
                        createDepositPageInfo(5000);
                    }
                },
                btn4: {
                    label: '10000 Ft',
                    pos : 6,
                    btnFunc : function() {
                        createDepositPageInfo(10000);
                    }
                },
                btn5: {
                    label: '20000 Ft',
                    pos : 7,
                    btnFunc : function() {
                        createDepositPageInfo(20000);
                    }
                },
                btn6: {
                    label: 'Egyéb összeg',
                    pos : 8,
                    btnFunc : function() {
                        createOtherAmountPageDeposit();
                    }
                }
            }

        },
        createOtherAmountPageDeposit : {
            title: 'Egyéb összeg',
            description: 'Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'Készpénz befizetés',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createDepositPage();
                    }
                },
            }

        },
        createDepositPageInfo : {
            title: 'Kérjük, helyezze a bankjegyeket a nyílásba!',
            description: 'Távolítson el minden egyéb idegen tárgyat a bankjegyek közül (aprópénz, kapcsok, papír, stb ... )!<br>Erősen gyűrött bankjegyet ne tegyen az ATM-be!<br>max. 200 db<br>Egy tranzakcióban maximum 4.000.000 Ft illetve 200 db bankjegy befizetése lehetséges!<br>Megszakítás lent, a TÖRLÉS [] gombbal!',
            selectedOptionTitle: 'Készpénz befizetés'
        },

        createBalancePage : {
            title: 'Egyenleglekérdezés',
            description: 'Az ön egyenlege:',
            selectedOptionTitle: 'Egyenleglekérdezés',
            buttons: {
                exit : {
                    label: 'Vissza',
                    pos : 4,
                    btnFunc : function() {
                        createFirstPage();
                    }
                },
            }

        },

        createAcceptDepositPage : {
            title: 'Teljes behelyezett összeg:',
            description: '500 HUF x 1<br>1 000 HUF x 1<br>2 000 HUF x 1<br>5 000 HUF x 1<br>10 000 HUF x 1<br>20 000 HUF x 1<br>Összesen = 38 500 Ft<br><br>Jóváhagy<br>További befizetés<br><br>A bankjegyek visszavételéhez és a folyamat megszakításához kérjük, nyomja meg lent a TÖRLÉS [] gombot!',
            selectedOptionTitle: 'Készpénz befizetés',
            buttons: {
                approve : {
                    label: 'Jóváhagy',
                    pos : 8,
                    btnFunc : function() {
                        acceptDeposit();
                    }
                },
                exit : {
                    label: 'Kilépés',
                    pos : 4,
                    btnFunc : function() {
                        createFirstPage();
                    }
                },
                moreDeposit : {
                    label: 'További befizetés',
                    pos : 8,
                    btnFunc : function() {
                        createDepositPage();
                    }
                }
            }
        }

    };

    var PINCODE = null;
    var CURRENT_INPUT_VALUE = null;
    const PinAudio = new Audio(settings.numPadAudio);
    PinAudio.volume = settings.numPadAudioVolume;
    const BtnAudio = new Audio(settings.btnAudio);
    BtnAudio.volume = settings.numPadAudioVolume;

    var BANK_MONEY = 0;
    var MONEY = 0;



    let handlers = {};
    function addHandler(btnId, handler) {
        handlers[btnId] = handler;
    }

    function handleBtnClick(btnId) {
        if (handlers[btnId]) {
            handlers[btnId]();
            if (btnId  < 8) {
                BtnAudio.play();
            } else {
                PinAudio.play();
            }
        }

    }



    function createBtn(btnpos, btnName, btnFunc) {
        var btn = $('<div>').addClass('panel-btn').html(btnName);
        addHandler(btnpos, btnFunc);
        btn.addClass('btn-' + btnpos);
        return btn;
    }

    function setLanguage(lang) {

    }

    function closeATM() {
        fetch(`https://${ResourceName}/closeATM`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({})
        }).then(resp => resp.json()).then(resp => {
            console.log(resp);
        });
    }

    function createPincodePage() {
        const pageSettings = settings.pincodePage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        const description2 = $('<p class="description2">');
        const input = $('<input class="inputField" type="password" class="input">');
        input.attr('maxlength', '4');
        input.attr('size', '4');

        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.text(pageSettings.description);
        description2.text(pageSettings.description2);
        createNumPad(()=> {
            input.val('');
            PINCODE = null;
            closeATM();
        }, (value) => {
           fetch(`https://${ResourceName}/handlers`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json; charset=UTF-8'
               },
               body: JSON.stringify({ nType: "checkPin", pin: value })
           }).then(resp => resp.json()).then(resp => {
              if (resp.isAccepted) {
                    createFirstPage();
                    PINCODE = value;
              } else {
                  createPincodePage();
                }
           });
        }, () => {
            input.val('');
            PINCODE = null;
        });

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description)
            .append(description2)
            .append(input);

    }

    function createFirstPage() {
        const pageSettings = settings.firstPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.text(pageSettings.description);

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);
    }

    function handleNumpadInput(value, cb) {
        const inputElement = $(".inputField");
        if (!isNaN(value)) {
            const maxLength = parseInt(inputElement.attr('maxlength'));
            if ( maxLength && (inputElement.val().length >= maxLength)) {
                return;
            }
            inputElement.val(inputElement.val() + value);
            /*if (inputElement.val() < parseInt(inputElement.attr('min'))) {
                inputElement.val(inputElement.attr('min'));
            }
            if (inputElement.val() > parseInt(inputElement.attr('max'))) {
                inputElement.val(inputElement.attr('max'));
            }*/
        } else {
            if (value === 'cancel') {
               if (cb) {
                     cb();
               }
            }
            if (value === 'clear') {
                inputElement.val('');
                if (cb) {
                    cb();
                }
            }
            if (value === 'enter') {
                if (cb) {
                    cb(inputElement.val());
                }
            }

        }
    }

    function createNumPad(cancelCb, enterCb, clearCb) {
        CURRENT_INPUT_VALUE = null;
        addHandler(9, () => { handleNumpadInput(1); });
        addHandler(10, () => { handleNumpadInput(2); });
        addHandler(11, () => { handleNumpadInput(3); });
        addHandler(12, () => { handleNumpadInput("cancel", cancelCb); });
        addHandler(13, () => { handleNumpadInput(4); });
        addHandler(14, () => { handleNumpadInput(5); });
        addHandler(15, () => { handleNumpadInput(6); });
        addHandler(16, () => { handleNumpadInput("clear", clearCb); });
        addHandler(17, () => { handleNumpadInput(7); });
        addHandler(18, () => { handleNumpadInput(8); });
        addHandler(19, () => { handleNumpadInput(9); });
        addHandler(20, () => { handleNumpadInput("enter", enterCb); });
        addHandler(21, () => { console.log('-'); });
        addHandler(22, () => { handleNumpadInput(0); });
        addHandler(23, () => { console.log('-'); });
        addHandler(24, () => { console.log('-'); });
    }

    function createPinChangePage() {
        const pageSettings = settings.pinChangePage; 
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        const input = $('<input class="inputField" type="password" class="input">');
        input.attr('maxlength', '4');
        input.attr('size', '4');

        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.text(pageSettings.description);
        createNumPad(()=> {
            input.val('');
            PINCODE = null;
            createFirstPage();
        }, (value) => {
            createPinChange2Page(value);
            PINCODE = value;
        }, () => {
            input.val('');
            PINCODE = null;
        });

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }
        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description)
            .append(input);
    }

    function createPinChange2Page(pin) {
        const pageSettings = settings.pinChange2Page;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        const input = $('<input class="inputField" type="password" class="input">');
        input.attr('maxlength', '4');
        input.attr('size', '4');

        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.text(pageSettings.description);
        createNumPad(()=> {
            input.val('');
            PINCODE = null;
            createFirstPage();
        }, (value) => {
            if (value === pin) {
                succesPinPage(value);
            } else {
                failedPinPage();
            }
        }, () => {
            input.val('');
        });

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description)
            .append(input);
    }

    function failedPinPage() {
        const pageSettings = settings.failedPinPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.text(pageSettings.description);

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description
        );
    }

    function succesPinPage(newPin) {
        const pageSettings = settings.succesPinPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.text(pageSettings.description);

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);

        $.post('https://full-atm/changePin', JSON.stringify({ pin: newPin }), function(data) {
            console.log(data);
        });
    }

    function createWithdrawPage() {
        const pageSettings = settings.withdrawPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text('Pénzfelvétel');
        title.text('Kérjük, válasszon összeget!');
        description.text('Megszakítás lent, a TÖRLÉS [] gombbal!');

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);

    }

    function createOtherAmountPage() {
        const pageSettings = settings.createOtherAmountPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text('Pénzfelvétel');
        title.text('Kérjük, írja be a kívánt összeget!');
        const input = $('<input class="inputField" type="number" class="input">');
        description.text('Megszakítás lent, a TÖRLÉS [] gombbal!');

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        createNumPad(()=> { 
            CURRENT_INPUT_VALUE = null;
            createWithdrawPage();
        }, (value) => {
            CURRENT_INPUT_VALUE = value;
            createReceiptPage(value);
        }, () => {
            CURRENT_INPUT_VALUE = null;
        });



        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description)
            .append(input);
    }

    function createReceiptPage(amount) {
        const pageSettings = settings.createReceiptPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text('Pénzfelvétel');
        title.text('Kérjük, vegye ki a kívánt összeget!');
        description.text('Megszakítás lent, a TÖRLÉS [] gombbal!');

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);
    }

    function createDepositPage() {
        const pageSettings = settings.createDepositPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text('Készpénz befizetés');
        title.text('Kérjük, válassza ki a befizetni kívánt összeget!');
        description.text('Megszakítás lent, a TÖRLÉS [] gombbal!');
        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);
    }

    function createDepositPageInfo(amount) {
        const pageSettings = settings.createDepositPageInfo;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.html(pageSettings.description);

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);

        setTimeout(() => {
            createAcceptDepositPage();
        }, 5000);
    }

    function createOtherAmountPageDeposit() {
        const pageSettings = settings.createOtherAmountPageDeposit;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text('Készpénz befizetés');
        title.text('Kérjük, írja be a kívánt összeget!');
        const input = $('<input class="inputField" type="number" class="input">');
        description.text('Megszakítás lent, a TÖRLÉS [] gombbal!');
        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        createNumPad(()=> {
            CURRENT_INPUT_VALUE = null;
            createDepositPage();
        }, (value) => {
            CURRENT_INPUT_VALUE = value;
            createDepositPageInfo(value);
        }, () => {
            CURRENT_INPUT_VALUE = null;
        });

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description)
            .append(input);
    }


    function createAcceptDepositPage() {
        const pageSettings = settings.createAcceptDepositPage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text('Készpénz befizetés');
        title.text('Teljes behelyezett összeg:');
        description.html('500 HUF x 1<br>1 000 HUF x 1<br>2 000 HUF x 1<br>5 000 HUF x 1<br>10 000 HUF x 1<br>20 000 HUF x 1<br>Összesen = 38 500 Ft<br><br>Jóváhagy<br>További befizetés<br><br>A bankjegyek visszavételéhez és a folyamat megszakításához kérjük, nyomja meg lent a TÖRLÉS [] gombot!');

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);
    }

    function createBalancePage() {
        const pageSettings = settings.createBalancePage;
        handlers = {};
        $('#page').empty();
        const selectedOptionTitle = $('<div class="selectedOptionTitle">');
        const title = $('<div class="title">');
        const description = $('<p class="description">');
        selectedOptionTitle.text(pageSettings.selectedOptionTitle);
        title.text(pageSettings.title);
        description.text(`${pageSettings.description} ${BANK_MONEY} Ft`);

        for (const key in pageSettings.buttons) {
            const btn = createBtn(pageSettings.buttons[key].pos, pageSettings.buttons[key].label, pageSettings.buttons[key].btnFunc);
            $('#page').append(btn);
        }

        $('#page').append(selectedOptionTitle)
            .append(title)
            .append(description);
    }


    // createFirstPage();
    // createWithdrawPage();
    // createOtherAmountPage();
    // createReceiptPage();
    // createDepositPageInfo();
    // createAcceptDepositPage();

    window.addEventListener('message', function (event) {
        console.log("itt lenni")
        console.log(JSON.stringify(event.data));
        const data = event.data;
        if (data.type === 'openATM') {
            if (data.show) {
                $('body').show();
                createPincodePage();
            } else {
                $('body').hide();
                handlers = {};
                CURRENT_INPUT_VALUE = null;
                PINCODE = null;
            }
        } else if (data.type === 'buttonClick') {
            handleBtnClick(data.btnId);
        } else if (data.type === 'updateData') {
            const money = data.money;
            const bankMoney = data.bankMoney;
            BANK_MONEY = bankMoney;
            MONEY = money;
        }
    });

    createFirstPage()

    fetch(`https://${ResourceName}/duiIsReady`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ ok: true })
    });


})