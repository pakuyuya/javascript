"use strict";

var elmTx = forId('tx');

elmTx.addEventListener('copy', function(e) {
  console.log(e);
    boty('copy', 'Copy', window.getSelection().toString());
});
elmTx.addEventListener('paste', function(e) {
  console.log(e);
    boty('paste', 'paste', e.clipboardData.getData('Text'));
});


function forId(id) {
    return document.getElementById(id);
}

function boty(clazz, caption, text) {
    var bot = forId('bot');
    var botCaption = forId('bot-caption');
    var botSays = forId('bot-says');

    bot.setAttribute('class', clazz);
    botCaption.innerText = caption;
    botSays.innerText = text;    
}