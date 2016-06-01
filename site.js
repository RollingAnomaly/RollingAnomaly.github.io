function init() {
/* Run all the onLoad commands */

    resizeHeight();
    buildTabBar();
    selfPromote();

}

// *****************************************************************************
// Re-size pages
// *****************************************************************************
function resizeHeight() {
/* In order to make sure that div that holds the page content is tall
  enough to fill up the whole height of the browser, we do a little test
  here and resize if necessary.
*/

    /* Find the current height of the content div */
    contentObj = document.getElementById('content');
    var contentObjHeight = contentObj.offsetHeight;

    /* Find the browswer window height */
    var screenHeight = screen.height;

    /* Resize div if necessary */
    if (contentObjHeight < screenHeight) {
        contentObj.style.height = screenHeight + 'px';
    }
}

// *****************************************************************************
// In-page tab bar navigation
// *****************************************************************************
var tabArray = new Array;
var selectedTab = '';
function buildTabBar() {

    if (document.getElementById('tab_bar')) {

        var tabData = document.getElementById('tab_bar').innerHTML;
        tabArray = tabData.split('|');

        var tabs_code = '<table cellpadding="0" cellspacing="0" width="100%"><tr><td class="blank_tab" style="width: 15px;">&nbsp;</td>';
        for (var i = 0; i < tabArray.length; i++) {

            // Chomp string
            tabArray[i] = tabArray[i].replace(/[^a-zA-Z0-9]+$/, '');

            // IDs
            var tabID = 'tab' + i;
            var contentID = (tabArray[i].split(':'))[1];

            // General vars
            var linkTarget = (tabArray[i].split(':'))[0] + '_' + (contentID.toLowerCase()).replace(/ /, '_') + '.html';
            if (tabArray[i].match(':selected')) selectedTab = tabID;

            // Styles
            var tabStyle = (tabArray[i].match(':selected')) ? 'tab_selected' : 'tab';
            var linkStyle = (tabArray[i].match(':selected')) ? 'selected_tab' : 'unselected_tab';

            // Tab Cell
            tabs_code += '<td class="' + tabStyle + '" id="' + tabID + '" ' +
                'onMouseOver="highlightTab(this.id)" ' +
                'onMouseOut="unHighlightTab(this.id)">' +
                '<a class="' + linkStyle + '" href="' + linkTarget + '" onFocus="this.blur()" target="content">' + contentID + '</a></td>' +
                '<td class="blank_tab" style="width: 5px;">&nbsp;</td>';

        }
        tabs_code += '<td class="blank_tab" width="100%">&nbsp;</td></tr></table>';

        // Display everything
        document.getElementById('tab_bar').innerHTML = tabs_code;
        document.getElementById('tab_bar').style.display = 'block';

    }
}


function highlightTab(tabID) {

    if (document.getElementById(tabID) && selectedTab != tabID) {
        document.getElementById(tabID).style.background = '#888888';
        document.getElementById(tabID).style.color = '#111111';
    }
}


function unHighlightTab(tabID) {

    if (document.getElementById(tabID) && selectedTab != tabID) {
        document.getElementById(tabID).style.background = '#444444';
        document.getElementById(tabID).style.color = '#ffffff';
    }
}


