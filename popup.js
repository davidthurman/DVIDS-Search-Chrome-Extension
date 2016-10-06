document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('searchButton');
    // onClick's logic below:
    button.addEventListener('click', function() {
      var searchParams = document.getElementById("searchBox").value;
      var searchUrl = 'https://api.dvidshub.net/search?q=' + searchParams + '&max_results=2&api_key=key-57f3a82240293';
      console.log(searchUrl);
      $.get( searchUrl, function( data ) {
        console.log(data);
        $.each(data['results'].reverse(), function(index, value) {
          var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
          var d = new Date(value['begin']);
          var day = d.getDate();
          var monthIndex = d.getMonth();
          var year = d.getFullYear();
          var hours = d.getHours();
          var minutes = d.getMinutes();
          var singleVideo =
            '<a target="_blank" href="' + value['url'] + '">' +
              '<div class="single-video-container" data-url="' + value['url'] + '">' +
                '<div class="container-main-section">' +
                  '<div class="thumbnail-wrapper">' +
                    '<img class="thumbnail" src="' + value['thumbnail']['url'] + '"/>' +
                  '</div>' +
                  '<div class="single-video-title">' + value['title'] + '</div>' +
                  '<div class="single-video-time">' + (monthIndex + 1) + "/" + day + "/" + year + " " + hours + ":" + minutes + '</div>' +
                '</div>' +
                '<div class="single-video-summary">' + value['description'] + '</div>' +
              '</div></a>';
            if (index != 0){
              singleVideo = singleVideo + '<hr>';
            }
            
            $( ".content-wrapper" ).prepend(singleVideo); 
        });
      });


    });
});