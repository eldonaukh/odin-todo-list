function el(tag, props = {}, children = []) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on")) {
      const eventName = key.substring(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
    } else if (key === "dataset" && typeof value === "object") {
      Object.assign(element.dataset);
    } else {
      if (key === "class" || key === "className") {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }
}
