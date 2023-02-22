import { MacroError, MacroParams } from "babel-plugin-macros";

export function noDefault(macro: MacroParams) {
  if (macro.references.default) {
    throw new MacroError("dura.macro does not support default import");
  }
}
