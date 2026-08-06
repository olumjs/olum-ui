// Descriptions are authored in registry.json and mirrored into descriptions.js
// by scripts/gen-snippets.mjs.
import { descriptions, packages } from "./descriptions.js";

// Single source of truth for the component gallery: the ordered id list drives
// both the index grid and the prev/next pager at the bottom of every example.
export const components = [
  "accordion", "alert", "alert-dialog", "area-chart", "aspect-ratio", "attachment", "avatar",
  "badge", "bar-chart", "breadcrumb", "bubble", "button", "button-group", "calendar", "card",
  "carousel", "checkbox", "collapsible", "combobox", "command", "composed-chart", "context-menu",
  "data-table", "date-picker", "dialog", "direction", "donut-chart", "drawer", "dropdown-menu",
  "empty", "field", "hover-card", "input", "input-group", "input-otp", "item", "kbd", "label",
  "line-chart", "marker", "menubar", "message", "message-scroller", "native-select",
  "navigation-menu", "pagination", "popover", "progress", "radial-bar-chart", "radio-group",
  "resizable", "scroll-area", "select", "separator", "sheet", "sidebar", "skeleton", "slider",
  "spinner", "switch", "table", "tabs", "textarea", "toast", "toggle", "toggle-group", "tooltip",
];

// `capitalize` handles every name except the ones with non-title-case letters.
const labels = { "input-otp": "Input OTP" };

export const label = id => labels[id] || id.replaceAll("-", " ");

// PageHeader omits the paragraph when a route has no description.
export const describe = id => descriptions[id] || "";

// The registry component a route installs -- same as the route id unless the
// page is one of several shipping from a single component (the charts).
export const packageOf = id => packages[id] || id;

export const prevOf = id => {
  const i = components.indexOf(id);
  return i > 0 ? components[i - 1] : null;
};

// An id that isn't in the list means we're on the gallery index, so "next" is
// the first component -- that page gets a next link and no previous one.
export const nextOf = id => {
  const i = components.indexOf(id);
  if (i < 0) return components[0];
  return i < components.length - 1 ? components[i + 1] : null;
};
