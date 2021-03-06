/*jshint multistr: true */
var templates = {
	title: '\
		<li id="t<%=id%>" class="title">\
			<%=title%>\
		</li>',
	definition:'\
			<h4><%=name%></h4>\
			<p><%=description%></p>\
	',
	story:'\
		<div id="s<%=id%>" class="story">\
			<div class="info">\
				<h2 class="story-title"><%=title%></h2>\
				<p class="text-muted"><%=start%>-<%=end%></p>\
				<p class="description"><%=description%></p>\
			</div>\
			<ul class="articles"></ul>\
		</div>\
	',
	article: '\
		<li class="article">\
			<p class="byline">by <span style="text-transform: uppercase;"><%= author %></span></p>\
			<p class="pub-date">Published: <%=date%></p>\
			<div class="title">\
				<a href="<%=url%>" target="poppythepopper">\
					<b><%=title%></b>\
				</a>\
			</div>\
		</li>\
	',
	bandLabel: '<%=title%>',
	layout: '<div class="unit">' +
			'<h2 class="headline">The Ebb and Flow of Capital Markets</h2>' +
			'<p class="subhead">Companies and governments raise billions of dollars each year in the capital markets.<br>See how the issuance of various types of debt and equity have changed over the past 16 years.</p>' +
		'</div>' +
		'<div class="unit">' +
			'<div id="markets" class="chart"></div>' +
			'<ul id="stories"></ul>' +
			'<div id="definitions" class="definitions"></div>' +
			'<p class="legend-helper">Select a single item above for a more detailed view</p>' +
		'</div>'
};


