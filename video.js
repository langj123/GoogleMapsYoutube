function initMap() {
    var map = new google.maps.Map(document.getElementById('GoogleMap'), {
      zoom: 14,
      center: {lat: -34.397, lng: 150.644}
    });
    var markers = [];
    var geocoder = new google.maps.Geocoder();
    document.getElementById('Submit').addEventListener('click', function(e) {
      geocodeAddress(geocoder, map, markers);
      e.preventDefault();
    });
}

function getYoutubeMovies(lat, lng, word, rad, map, markers) {
		var lat = lat.toString();
		var lng = lng.toString();
		var latLng  = lat + "," + lng;
		var request = gapi.client.youtube.search.list({
			part: "snippet",
			q: word,
			type: "video",
			order: "viewCount",
			maxResults : 25,
			location : latLng,
			locationRadius : rad
		});
		request.execute(function(response){
			var vids = response.items;
			var ids = [];
			for (var x = 0; x < vids.length; x++) {
				ids.push(vids[x].id.videoId);
			}
			var vrequest = gapi.client.youtube.videos.list({
				part: "snippet,recordingDetails",
				id: ids.join()
			});
			vrequest.execute(function(newresponse){
				var newvids = newresponse.items;
				// print our videos out
				printVids(newvids);
				// // remove markers from map
				console.log(markers);
				if (markers.length > 0) {
					for (var z = 0; z < markers.length; z++) {
						markers[z].setMap(null);
					}
					markers = [];
				}
				console.log(markers);
				// place markers on map
				if (markers.length > 0) { markers = []; }
				for (var z = 0; z < newvids.length; z++) {
					var vlat = newvids[z].recordingDetails.location.latitude;
					var vlng = newvids[z].recordingDetails.location.longitude;
					var marker = new google.maps.Marker({
						position: {lat: vlat, lng: vlng},
						map:  map
					});
					markers.push(marker);
				}
			})
		});
}
function closeModal(){

}

function createFrame(t) {
	var hook = document.getElementsByClassName("map-vids")[0];
	var d = t.getAttribute("data-video");
	var desc = t.parentElement.parentElement.getAttribute("data-desc");
	var tit = t.parentElement.parentElement.getAttribute("data-title");
	var wrap = document.createElement("div");
	var iwrap = document.createElement("div");
	var art = document.createElement("article");
	var h2 = document.createElement("h2");
	var p = document.createElement("p");
	var cont = document.createElement("div");
	var artwrap = document.createElement("div");
	var div = document.createElement("div");
	var iframe = document.createElement("iframe");
	var close = document.createElement("button");

	close.setAttribute("class","close");
	close.innerText = "Close";
	cont.setAttribute("class", "main-desc");
	p.innerText = desc;
	h2.innerText = tit;
	wrap.setAttribute("class", "modal");
	iwrap.setAttribute("class", "inner-wrap");
	artwrap.setAttribute("class", "art-wrap");
	div.setAttribute("class", "vid-cont");
	iframe.setAttribute("src", d);
	cont.appendChild(p);
	wrap.appendChild(close);
	wrap.appendChild(iwrap);
	iwrap.appendChild(art);
	art.appendChild(artwrap);
	artwrap.appendChild(h2);
	artwrap.appendChild(div);
	artwrap.appendChild(cont);
	div.appendChild(iframe);
	hook.appendChild(wrap);
	return false;
}

function printVids(vids) {
	if (vids.length > 0) {
		var r = document.getElementsByClassName("videos")[0];
		// empty list of videos
		if (r.childNodes.length > 0) {
			while(r.firstChild) {
				r.removeChild(r.firstChild);
			}
		}
		for (var z = 0; z < vids.length; z++){
			var url = "https://www.youtube.com/embed/" + vids[z].id;
			var imgUrl = vids[z].snippet.thumbnails.medium.url;
			var m = (z%3);
			var t = vids[z].snippet.title;
			var d = vids[z].snippet.description;
			var li = document.createElement("li");
			var h2 = document.createElement("h2");
			var play = document.createElement("button");
			var wrap = document.createElement("div");
			var img = document.createElement("img");
			h2.innerText = t;
			if (m == 2) { li.setAttribute("data-url", "end"); }
			li.setAttribute("class", "video-cont");
			li.setAttribute("data-desc", d);
			li.setAttribute("data-title", t);
			play.setAttribute("class", "play");
			play.setAttribute("data-video", url);
			wrap.setAttribute("class", "img-wrap");
			img.setAttribute("src", imgUrl);
			img.setAttribute("class", "vid-img");
			play.innerText = "More";
			// empty videos container
			wrap.appendChild(img);
			wrap.appendChild(play);
			li.appendChild(h2);
			li.appendChild(wrap);
			r.appendChild(li);

			play.addEventListener("click", function() { createFrame(this); });
		} // end for
	}
}

function geocodeAddress(geocoder, resultsMap, markers) {
     var address = document.getElementById('Address').value;
     var keyword = document.getElementById("Keyword").value;
     var radius = document.getElementById("Radius").value;
     geocoder.geocode({'address': address}, function(results, status) {
       if (status === 'OK') {
         resultsMap.setCenter(results[0].geometry.location);
         var marker = new google.maps.Marker({
           map: resultsMap,
           position: results[0].geometry.location
         });
         // get youtube videos
         getYoutubeMovies(results[0].geometry.location.lat(), results[0].geometry.location.lng(), keyword, radius, resultsMap, markers);
       } else {
         alert('Geocode was not successful for the following reason: ' + status);
       }
     });
}

function init() {
	gapi.client.setApiKey("AIzaSyD-85m0xB4Ce12rEUi78DDgQqWvximHVtA");
	gapi.client.load("youtube", "v3", function(){
		//yt api is ready
	});
}