export function currentMenu(menus, location) {
	if (!menus || menus.isEmpty()) {
		return undefined;
	}

	return menus.find(menu => menu.getIn(['fields', 'location']) === location);
}
