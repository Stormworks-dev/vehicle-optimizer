import { additiveComponents } from "./components.js";

function findNextComponent(xml, cursor) {
  while (cursor < xml.length) {
    const start = xml.indexOf("<c", cursor);

    if (start === -1) {
      return -1;
    }

    const next = xml[start + 2];

    if (next === ">" || /\s/.test(next)) {
      return start;
    }

    cursor = start + 2;
  }

  return -1;
}

function findAcAttributes(xml) {
  const attributes = [];
  let cursor = 0;

  while (true) {
    const componentStart = findNextComponent(xml, cursor);

    if (componentStart === -1) {
      break;
    }

    const componentEnd = xml.indexOf("</c>", componentStart);

    if (componentEnd === -1) {
      break;
    }

    const component = xml.slice(componentStart, componentEnd + 4);
    const objectStart = component.indexOf("<o");

    if (objectStart !== -1) {
      const objectEnd = component.indexOf(">", objectStart);

      if (objectEnd !== -1) {
        const object = component.slice(objectStart, objectEnd + 1);
        const acStart = object.search(/\sac="/);

        if (acStart !== -1) {
          const acEnd = object.indexOf('"', acStart + 5) + 1;

          const absoluteStart = componentStart + objectStart + acStart;

          const absoluteEnd = componentStart + objectStart + acEnd;

          attributes.push([absoluteStart, absoluteEnd]);
        }
      }
    }

    cursor = componentEnd + 4;
  }

  return attributes;
}

export function deAdditize(xml) {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, "application/xml");

  if (document.querySelector("parsererror")) {
    throw new Error("Invalid XML");
  }

  let blocksChanged = 0;
  let blocksPreserved = 0;

  const components = document.querySelectorAll("c");
  const acAttributes = findAcAttributes(xml);

  let acIndex = 0;
  const removals = [];

  for (const component of components) {
    const object = component.querySelector("o");

    if (!object || !object.hasAttribute("ac")) {
      continue;
    }

    const componentName = component.getAttribute("d");

    if (additiveComponents.has(componentName)) {
      blocksPreserved++;
    } else {
      const removal = acAttributes[acIndex];

      if (!removal) {
        throw new Error("Failed to locate additive color attribute");
      }

      removals.push(removal);
      blocksChanged++;
    }

    acIndex++;
  }

  removals.reverse();

  let output = xml;

  for (const [start, end] of removals) {
    output = output.slice(0, start) + output.slice(end);
  }

  return {
    data: output,
    blocksChanged,
    blocksPreserved,
  };
}
