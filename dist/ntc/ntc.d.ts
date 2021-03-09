/* tslint:disable */
/* eslint-disable */
/**
* @param {string} hex_colour
* @returns {Int32Array}
*/
export function hex_color_to_rgb(hex_colour: string): Int32Array;
/**
* @param {Int32Array} rgb
* @returns {Int32Array}
*/
export function rgb_to_hsl(rgb: Int32Array): Int32Array;
/**
* Return the closest colour as a json object
* @param {Int32Array} rgb
* @returns {string}
*/
export function closest_colour_json(rgb: Int32Array): string;
