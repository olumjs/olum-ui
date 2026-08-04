import { store } from "olum";

export const toast = store({
  items: [],
  add({ title, description, type = "default", duration = 4000 } = {}) {
    const id = Date.now() + Math.random();
    this.items.push({ id, title, description, type });
    setTimeout(() => this.dismiss(id), duration);
  },
  dismiss(id) {
    this.items = this.items.filter((t) => t.id !== id);
  },
});
