import {isNumber} from 'lodash';

// Return Boolean
export const IsValidateObject = (object: any): boolean => {
    return object !== undefined && object !== null;
};

// Return Boolean
export const hasProperty = (object: any, property: string): boolean => {
    return (
        IsValidateObject(object) &&
        Object.hasOwnProperty.call(object, property) &&
        IsValidateObject(object[property])
    );
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const randomIntFromInterval = (min: number, max: number): number => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomColor = (): string =>
    '#' + Math.floor(Math.random() * 16777215).toString(16);

export const formatDisplayPoint = (value: number | string, currencyStr: string = ' ₫'): string => {
    try {
        if (!IsValidateObject(value)) {
            return '';
        }
        if (!isNumber(value)) {
            value = Number(value);
        }

        return formatMoney(value, 0, '.', '.', currencyStr);
    } catch (error) {
        return '';
    }
};

export const formatMoney = (
    amount: number,
    decimalCount: number = 0,
    decimal: string = '.',
    thousands: string = '.',
    currencyStr: string = '₫',
): string => {
    try {
        // Validate and normalize inputs
        if (!Number.isFinite(amount)) {
            return '';
        }
        decimalCount = Math.max(0, Math.floor(decimalCount));

        // Format the number
        const parts = Math.abs(amount).toFixed(decimalCount).split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];

        // Add thousands separators
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

        // Combine parts
        let result = amount < 0 ? '-' : '';
        result += formattedInteger;
        if (decimalCount > 0 && decimalPart) {
            result += decimal + decimalPart;
        }
        result += currencyStr;

        return result;
    } catch (e) {
        console.error('Error formatting money:', e);
        return '';
    }
};



export const isJsonString = (str: string): boolean => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
