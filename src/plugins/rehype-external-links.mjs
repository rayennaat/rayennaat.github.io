import { visit } from "unist-util-visit";

/**
 * 为文章中的绝对链接添加 target="_blank" 和 rel="noopener noreferrer"
 * 处理以 http:// 或 https:// 开头的链接，包括同域名项目链接
 *
 * @returns {Function} rehype transformer
 */
export default function rehypeExternalLinks() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "a") return;

			const href = node.properties?.href;
			if (typeof href !== "string") return;

			// 只处理 http/https 绝对链接
			if (!href.startsWith("http://") && !href.startsWith("https://")) return;

			node.properties.target = "_blank";
			node.properties.rel = "noopener noreferrer";
		});
	};
}
