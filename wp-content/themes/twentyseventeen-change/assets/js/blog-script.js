(function( $ ) {
	var $cont = $("#PostCont");
	var $sel = $("#Filters select");
	var $ser = $("#Search");
	var $ad = $('button.advanced');

	$ser.on("keyup", function(){ // search by typing
		var v = this.value;
		var $html = $("<div>", {"class" : "post-wrap"});
		for (z = 0; z < blog_posts.length; z++) {
			var title = blog_posts[z][0]["title"];
			var body = blog_posts[z][0]["content"];
			var link = blog_posts[z][0]["link"];
			var escaped = v.replace(/[^\w\s]/g, "\\$&");
			var reg = new RegExp("\\b(" + escaped + ")", 'g');
			var reg2 = new RegExp("\\b(" + escaped + ")", 'gi');
			var bmatch = body.match(reg2);
			var tmatch = title.match(reg2);
				link = $("<a>", {"href" : link, text : "Read More", "class" : "link-more" });
				if ((bmatch !== null || tmatch !== null) && v.length > 0) {
					var $pC = $("<div>", {"class" : "post-cont"});
					var $b = $("<div>");
					var $t = $("<h2>");
					var r = body.replace(reg2, lowerUpper(escaped, reg, body));
					var q = title.replace(reg2, lowerUpper(escaped, reg, title));

					$t.html(q);
					$pC.append($t);
					$pC.append(r);
					$pC.append(link);
					$html.append($pC);
				} // end if
		} // end for
		$cont.empty().append($html);
	});

	$ad.on("click", function(){
		var win = speedWindow(this);
		return win;
	});
	// drop down menu
	$sel.on("change", function(){
		var d = $(this).find("option:checked").data("cat-id");
		var $html = $("<div>", {"class" : "post-wrap"});
		for (z = 0; z < blog_posts.length; z++) {
			var cats = blog_posts[z][0]["categories"];
			for (x = 0; x < cats.length; x++) {
				if (d == cats[x]) {
					var $pC = $("<div>", {"class" : "post-cont"});
					var t = '<h2>' + blog_posts[z][0]["title"] + '</h2>';
					var c = blog_posts[z][0]["content"];
					$pC.append(t);
					$pC.append(c);
					$html.append($pC);
				}
			}
		}
		$cont.empty().append($html);
	});

	function lowerUpper(l, e, context) {
			if (context.match(e) !== null) {
				return " <span class=\"highlight\">" + l + "</span>";
			} else {
				console.log("not a match");
			}
	}

	function speedWindow(t){
		if ($(".helper").length === 0) {
			var $div = $("<div>", {"class" : "helper", "html" : "<button class=\"close\">x</button><p>For more advanced searches, seperate your search terms by commas.</p>"});
			var $par = $(t.parentElement.parentElement);
			$par.append($div);
			var $c = $(".helper .close");
			$c.on("click", function(){
				var win = closeWindow(this);
				return win;
			});
		} else {
			$(".helper").toggleClass("toggled");
		}
		return false;
	}

	function closeWindow(w) {
		var $par = $(w.parentElement);
		$par.toggleClass("toggled");
		return false;
	}
})(jQuery);