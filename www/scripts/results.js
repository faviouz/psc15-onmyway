GMaps.geolocate({
    success: function (location) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;

        var currentLocation = {
            'lat': latitude,
            'lng': longitude
        };

        var map = new GMaps({
            div: '#map',
            lat: latitude,
            lng: longitude,
            disableDefaultUI: true
        });

        var marker = map.addMarker({
            lat: latitude,
            lng: longitude,
            title: 'Current Location',
            infoWindow: {
                content: '<p>Big Ben is the nickname for the great bell of the clock at the north end of the Palace of Westminster in London, and often extended to refer to the clock and the clock tower, officially named Elizabeth Tower.</p>'
            }
        });

        map.setCenter(latitude, longitude);

        $.get('http://178.62.17.170:1337/circuits/' + currentLocation['lat'] + ',' + currentLocation['lng'] + '/coffee/5/', function (places) {
            console.log(places);

            places.forEach(function (place) {
                map.addMarker({
                    lat: place.location.lat,
                    lng: place.location.lng,
                    title: place.name,
                    icon: place.icon,
                    infoWindow: {
                        content: place.name
                    }
                });
            });

            for (var i = 1; i < places.length; i++) {
                origin = [places[i - 1]['location']['lat'], places[i - 1]['location']['lng']];
                destination = [places[i]['location']['lat'], places[i]['location']['lng']];

                console.log(origin);
                console.log(destination);

                map.drawRoute({
                    origin: origin,
                    destination: destination,
                    travelMode: 'walking',
                    strokeColor: '#ff0000',
                    strokeOpacity: 0.6,
                    strokeWeight: 6
                });
            }
        });

    },
    error: function (error) {
        alert('Geolocation failed: ' + error.message);
    },
    not_supported: function () {
        alert('Your browser does not support geolocation');
    },
    always: function () {
        alert('Done!');
    }
});
