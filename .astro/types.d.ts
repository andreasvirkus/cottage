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
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

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
"appending-lines-to-xml/index.md": {
	id: "appending-lines-to-xml/index.md";
  slug: "appending-lines-to-xml";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"building-dashboards-for-your-site/index.md": {
	id: "building-dashboards-for-your-site/index.md";
  slug: "building-dashboards-for-your-site";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"creating-keep-alive-monitoring/index.md": {
	id: "creating-keep-alive-monitoring/index.md";
  slug: "creating-keep-alive-monitoring";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"do-your-pixels-justice/index.md": {
	id: "do-your-pixels-justice/index.md";
  slug: "do-your-pixels-justice";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"emoji-icon-set/index.md": {
	id: "emoji-icon-set/index.md";
  slug: "emoji-icon-set";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"footnotes-on-the-web/index.md": {
	id: "footnotes-on-the-web/index.md";
  slug: "footnotes-on-the-web";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"fuzzy-svg-filters/index.md": {
	id: "fuzzy-svg-filters/index.md";
  slug: "fuzzy-svg-filters";
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
"increment-javascript-date/index.md": {
	id: "increment-javascript-date/index.md";
  slug: "increment-javascript-date";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"inline-event-handlers/index.md": {
	id: "inline-event-handlers/index.md";
  slug: "inline-event-handlers";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"javascript-bookmarklets/index.md": {
	id: "javascript-bookmarklets/index.md";
  slug: "javascript-bookmarklets";
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
"my-site-stack/index.md": {
	id: "my-site-stack/index.md";
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
"snippet-chainable-classlist/index.md": {
	id: "snippet-chainable-classlist/index.md";
  slug: "snippet-chainable-classlist";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-chainable-logger/index.md": {
	id: "snippet-chainable-logger/index.md";
  slug: "snippet-chainable-logger";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-csp-hashing/index.md": {
	id: "snippet-csp-hashing/index.md";
  slug: "snippet-csp-hashing";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-vue-logger/index.md": {
	id: "snippet-vue-logger/index.md";
  slug: "snippet-vue-logger";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"snippet-wait/index.md": {
	id: "snippet-wait/index.md";
  slug: "snippet-wait";
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
"stack-css-transforms/index.md": {
	id: "stack-css-transforms/index.md";
  slug: "stack-css-transforms";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"testing-typography-styles/index.md": {
	id: "testing-typography-styles/index.md";
  slug: "testing-typography-styles";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
"vue-html-variables/index.md": {
	id: "vue-html-variables/index.md";
  slug: "vue-html-variables";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}