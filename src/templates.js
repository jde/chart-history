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
			<div class="date"><em><%=date%> by <%=author%></em></div>\
			<div class="title">\
				<a href="<%=url%>" target="poppythepopper">\
					<b><%=title%></b>\
				</a>\
			</div>\
		</li>\
	',
	bandLabel: '<%=title%>',
	layout: '\
		<div class="unit">\
			<h3>The Ebb and Flow of Capital Markets</h3>\
		</div>\
		<div class="unit">\
			<ul id="stories">\
				<p class="headline">Companies and governments raise billions of dollars each year in the capital markets. See how the issuance of various types of debt and equity have changed over the past 16 years.</p>\
			</ul>\
			<div id="markets" class="chart"></div>\
			<div id="definitions" class="definitions"></div>\
		</div>\
	'
};


