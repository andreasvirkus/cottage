declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"thoughts": {
"appending-lines-to-xml.md": {
	id: "appending-lines-to-xml.md";
  slug: "appending-lines-to-xml";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"background-bleed.md": {
	id: "background-bleed.md";
  slug: "background-bleed";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"barebones-vue-api-mocks.md": {
	id: "barebones-vue-api-mocks.md";
  slug: "barebones-vue-api-mocks";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"css-better-quotes.md": {
	id: "css-better-quotes.md";
  slug: "css-better-quotes";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"do-your-pixels-justice/index.mdx": {
	id: "do-your-pixels-justice/index.mdx";
  slug: "do-your-pixels-justice";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".mdx"] };
"emoji-flags.md": {
	id: "emoji-flags.md";
  slug: "emoji-flags";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"emoji-icon-set.md": {
	id: "emoji-icon-set.md";
  slug: "emoji-icon-set";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"footnotes-on-the-web.md": {
	id: "footnotes-on-the-web.md";
  slug: "footnotes-on-the-web";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"fuzzy-svg-filters.md": {
	id: "fuzzy-svg-filters.md";
  slug: "fuzzy-svg-filters";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"get-your-scroll-on.md": {
	id: "get-your-scroll-on.md";
  slug: "get-your-scroll-on";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"giving-this-another-go/index.md": {
	id: "giving-this-another-go/index.md";
  slug: "giving-this-another-go";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"increment-javascript-date/index.mdx": {
	id: "increment-javascript-date/index.mdx";
  slug: "increment-javascript-date";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".mdx"] };
"inline-event-handlers.md": {
	id: "inline-event-handlers.md";
  slug: "inline-event-handlers";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"javascript-bookmarklets.md": {
	id: "javascript-bookmarklets.md";
  slug: "javascript-bookmarklets";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"lightweight-event-bus.md": {
	id: "lightweight-event-bus.md";
  slug: "lightweight-event-bus";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"make-the-web-sing/index.md": {
	id: "make-the-web-sing/index.md";
  slug: "make-the-web-sing";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"markdown-style-guide.md": {
	id: "markdown-style-guide.md";
  slug: "markdown-style-guide";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"markdown-target-blank-links.md": {
	id: "markdown-target-blank-links.md";
  slug: "markdown-target-blank-links";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"modern-css-color-mixing.md": {
	id: "modern-css-color-mixing.md";
  slug: "modern-css-color-mixing";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"my-site-stack.md": {
	id: "my-site-stack.md";
  slug: "my-site-stack";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"open-your-mouth-part-1-prologue/index.md": {
	id: "open-your-mouth-part-1-prologue/index.md";
  slug: "open-your-mouth-part-1-prologue";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"open-your-mouth-part-2-topic/index.md": {
	id: "open-your-mouth-part-2-topic/index.md";
  slug: "open-your-mouth-part-2-topic";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"properly-disable-forms.md": {
	id: "properly-disable-forms.md";
  slug: "properly-disable-forms";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"round-to-stops.md": {
	id: "round-to-stops.md";
  slug: "round-to-stops";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"shopify-embed-navigation-menu.md": {
	id: "shopify-embed-navigation-menu.md";
  slug: "shopify-embed-navigation-menu";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"simple-image-placeholders.md": {
	id: "simple-image-placeholders.md";
  slug: "simple-image-placeholders";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"simplest-auto-resizing-textarea.md": {
	id: "simplest-auto-resizing-textarea.md";
  slug: "simplest-auto-resizing-textarea";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"singularize-words.md": {
	id: "singularize-words.md";
  slug: "singularize-words";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-chainable-classlist.md": {
	id: "snippet-chainable-classlist.md";
  slug: "snippet-chainable-classlist";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-chainable-logger.md": {
	id: "snippet-chainable-logger.md";
  slug: "snippet-chainable-logger";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-csp-hashing.md": {
	id: "snippet-csp-hashing.md";
  slug: "snippet-csp-hashing";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-string-to-html.md": {
	id: "snippet-string-to-html.md";
  slug: "snippet-string-to-html";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-strip-html.md": {
	id: "snippet-strip-html.md";
  slug: "snippet-strip-html";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-vue-logger.md": {
	id: "snippet-vue-logger.md";
  slug: "snippet-vue-logger";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-wait.md": {
	id: "snippet-wait.md";
  slug: "snippet-wait";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"sort-shopify-products-by-availability.md": {
	id: "sort-shopify-products-by-availability.md";
  slug: "sort-shopify-products-by-availability";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"spice-up-your-gists/index.md": {
	id: "spice-up-your-gists/index.md";
  slug: "spice-up-your-gists";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"stack-css-transforms.md": {
	id: "stack-css-transforms.md";
  slug: "stack-css-transforms";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"tailwind-hocus-pocus.md": {
	id: "tailwind-hocus-pocus.md";
  slug: "tailwind-hocus-pocus";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"testing-typography-styles.md": {
	id: "testing-typography-styles.md";
  slug: "testing-typography-styles";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"translate-ordinal-suffixes.md": {
	id: "translate-ordinal-suffixes.md";
  slug: "translate-ordinal-suffixes";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"typescript-exhaustive-switch.md": {
	id: "typescript-exhaustive-switch.md";
  slug: "typescript-exhaustive-switch";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"vue-html-variables.md": {
	id: "vue-html-variables.md";
  slug: "vue-html-variables";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"vue-marquee.md": {
	id: "vue-marquee.md";
  slug: "vue-marquee";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
