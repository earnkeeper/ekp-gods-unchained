export function documents(type) {
  return `${path(type)}.*`;
}

export function path(type) {
  return `$['${collection(type)}']`;
}

export function collection(type) {
  const pluginId = process.env.EKP_PLUGIN_ID;

  if (!!pluginId) {
    return `${process.env.EKP_PLUGIN_ID}_${type.name}`;
  }

  return type.name;
}
