import { store } from "olum";

// Assigns a stable, unique id per <Carousel> instance so multiple carousels
// on the same page don't share (and fight over) the same offset below.
let uid = 0;
export function nextCarouselId() {
  return `carousel-${uid++}`;
}

// CarouselContent/Next/Previous are separate sibling components with no
// context API to share state directly. Keeping the scroll offset here instead
// means writing it from any one of them (a drag, or either button) reactively
// re-renders whichever of the others reads it -- olum-store's normal
// subscribe-by-read behavior -- with no manual change-notification needed.
export const carouselStore = store({
  offsets: {},
  setOffset(id, value) {
    this.offsets[id] = value;
  },
  getOffset(id) {
    return this.offsets[id] || 0;
  },
});
