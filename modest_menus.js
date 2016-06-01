/* -----------------------------------------------------------------------------

    modest.menus v1.0
    last updated on Sep. 10, 2007 (09-10-2007)
    Copyright (C) 2007  Dave Rankin dave.caretcake@gmail.com

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
    02110-1301, USA.

    For an explanation of this file and how to use ModestMenus,
    please see the documentation that is supplied in the archive
    with this file or vist http://dave.caretcake.com.

----------------------------------------------------------------------------- */

/* Globals */
var openMenus = new Array();        // Array that holds the id of all open menus
var menuTimerId;                    // Menus timer id
var menuTimerStatus = 'off';        // Menus timer status
var menus = new Array();            // Menu container

function menu(name, type) {
/* menu object constructor */

    // properties
    this.name = name;
    this.type = type;
    this.menuWidth = "";
    this.menuPaddingLeft = "";
    this.menuPaddingTop = "";
	this.status = 'hidden';
    this.options = new Array();

    // methods
    this.addOption = addOption;
    this.properties = properties;
    this.width = width;
    this.paddingLeft = paddingLeft;
    this.paddingTop = paddingTop;

    // menu containers
    document.write('<div id="' + name + 'Container" class="menuContainer" onMouseOut="hideMenus()"></div>')
	document.write('<iframe id="' + name + 'IEHack" src="javascript:false;" scrolling="no" frameborder="1" style="position: absolute; display: none;"></iframe>');

}

function menuOption(title, url, target, spawn) {
/* menu option object constructor */

    // properties
    this.title = title;
    this.url = url;
    this.target = target;
    this.spawn = spawn || "";

}

function addOption(title, url, target, spawn) {
/* method to add an option object to a menu object's options property */

    var optionObj = new menuOption(title, url, target, spawn);
    this.options.push(optionObj);

}

function showMenu(menu, src, srcContainer) {
/* construct and display a menu */

	if (menus[menu].status == 'hidden') {

		// Kill all unnecessary menus
		if (menus[menu].type == 'primary') killMenus();

		// Cancel the hideMenus() timer
		cancelMenuTimer();

		// container = <div> that holds all of the options; class = menuContainer
        var containerName = menu + 'Container';
		var container = document.getElementById(containerName);

        // Parse override properties if they exist
        var optionStyle = '';

        if (menus[menu].menuWidth) {
            container.style.width = menus[menu].menuWidth + 'px';
            optionStyle = 'style="width: ' + menus[menu].menuWidth + 'px;  ';
        }

        if (optionStyle) optionStyle += '" ';

        // Populate a container with its options
		for (var i = 0; i < menus[menu].options.length; i++) {

			var optionObj = menus[menu].options[i];
			var optionId = menus[menu].name + 'Option' + i;
			if (optionObj.spawn) {
            // create an option that spawns a submenu
				container.innerHTML +=
                    '<div id="' + optionId + '" class="menuOptionContainer" ' +
                    optionStyle + ' onMouseOver="highlight(\'' + menu + '\', \'' + optionId + '\'); ' +
					'killSubMenus(\'' + menu + '\'); ' +
					'showMenu(\'' + optionObj.spawn + '\', this, \'' + containerName + '\')" ' + '>' +
					'<a class="menuOption" href="' + optionObj.url + '" target="' + optionObj.target + '" >' +
                    optionObj.title + '</a></div>';
			}
			else {
            // create an option that doesn't spawn a submenu
				var optionId = menus[menu].name + 'Option' + i;
				container.innerHTML += '<div id="' + optionId + '" class="menuOptionContainer" ' +
                    optionStyle + ' onMouseOver="highlight(\'' + menu + '\', \'' + optionId + '\'); ' +
					'killSubMenus(\'' + menu + '\')"' + '>' +
					'<a class="menuOption" href="' + optionObj.url + '" target="' + optionObj.target + '" >' +
					optionObj.title + '</a></div>';
			}
		}

		// menuHeader = the object that that was mousedover
		var menuHeader = (src) ? src : document.getElementById(menu);
		var headerX = findPosX(menuHeader);
		var headerY = findPosY(menuHeader);
		if (menus[menu].type == 'primary') {
		// Primary menus dropdown

            var baseLeft = headerX;
            if (menus[menu].menuPaddingLeft) baseLeft += menus[menu].menuPaddingLeft;
			container.style.left = baseLeft + 'px';

            var iePaddingHack = (window.ActiveXObject) ? 2 : 0;
            var baseTop = headerY + menuHeader.offsetHeight + iePaddingHack;
            if (menus[menu].menuPaddingTop) baseTop += menus[menu].menuPaddingTop;
            container.style.top = baseTop + 'px';

		}
		else {
		// All others display to the right side

            var baseLeft = headerX + document.getElementById(srcContainer).offsetWidth;
            if (menus[menu].menuPaddingLeft) baseLeft += menus[menu].menuPaddingLeft;
			container.style.left = baseLeft + 'px';

            var baseTop = headerY;
            if (menus[menu].menuPaddingTop) baseTop += menus[menu].menuPaddingTop;
			container.style.top = baseTop + 'px';

		}
		menus[menu].status = 'displayed';

		// Update openMenus Array Display
		openMenus.length++;
		openMenus[openMenus.length - 1] = menu;

		// IE workaround for a bug in displaying divs over select boxes
        if (window.ActiveXObject) {

			var ieHack = document.getElementById(menu + 'IEHack');
            ieHack.style.width = container.offsetWidth;
            ieHack.style.height = container.offsetHeight;
            ieHack.style.top = container.style.top;
            ieHack.style.left = container.style.left;
            ieHack.style.zIndex = 9999;
            ieHack.style.display = 'block';
        }
		container.style.visibility = 'visible';
	}
}

