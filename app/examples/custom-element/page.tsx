"use client";

import { useEffect } from "react";

// Define a custom element
class MyCustomElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<p>This is a custom element from React</p>";
  }
}

// Register the custom element
if (typeof customElements !== "undefined") {
  customElements.define("my-custom-element", MyCustomElement);
}

export default function Component() {
  useEffect(() => {
    // Ensure the custom element is defined
    if (
      typeof customElements !== "undefined" &&
      !customElements.get("my-custom-element")
    ) {
      customElements.define("my-custom-element", MyCustomElement);
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Custom Element Example</h2>
      {/* @ts-expect-error type is not defined for custom element*/}
      <my-custom-element />
    </div>
  );
}
