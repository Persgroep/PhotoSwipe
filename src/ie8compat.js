function isIE8_() {
    return window.attachEvent && !window.addEventListener;
}

function preventDefault_(e) {
	return e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

function currentTarget_(e) {
	return e.currentTarget || e.srcElement;
}

if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop === 'float') {
                prop = 'styleFloat';
            }
			if (re.test(prop)) {
				prop = prop.replace(re, function (n, m, o) {
					return o.toUpperCase();
				});
			}
			return el.currentStyle[prop] || null;
		};
		return this;
	};
}
