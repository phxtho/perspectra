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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly hex_color_to_rgb: (a: number, b: number, c: number) => void;
  readonly rgb_to_hsl: (a: number, b: number, c: number) => void;
  readonly closest_colour_json: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
