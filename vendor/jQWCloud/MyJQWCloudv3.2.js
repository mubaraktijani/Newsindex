
$.fn.jQWCloud = function (_options) {
	var defaults = {
		word_click: function (wordCloud = {}) { }
	};
	var options = jQuery.extend(defaults, _options);
	console.log(options);
	var wc = new WordCloud();
	/*wc._setTarget(jQuery(this));
	wc._init(options);*/
};