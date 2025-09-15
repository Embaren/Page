/**
 * Custom HTML element to display an SVG symbol based on a specified type.
 * @extends HTMLElement
 */
class HTMLCharacterSymbolElement extends HTMLElement {
	/**
	 * Attributes to observe for changes.
	 * @type {string[]}
	 */
	static observedAttributes = ["type"];

	/**
	 * Creates an SVG symbol element with the specified name.
	 * @param {string} name - The name of the SVG symbol.
	 * @returns {SVGSVGElement} The created SVG symbol element.
	 */
	static getSymbol(name) {
		const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		use.setAttribute('href', `/resources/icons/${name}.svg#icon`);
		symbol.appendChild(use);
		return symbol;
	}

	/**
	 * CSS styles for the shadow DOM.
	 * @type {string}
	 */
	static #style = `:host{display:inline-flex;} svg{height:1cap;width:1cap;}`;

	#shadow; // Shadow DOM root
	#symbol; // Current symbol element

	/**
	 * The tag name for the custom element.
	 * @type {string}
	 */
	static get tag() {
		return 'char-symbol';
	}

	/**
	 * Creates an instance of HTMLCharacterSymbolElement.
	 */
	constructor() {
		super();
		this.#symbol = document.createElement('span');
		this.#shadow = this.attachShadow({ mode: "closed" });
		this.#shadow.innerHTML = `<style>${HTMLCharacterSymbolElement.#style}</style>`;
		this.#shadow.appendChild(this.#symbol);
		this.#setSVG(this.type);
	}

	/**
	 * Called when the element is added to the DOM.
	 */
	connectedCallback() {
		// Additional initialization can be added here if needed
	}

	/**
	 * Gets the 'type' attribute.
	 * @returns {string|null} The value of the 'type' attribute.
	 */
	get type() {
		return this.getAttribute('type');
	}

	/**
	 * Sets the 'type' attribute.
	 * @param {string|null} name - The new value for the 'type' attribute.
	 */
	set type(name) {
		if (name) {
			this.setAttribute('type', name);
		} else {
			this.removeAttribute('type');
		}
	}

	/**
	 * Updates the displayed SVG symbol.
	 * @param {string|null} name - The name of the new SVG symbol.
	 */
	#setSVG(name) {
		if (!name) {
			const placeholder = document.createElement('span');
			this.#symbol.replaceWith(placeholder);
			this.#symbol = placeholder;
			return;
		}
		const symbol = HTMLCharacterSymbolElement.getSymbol(name);
		this.#symbol.replaceWith(symbol);
		this.#symbol = symbol;
	}

	/**
	 * Called when an observed attribute changes.
	 * @param {string} name - The name of the attribute that changed.
	 * @param {string|null} oldValue - The old value of the attribute.
	 * @param {string|null} newValue - The new value of the attribute.
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		if (newValue === oldValue) {
			return;
		}
		if (name === "type") {
			this.#setSVG(newValue);
		}
	}
}

// Define the custom element
customElements.define(HTMLCharacterSymbolElement.tag, HTMLCharacterSymbolElement);