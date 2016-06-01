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

var siteURL = '';

menus.charities = new menu("charities", "primary");
menus.charities.addOption("Where will your money go?", "charities/charities.html", "content");
menus.charities.addOption("Mercy Corps Mongolia(external link)", "http://www.mercycorps.org.mn/", "_blank");
menus.charities.addOption("Hope and Homes for Children (external link)", "http://www.hopeandhomes.org/",  "_blank");
menus.charities.addOption("DONATE - Will we make it (external link)", "http://www.willwemakeit.com/rollinganomaly",  "_blank");
menus.charities.addOption("Wish list", siteURL + "charities/wishlist.html", "content");

menus.car = new menu("car", "primary");
menus.car.addOption("Introducing Barney", "car/car.html" , "content");
menus.car.addOption("More about the Allegro" , "car/allegro.html" , "content");
menus.car.addOption("Car Trouble", "car/problems.html" , "content");
menus.car.addOption("Simon's Rally Preparation", "car/simon.html" , "content");


menus.progress = new menu("progress", "primary");
menus.progress.addOption("Fundraising", siteURL + "progress/fundraising.html","content");
menus.progress.addOption("News", siteURL + "progress/blog.html", "content");
menus.progress.addOption("Route", siteURL + "progress/route.html", "content");
menus.progress.addOption("Videos", siteURL + "progress/videos.html", "content");
menus.progress.addOption("Email Updates", siteURL + "progress/updates.html", "content");


menus.misc = new menu("misc", "primary");
menus.misc.addOption("Mongol Rally Official Site", "http://mongolrally.theadventurists.com/", "_blank");
menus.misc.addOption("Our page on the Mongol Rally Site", siteURL + "http://mongolrally08.theadventurists.com/rollinganomaly", "_blank");
menus.misc.addOption("Rolling Anomaly Facebook Group", siteURL + "http://uclac.facebook.com/group.php?gid=7128379893", "_blank");
