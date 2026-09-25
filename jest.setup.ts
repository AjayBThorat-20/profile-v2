import "@testing-library/jest-dom";

// jsdom implements no IntersectionObserver, and components now use it for
// scroll reveals and for deferring below-the-fold work (see useScrollReveal).
// Without a stand-in, merely rendering such a component throws.
//
// This one reports the target as intersecting straight away, so components
// under test behave as though they are on screen - which is what the existing
// assertions describe, and keeps tests about what a component renders rather
// than about when a browser decides to tell it so.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  // Part of the current DOM lib's IntersectionObserver interface; unused here,
  // but the class has to carry it to satisfy the type.
  readonly scrollMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.root = (options?.root as Element | Document | null) ?? null;
    this.rootMargin = options?.rootMargin ?? "";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
  }

  observe(target: Element): void {
    this.callback(
      [
        {
          target,
          isIntersecting: true,
          intersectionRatio: 1,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: 0,
        } as IntersectionObserverEntry,
      ],
      this,
    );
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;
