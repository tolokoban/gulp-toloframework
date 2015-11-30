/**
 * Not a real element. Just a list of elements.
 * Must contain `children`.
 */
exports.ROOT = 0;
exports.VOID = 0;

/**
 * DOM element tag.
 * Has an attribute *name*.
 * @const
 */
exports.TAG = 1;
exports.ELEMENT = 1;


/**
 * HTML text node.
 * Has an attribute *text*.
 * @const
 */
exports.TEXT = 2;

/**
 * HTML CDATA section.
 * @example
 * <![CDATA[This a is a CDATA section...]]>
 * @const
 */
exports.CDATA = 3;

/**
 * @example
 * <?xml-stylesheet href="default.css" title="Default style"?>
 */
exports.PROCESSING = 4;

/**
 * HTML comment.
 * @example
 * <-- This is a comment -->
 * @const
 */
exports.COMMENT = 5;

/**
 * @const
 */
exports.DOCTYPE = 6;

/**
 * @const
 */
exports.TYPE = 7;

/**
 * Example: `&amp;`, `&lt;`, ...
 */
exports.ENTITY = 8;

/**
 * Put the `text` attribute verbatim, without any transformation, nor parsing.
 */
exports.VERBATIM = 98;

/**
 * Every children is a diffrent HTML file. Usefull to generate several pages.
 */
exports.PAGES = 99;
