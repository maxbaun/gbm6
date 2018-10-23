export function currentMenu(menus, location) {
	if (!menus || menus.isEmpty()) {
		return undefined;
	}

	return menus.find(menu => menu.getIn(['fields', 'location']) === location);
}

export function currentPage(pages, slug) {
	if (!pages || pages.isEmpty()) {
		return undefined;
	}

	return pages.find(page => page.getIn(['fields', 'slug']) === slug);
}
