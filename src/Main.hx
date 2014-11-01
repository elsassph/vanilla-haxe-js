package;

import haxe.Http;
import haxe.Json;
import js.Browser;
import js.html.ButtonElement;
import js.html.DivElement;
import js.html.UListElement;

class Main 
{
	var view:DivElement;
	var list:UListElement;
	var button:ButtonElement;
	var data:Array<ItemInfo>;
	
	function new()
	{
		createChildren();
		loadData();
	}
	
	function createChildren() 
	{
		var doc = Browser.document;
		
		view = doc.createDivElement();
		view.className = "listview";
		
		list = doc.createUListElement();
		
		button = doc.createButtonElement();
		button.textContent = "Add an item";
		button.onclick = function(_) {
			data.push({
				label: 'New item ${data.length+1}',
				id: data.length
			});
			render();
		}
		
		view.appendChild(list);
		view.appendChild(button);
		doc.body.appendChild(view);
	}
	
	function loadData() 
	{
		var loader = new Http("data.json");
		loader.onData = function(raw) {
			try {
				data = Json.parse(raw);
				if (!Std.is(data, Array))
					throw "ArgumentError: Json data is not an array";
				render();
			}
			catch (err:Dynamic) {
				untyped alert(err);
			}
		}
		loader.request();
	}
	
	function render() 
	{
		var doc = Browser.document;
		var fragments = doc.createDocumentFragment();
		for (info in data)
		{
			var li = doc.createLIElement();
			var label = doc.createDivElement();
			label.textContent = info.label;
			li.appendChild(label);
			fragments.appendChild(li);
		}
		list.innerHTML = "";
		list.appendChild(fragments);
	}
	
	// entry point
	static function main() 
	{
		new Main();
	}
}

typedef ItemInfo = {
	label:String,
	?date:String,
	id:Int
}