function findPosX(obj) {
/* locate the x coord of the object that was passed */

    var curleft = 0;
    if (obj.offsetParent) {
        while (1) {
            curleft += obj.offsetLeft;
            if (! obj.offsetParent) {
                break;
            }
            obj = obj.offsetParent;
        }
    }
    else if (obj.x) {
        curleft += obj.x;
    }
    return curleft;
}

function findPosY(obj) {
/* locate the y coord of the object that was passed */

    var curtop = 0;
    if (obj.offsetParent) {
        while (1) {
            curtop += obj.offsetTop;
            if (! obj.offsetParent) {
                break;
            }
            obj = obj.offsetParent;
        }
    }
    else if (obj.y) {
        curtop += obj.y;
    }
    return curtop;
}

function killMenus() {
/* kill all open menus */

	for (var i = 0; i < openMenus.length; i++) {
		var menuObj = openMenus[i];
		// IE workaround for a bug in displaying divs over select boxes
        if (window.ActiveXObject) {
			var ieHack = document.getElementById(menuObj + 'IEHack');
            ieHack.style.display = 'none';
        }
		document.getElementById(menuObj + 'Container').style.visibility = 'hidden';
		document.getElementById(menuObj + 'Container').innerHTML = '';
		menus[menuObj].status = 'hidden';
	}
	openMenus.length = 0;
}

function killSubMenus(menu) {
/* kill all non-needed submenus */

	for (var i = openMenus.length - 1; i >= 0; i--) {
		if (openMenus[i] != menu) {
			// IE workaround for a bug in displaying divs over select boxes
			if (window.ActiveXObject) {
				var ieHack = document.getElementById(menuObj + 'IEHack');
				ieHack.style.display = 'none';
			}
			document.getElementById(openMenus[i] + 'Container').style.visibility = 'hidden';
			document.getElementById(openMenus[i] + 'Container').innerHTML = '';
			menus[openMenus[i]].status = 'hidden';
			openMenus.length--;
		}
		else {
			break;
		}
	}
}

function highlight(menu, highlightOptionId) {
/* highlight the mousedover option */

	// Cancel the hideMenus() timer
	cancelMenuTimer();

	// Turn off all highlighting in this container
	for (var i = 0; i < menus[menu].options.length; i++) {
		var optionId = menus[menu].name + 'Option' + i;
		document.getElementById(optionId).className = 'menuOptionContainer';
	}

	// Highlight only the hovered over option
	document.getElementById(highlightOptionId).className = 'menuOptionContainerHover';
}

function hideMenus() {
/* set the timer to hide all the menus if they go untouched for x milliseconds */

	if (menuTimerStatus == 'off') {
		menuTimerId = setTimeout("killMenus()", 500);
		menuTimerStatus = 'on';
	}
}

function cancelMenuTimer() {
/* something was touched so cancel the hideMenus timer */

	if (menuTimerStatus == 'on') {
		clearTimeout(menuTimerId);
		menuTimerStatus = 'off';
	}
}

function properties(propertyArgs) {
/* accepts a string in the format 'foo=>faa' where foo is a valid menu object
  property and faa is the value to set it to
*/

    var propertyName = propertyArgs.split("=>")[0];
    var propertyValue = propertyArgs.split("=>")[1];
    eval('this.' + propertyName + ' = ' + propertyValue);

}

function width(w) {
/* set menuObject.menuWidth property */

    return 'menuWidth=>' + w;

}

function paddingLeft(p) {
/* set menuObject.paddingLeft property */

    return 'menuPaddingLeft=>' + p;

}

function paddingTop(p) {
/* set menuObject.paddingTop property */

    return 'menuPaddingTop=>' + p;

}
