'use strict';

/**
 * フォーム中に設定された検証メッセージをポップアップさせます。
 * 動作は非同期です。jQueryつかってます。
 * @param form
 */
export function popFormErrorsAsync(form) {
    var $btn = $(document.createElement('button'))
                    .css('display', 'none')
                    .click((ev) => {
                        console.log(ev);
                    });

    const onsubmit = (event) => {
        event.preventDefault();
    };

    form.addEventListener('submit', onsubmit);

    $(form).append($btn);
    setTimeout(() => {
        $btn.click();
        setTimeout(() => {
            form.removeEventListener('submit', onsubmit);
            $btn.remove();
        });
    }, 0);
}