import { createMacro, MacroError } from "babel-plugin-macros";
import { noDefault } from "./plugins/no-default";
import { namespace } from "./plugins/namespace";

export default createMacro((macro) => {
  noDefault(macro);
  namespace(macro);

  // const compileStore = macro.references["compileStore"][0];

  // const compileStoreExport = compileStore.findParent((x) =>
  //   x.isExportNamedDeclaration()
  // );

  // if (compileStoreExport) {
  //   throw compileStoreExport.buildCodeFrameError(
  //     "The return value of compileStore macro cannot be exported"
  //   );
  // }

  // const program = compileStore.findParent((x) => x.isProgram())!;

  // const bindings = program.scope.bindings;

  // const compileStoreCall = compileStore.findParent((x) =>
  //   x.isCallExpression()
  // )!;

  // function getStore() {
  //   if (compileStoreCall.isCallExpression()) {
  //     const store = compileStoreCall.get("arguments")[0];
  //     if (store.isIdentifier()) {
  //       return store;
  //     }
  //   }
  // }

  // const store = getStore()!;

  // function getCompileStoreDeclaratorName() {
  //   const variableNodePath = compileStore.findParent((x) =>
  //     x.isVariableDeclarator()
  //   )!;
  //   if (variableNodePath.isVariableDeclarator()) {
  //     const id = variableNodePath.get("id");
  //     if (id.isIdentifier()) {
  //       return id.node.name;
  //     }
  //   }
  // }

  // const name = getCompileStoreDeclaratorName()!;

  // bindings[name].referencePaths.forEach((x) => {
  //   function replaceStoreHandler() {
  //     const member = x.findParent((x) => x.isMemberExpression())!;
  //     if (member.isMemberExpression()) {
  //       const p = member.get("property");
  //       if (p.isIdentifier()) {
  //         member.replaceWith(macro.babel.types.identifier(p.node.name));
  //       }
  //     }
  //   }
  //   replaceStoreHandler();

  //   function getCurrentArrow() {
  //     const arrowNodePath = x.findParent((x) => x.isArrowFunctionExpression())!;
  //     if (arrowNodePath.isArrowFunctionExpression()) {
  //       return arrowNodePath;
  //     }
  //   }

  //   const currentArrow = getCurrentArrow()!;

  //   const member = macro.babel.types.memberExpression(
  //     store.node,
  //     macro.babel.types.identifier("defineFire")
  //   );

  //   const arrow = macro.babel.types.arrowFunctionExpression(
  //     [
  //       macro.babel.types.identifier("setState"),
  //       macro.babel.types.identifier("getState"),
  //     ],
  //     macro.babel.types.cloneNode(currentArrow.node)
  //   );

  //   const _ = macro.babel.types.callExpression(member, [arrow]);

  //   currentArrow.replaceWith(_);
  // });

  // compileStore.findParent((x) => x.isVariableDeclarator())!.remove();
});
