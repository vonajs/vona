const __names = ['Name', 'Description'];

export async function locale_transform({ ast, argv }) {
  const names = __names.concat(argv.resourceNameCapitalize);
  const nodes = ast.find('export default {$$$0}');
  for (const name of names) {
    const node = nodes.match.$$$0.find(node => {
      return (node as any).key.name === name;
    });
    if (!node) {
      const code = `${name}: '${name}',`;
      ast.replace(
        'export default {$$$0}',
        `export default { $$$0, \n ${code}}`,
      );
    }
  }
  // ok
  return ast;
}
