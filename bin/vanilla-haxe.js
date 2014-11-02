(function () { "use strict";
var Lambda = function() { };
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
};
var Main = function() {
	this.createChildren();
	this.loadData();
};
Main.main = function() {
	new Main();
};
Main.prototype = {
	createChildren: function() {
		var _g = this;
		var doc = window.document;
		this.view = doc.createElement("div");
		this.view.className = "listview";
		this.list = doc.createElement("ul");
		this.button = doc.createElement("button");
		this.button.textContent = "Add an item";
		this.button.onclick = function(_) {
			_g.data.push({ label : "New item " + (_g.data.length + 1), id : _g.data.length});
			_g.render();
		};
		this.view.appendChild(this.list);
		this.view.appendChild(this.button);
		doc.body.appendChild(this.view);
	}
	,loadData: function() {
		var _g = this;
		var loader = new haxe.Http("data.json");
		loader.onData = function(raw) {
			try {
				_g.data = JSON.parse(raw);
				if(!((_g.data instanceof Array) && _g.data.__enum__ == null)) throw "ArgumentError: Json data is not an array";
				_g.render();
			} catch( err ) {
				alert(err);
			}
		};
		loader.request();
	}
	,render: function() {
		var doc = window.document;
		var fragments = doc.createDocumentFragment();
		var _g = 0;
		var _g1 = this.data;
		while(_g < _g1.length) {
			var info = _g1[_g];
			++_g;
			var li = doc.createElement("li");
			var label = doc.createElement("div");
			label.textContent = info.label;
			li.appendChild(label);
			fragments.appendChild(li);
		}
		this.list.innerHTML = "";
		this.list.appendChild(fragments);
	}
};
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
var js = {};
js.Browser = function() { };
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
Main.main();
})();

//# sourceMappingURL=vanilla-haxe.js.map