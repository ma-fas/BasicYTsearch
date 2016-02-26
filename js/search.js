

$(function(){
    $('form').on('submit', function(e){
        e.preventDefault();
        //prepare request
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            type: 'video',
            q: encodeURIComponent($('#search').val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: 'viewCount',
            publishedAfter: '2015-01-01T00:00:00Z'
        });
        //execute request
        request.execute(function(response){
            var results = response.result;
            $("#results").html('');
            $.each(results.items, function(index, item){
                $.get("templates/item.html", function(data){
                    $('#results').append(tplawesome(data, [{'title': item.snippet.title, 'videoid':item.id.videoId }]));
                });
            });
            resetVideoHeight();
        });
    });
    $(window).on('resize', resetVideoHeight);
});

function resetVideoHeight(){
    $('.video').css('height', $('#results').width() * 9/16);
}

function init(){
    gapi.client.setApiKey("AIzaSyBzAcmKyTKBMuZSYuRrXU7pNv5Y6jRsxMg");
    gapi.client.load("youtube", "v3", function(){
        // yt api ready
    });
}
