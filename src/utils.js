export function getSize(el) {
  const rect = el.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

function restrict(a, a1, a2) {
  const range = [a1, a2];
  range.sort();

  if (a < range[0]) {
    a = range[0];
  }

  if (range[1] < a) {
    a = range[1];
  }

  return a;
}

export function amend(offset, crop, content) {
  const ret = { ...offset };

  const lx = crop.width - content.width;
  ret.x = restrict(offset.x, 0, lx);

  const ly = crop.height - content.height;
  ret.y = restrict(offset.y, 0, ly);

  return ret;
}
