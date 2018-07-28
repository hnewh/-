link = 'https://api.thingspeak.com/channels/548669/feeds.json?results=2';
$('#blank').load(link, function(data){
    var obj = JSON.parse(data);
    time = checkTouch(obj['feeds'][1]['field1']);
    $('#rfid .wrap .list').append(obj['channel']['field2']);
    $('#section-graph .wrap #temp .graph').append('<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/548669/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=%EC%98%A8%EB%8F%84&type=line"></iframe>');
    $('#section-graph .wrap #mois .graph').append('<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/548669/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=%EC%8A%B5%EB%8F%84&type=line"></iframe>');
});

function checkTouch(value)
{
    if(value == 0)
    {
        console.log()
        endTime = new Date().getTime();
        return endTime();
    }
    else
        return new Date().getTime() + setTimeout(() => {
            $('#blank').load(link, function(data){
                var obj = JSON.parse(data);
                checkTouch(obj['feeds'][1]['field1']);
            })
        }, 30000);
}