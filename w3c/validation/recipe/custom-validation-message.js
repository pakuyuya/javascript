'use strict';

/**
 * コントロール要素に設定されたValidatorAPIを参照して、
 * カスタムされた検証メッセージを取得します。
 *
 * @param element 対象の要素
 * @param errorMessages エラーメッセージの一覧。
 * @param errorMessages.valueMissing
 * @param errorMessages.typeMismatch
 * @param errorMessages.patternMismatch
 * @param errorMessages.tooLong
 * @param errorMessages.tooShort
 * @param errorMessages.rangeUnderflow
 * @param errorMessages.rangeOverflow
 * @param errorMessages.stepMismatch
 * @param errorMessages.badInput
 *
 * @returns {string} 戻り値
 */
export function getInvalidMessage(element, errorMessages) {
    const defaultErrorMessages = {
        'valueMissing' : '必須項目です',
        'typeMismatch' : '入力値が不正です',
        'patternMismatch' : '入力フォーマットが不正です',
        'tooLong' : '文字が長すぎます',
        'tooShort' : '文字が短すぎます',
        'rangeUnderflow' : '入力値が小さすぎます',
        'rangeOverflow' : '入力値が大きすぎます',
        'stepMismatch' : '入力値が不正です',
    };
    const validTargets = [
        'valueMissing',
        'typeMismatch',
        'patternMismatch',
        'tooLong',
        'tooShort',
        'rangeUnderflow',
        'rangeOverflow',
        'stepMismatch',
    ];
    errorMessages = errorMessages || {};
    if (element.willValidate && element.validity.valid) {
        for (const validTarget of validTargets) {
            if (!element.validity[validTarget]) {
                return element.getAttribute('title')
                    || errorMessages[validTarget] || defaultErrorMessages[validTarget];
            }
        }
    }
    return '';
}

/**
 * コントロール要素に標準エラーメッセージを仕込みます。
 * setCustomValidityメソッドを使用しているため、
 * 再度setCustomValidityを使用しないとメッセージが更新されません。
 *
 * @param element
 * @param errorMessages
 */
export function chargeInvalidMessage(element, errorMessages){
    const msg = getInvalidMessage(element, errorMessages || {});
    element.setCustomValidity(msg);
}
